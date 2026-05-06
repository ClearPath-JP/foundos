"use client";

export default function HeroSVGAnimation() {
  return (
    <div className="hero-svg-top">
      {/* House drawing — deliberate, unhurried pace */}
      <svg
        className="hero-house"
        width="120"
        height="95"
        viewBox="0 0 120 90"
        fill="none"
        aria-hidden="true"
      >
        {/* Walls — drawn first, slow and steady */}
        <path
          d="M20 55 L20 82 L100 82 L100 55"
          stroke="#222"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="200"
          strokeDashoffset="200"
          fill="none"
        >
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1.4s" begin="0.3s" fill="freeze" />
        </path>

        {/* Roof — sweeps up after walls settle */}
        <path
          d="M10 57 L60 10 L110 57"
          stroke="#222"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="160"
          strokeDashoffset="160"
          fill="none"
        >
          <animate attributeName="stroke-dashoffset" from="160" to="0" dur="1.2s" begin="1.6s" fill="freeze" />
        </path>

        {/* Chimney — small detail, after roof */}
        <path
          d="M78 30 L78 16 L92 16 L92 40"
          stroke="#222"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset="60"
          fill="none"
        >
          <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.7s" begin="2.6s" fill="freeze" />
        </path>

        {/* Door — accent color, arched top */}
        <path
          d="M48 82 L48 62 Q60 57 72 62 L72 82"
          stroke="#e05533"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="80"
          strokeDashoffset="80"
          fill="none"
        >
          <animate attributeName="stroke-dashoffset" from="80" to="0" dur="0.9s" begin="3.2s" fill="freeze" />
        </path>

        {/* Left window */}
        <rect
          x="26" y="60" width="14" height="12" rx="1"
          stroke="#e05533"
          strokeWidth="2"
          strokeDasharray="60"
          strokeDashoffset="60"
          fill="none"
        >
          <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.6s" begin="3.8s" fill="freeze" />
        </rect>

        {/* Right window */}
        <rect
          x="80" y="60" width="14" height="12" rx="1"
          stroke="#e05533"
          strokeWidth="2"
          strokeDasharray="60"
          strokeDashoffset="60"
          fill="none"
        >
          <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.6s" begin="4.1s" fill="freeze" />
        </rect>

        {/* Chimney smoke — last little detail */}
        <circle
          cx="84" cy="11" r="3"
          stroke="#999"
          strokeWidth="1.5"
          strokeDasharray="20"
          strokeDashoffset="20"
          fill="none"
          opacity="0.5"
        >
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.5s" begin="4.5s" fill="freeze" />
        </circle>
        <circle
          cx="89" cy="6" r="2.5"
          stroke="#999"
          strokeWidth="1.2"
          strokeDasharray="18"
          strokeDashoffset="18"
          fill="none"
          opacity="0.35"
        >
          <animate attributeName="stroke-dashoffset" from="18" to="0" dur="0.5s" begin="4.8s" fill="freeze" />
        </circle>
      </svg>

      {/* FOUNDOS — outlined text draws slowly, then fills solid */}
      <svg
        className="hero-wordmark"
        width="380"
        height="60"
        viewBox="0 0 380 60"
        fill="none"
        aria-hidden="true"
      >
        {/* Outline drawing */}
        <text
          x="4"
          y="48"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontSize="48"
          fontWeight="800"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.2"
          letterSpacing="6"
          strokeDasharray="1600"
          strokeDashoffset="1600"
        >
          FOUNDOS
          <animate attributeName="stroke-dashoffset" from="1600" to="0" dur="3.5s" begin="0.2s" fill="freeze" />
        </text>

        {/* Solid fill fades in after outline completes */}
        <text
          x="4"
          y="48"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontSize="48"
          fontWeight="800"
          fill="#1a1a1a"
          letterSpacing="6"
          opacity="0"
        >
          FOUNDOS
          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="3.8s" fill="freeze" />
        </text>
      </svg>

      {/* Accent underline — last flourish */}
      <svg
        className="hero-wordmark-line"
        width="380"
        height="10"
        viewBox="0 0 380 10"
        fill="none"
      >
        <path
          d="M0 5 Q95 1 190 5 Q285 9 380 5"
          stroke="#e05533"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="400"
          strokeDashoffset="400"
          fill="none"
        >
          <animate attributeName="stroke-dashoffset" from="400" to="0" dur="0.8s" begin="4.2s" fill="freeze" />
        </path>
      </svg>
    </div>
  );
}
