// Small line-icon set (24x24, uses the current text color).
const PATHS = {
  explore: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13.6 13.6 8.5 15.5 10.4 10.4z" />
    </>
  ),
  heart: <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />,
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.8 20c.6-3.6 3.6-5.6 7.2-5.6s6.6 2 7.2 5.6" />
    </>
  ),
  list: (
    <>
      <path d="M8.5 6.5H20M8.5 12H20M8.5 17.5H20" />
      <circle cx="4.6" cy="6.5" r=".9" />
      <circle cx="4.6" cy="12" r=".9" />
      <circle cx="4.6" cy="17.5" r=".9" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  download: (
    <>
      <path d="M12 4v11M7.5 10.8 12 15.3l4.5-4.5" />
      <path d="M5 19.5h14" />
    </>
  ),
  document: (
    <>
      <path d="M7 3.5h7.2L19 8.3V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 7 20z" />
      <path d="M14 3.5V8.5h5M9.5 13h6M9.5 16.5h6" />
    </>
  ),
};

export default function Icon({ name, size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
