export default function CubeLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="200 180 680 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M540 240 L780 380 L540 520 L300 380 Z"
        fill="#fff"
        opacity="0.95"
      />
      <path
        d="M300 380 L540 520 L540 760 L300 620 Z"
        fill="#fff"
        opacity="0.55"
      />
      <path
        d="M780 380 L540 520 L540 760 L780 620 Z"
        fill="#fff"
        opacity="0.3"
      />
    </svg>
  );
}
