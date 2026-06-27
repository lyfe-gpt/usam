#!/usr/bin/env bash
# Deploys the already-built ./dist to AWS Amplify via a manual deployment:
#   create a deployment slot -> upload the zip to the presigned URL -> start it -> poll.
# Called by .github/workflows/deploy.yml (and runnable locally with awscli authed).
set -euo pipefail

APP_ID="${AMPLIFY_APP_ID:?set AMPLIFY_APP_ID}"
BRANCH="${AMPLIFY_BRANCH:-main}"
REGION="${AWS_REGION:-us-east-1}"

if [ ! -d dist ]; then
  echo "❌ ./dist not found — run 'npm run build' first." >&2
  exit 1
fi

echo "▶ Zipping dist/…"
( cd dist && rm -f /tmp/site.zip && zip -q -r /tmp/site.zip . )

echo "▶ Creating Amplify deployment slot…"
read -r JOB URL < <(aws amplify create-deployment \
  --app-id "$APP_ID" --branch-name "$BRANCH" --region "$REGION" \
  --query "[jobId,zipUploadUrl]" --output text)
echo "   job: $JOB"

echo "▶ Uploading artifact…"
curl -sS -X PUT -T /tmp/site.zip -H "Content-Type: application/zip" "$URL" -o /dev/null

echo "▶ Starting deployment…"
aws amplify start-deployment \
  --app-id "$APP_ID" --branch-name "$BRANCH" --job-id "$JOB" --region "$REGION" >/dev/null

echo "▶ Waiting for job $JOB…"
for _ in $(seq 1 60); do
  STATUS=$(aws amplify get-job --app-id "$APP_ID" --branch-name "$BRANCH" \
    --job-id "$JOB" --region "$REGION" --query "job.summary.status" --output text 2>/dev/null || echo PENDING)
  echo "   status: $STATUS"
  case "$STATUS" in
    SUCCEED) echo "✅ Deployed to https://${BRANCH}.${APP_ID}.amplifyapp.com"; exit 0 ;;
    FAILED|CANCELLED) echo "❌ Deploy $STATUS" >&2; exit 1 ;;
  esac
  sleep 8
done
echo "⏱ Timed out waiting for the deploy to finish." >&2
exit 1
