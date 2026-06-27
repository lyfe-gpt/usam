#!/usr/bin/env bash
# One-time setup so GitHub Actions can deploy this repo to AWS Amplify via OIDC.
#  1. Ensures the GitHub OIDC provider exists in your account (creates if missing).
#  2. Deploys the `usam-fund-github-deploy` role (deploy/github-oidc.yaml).
#  3. Sets the repo variables AWS_DEPLOY_ROLE_ARN + VITE_API_URL via `gh`.
#  4. Prints the single command to flip auto-deploy on.
#
# No AWS keys are pushed to GitHub — GitHub only gets the OIDC role ARN. VITE_API_URL
# is the public API Gateway URL (not a secret); it's needed at build time.
#
# Run once, from the repo root, with `aws` + `gh` authed:  bash deploy/setup-github-oidc.sh
set -euo pipefail
cd "$(dirname "$0")/.."

REGION="${AWS_REGION:-us-east-1}"
ORG="${GITHUB_ORG:-lyfe-gpt}"
REPO="${REPO_NAME:-usam}"
APP_ID="${AMPLIFY_APP_ID:-d26k7ln1hnf44p}"
VITE_API_URL="${VITE_API_URL:-https://gofe0jrl29.execute-api.us-east-1.amazonaws.com}"
PROVIDER_HOST="token.actions.githubusercontent.com"
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
PROVIDER_ARN="arn:aws:iam::${ACCOUNT}:oidc-provider/${PROVIDER_HOST}"

echo "▶ Ensuring GitHub OIDC provider exists…"
if aws iam get-open-id-connect-provider --open-id-connect-provider-arn "$PROVIDER_ARN" >/dev/null 2>&1; then
  echo "   already present: $PROVIDER_ARN"
else
  aws iam create-open-id-connect-provider \
    --url "https://${PROVIDER_HOST}" \
    --client-id-list "sts.amazonaws.com" \
    --thumbprint-list "ffffffffffffffffffffffffffffffffffffffff" >/dev/null
  echo "   created: $PROVIDER_ARN"
fi

echo "▶ Deploying the deploy-role stack (usam-fund-ci)…"
aws cloudformation deploy --region "$REGION" --stack-name usam-fund-ci \
  --template-file deploy/github-oidc.yaml --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides GitHubOrg="$ORG" RepoName="$REPO" AmplifyAppId="$APP_ID" OidcProviderArn="$PROVIDER_ARN"

ROLE_ARN=$(aws cloudformation describe-stacks --region "$REGION" --stack-name usam-fund-ci \
  --query "Stacks[0].Outputs[?OutputKey=='DeployRoleArn'].OutputValue" --output text)
echo "   role: $ROLE_ARN"

echo "▶ Setting repo variables…"
gh variable set AWS_DEPLOY_ROLE_ARN --body "$ROLE_ARN"
gh variable set VITE_API_URL --body "$VITE_API_URL"

cat <<'EOF'

✅ OIDC deploy role is wired. No GitHub secrets needed.

▶ Flip auto-deploy on (every push to main then deploys to Amplify):

  gh variable set AUTO_DEPLOY --body true

▶ (optional) Trigger a deploy right now without pushing:

  gh workflow run "Deploy (Amplify)"
EOF
