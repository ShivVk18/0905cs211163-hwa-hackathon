export function HandUnderline({ color = '#F1785B', className = '' }) {
  return (
    <svg
      className={`pointer-events-none absolute -bottom-1 left-0 h-[0.2em] w-full ${className}`}
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 9 C 62 2, 104 13, 152 6 S 248 2, 295 8"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M10 11 C 72 5, 124 14, 168 8 S 256 6, 291 10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export default HandUnderline;
