// Line-icon set matching the SVGs used across the design (Feather-style),
// plus the filled Material phone glyph used in the header.

const PATHS = {
  fixFlip: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  rental: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <line x1="9" y1="8" x2="9" y2="8.01" />
      <line x1="15" y1="8" x2="15" y2="8.01" />
      <line x1="9" y1="12" x2="9" y2="12.01" />
      <line x1="15" y1="12" x2="15" y2="12.01" />
      <path d="M10 21v-3h4v3" />
    </>
  ),
  construction: (
    <>
      <line x1="3" y1="21" x2="21" y2="21" />
      <path d="M5 21V8l7-5 7 5v13" />
      <path d="M5 8h14" />
    </>
  ),
  bridge: (
    <>
      <path d="M4 20V9" />
      <path d="M20 20V9" />
      <path d="M2 9c3 0 4-3 4-3s1 3 4 3" />
      <path d="M14 9c3 0 4-3 4-3s1 3 4 3" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </>
  ),
  transactional: (
    <>
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </>
  ),
  sba: (
    <>
      <path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z" />
      <polyline points="9 12 11 14 15 10" />
    </>
  ),
  bankStatement: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </>
  ),
  conventional: (
    <>
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </>
  ),
  commercial: (
    <>
      <line x1="3" y1="21" x2="21" y2="21" />
      <polyline points="3 21 3 7 12 3 21 7 21 21" />
      <line x1="8" y1="11" x2="8" y2="17" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="16" y1="11" x2="16" y2="17" />
    </>
  ),
  portfolio: (
    <>
      <rect x="3" y="9" width="18" height="11" rx="1.5" />
      <path d="M8 9V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V9" />
      <line x1="3" y1="14" x2="21" y2="14" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </>
  ),
  chevronRight: <polyline points="9 18 15 12 9 6" />,
  chevronDown: <polyline points="6 9 12 15 18 9" />,
  check: <polyline points="20 6 9 17 4 12" />,
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mail: (
    <>
      <path d="M4 4h16v16H4z" />
      <polyline points="22,6 12,13 2,6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  back: <polyline points="15 18 9 12 15 6" />,
};

// The filled-phone glyph is drawn with `fill`; everything else is a stroke icon.
export default function Icon({
  name,
  size = 24,
  color = "#1A56C4",
  width = 2,
  filled = false,
  className,
  style,
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    style,
    "aria-hidden": true,
  };
  if (filled) {
    return (
      <svg {...common} fill={color}>
        {PATHS[name]}
      </svg>
    );
  }
  return (
    <svg
      {...common}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
