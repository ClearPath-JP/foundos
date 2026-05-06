"use client";

export default function HeroSVGAnimation() {
  return (
    <div className="hero-svg-top">
      {/* House drawing */}
      <svg
        className="hero-house"
        width="100"
        height="80"
        viewBox="0 0 120 90"
        fill="none"
        aria-hidden="true"
      >
        <path d="M20 55 L20 82 L100 82 L100 55" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" strokeDashoffset="200" fill="none">
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.8s" begin="0.2s" fill="freeze" />
        </path>
        <path d="M10 57 L60 10 L110 57" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="160" strokeDashoffset="160" fill="none">
          <animate attributeName="stroke-dashoffset" from="160" to="0" dur="0.7s" begin="0.9s" fill="freeze" />
        </path>
        <path d="M48 82 L48 62 Q60 58 72 62 L72 82" stroke="#e05533" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="80" strokeDashoffset="80" fill="none">
          <animate attributeName="stroke-dashoffset" from="80" to="0" dur="0.6s" begin="1.5s" fill="freeze" />
        </path>
        <rect x="26" y="60" width="14" height="12" rx="1" stroke="#e05533" strokeWidth="2" strokeDasharray="60" strokeDashoffset="60" fill="none">
          <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.4s" begin="1.8s" fill="freeze" />
        </rect>
        <rect x="80" y="60" width="14" height="12" rx="1" stroke="#e05533" strokeWidth="2" strokeDasharray="60" strokeDashoffset="60" fill="none">
          <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.4s" begin="2.0s" fill="freeze" />
        </rect>
        <path d="M78 30 L78 18 L90 18 L90 40" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="60" strokeDashoffset="60" fill="none">
          <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.4s" begin="1.2s" fill="freeze" />
        </path>
        <circle cx="84" cy="13" r="3" stroke="#999" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" fill="none" opacity="0.6">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.3s" begin="2.3s" fill="freeze" />
        </circle>
        <circle cx="88" cy="8" r="2" stroke="#999" strokeWidth="1.5" strokeDasharray="15" strokeDashoffset="15" fill="none" opacity="0.4">
          <animate attributeName="stroke-dashoffset" from="15" to="0" dur="0.3s" begin="2.5s" fill="freeze" />
        </circle>
      </svg>

      {/* FOUNDOS drawn as outlined text */}
      <svg className="hero-wordmark" width="340" height="56" viewBox="0 0 340 56" fill="none" aria-hidden="true">
        <text x="4" y="46" fontFamily="var(--font-inter), system-ui, sans-serif" fontSize="46" fontWeight="800" fill="none" stroke="#1a1a1a" strokeWidth="1.5" letterSpacing="-2" strokeDasharray="1400" strokeDashoffset="1400">
          FOUNDOS
          <animate attributeName="stroke-dashoffset" from="1400" to="0" dur="2s" begin="0.1s" fill="freeze" />
        </text>
        {/* Solid fill fades in after drawing completes */}
        <text x="4" y="46" fontFamily="var(--font-inter), system-ui, sans-serif" fontSize="46" fontWeight="800" fill="#1a1a1a" letterSpacing="-2" opacity="0">
          FOUNDOS
          <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="2.1s" fill="freeze" />
        </text>
      </svg>

      {/* Accent underline drawn after text */}
      <svg className="hero-wordmark-line" width="340" height="10" viewBox="0 0 340 10" fill="none">
        <path d="M0 5 Q85 2 170 5 Q255 8 340 5" stroke="#e05533" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="360" strokeDashoffset="360" fill="none">
          <animate attributeName="stroke-dashoffset" from="360" to="0" dur="0.6s" begin="2.2s" fill="freeze" />
        </path>
      </svg>
    </div>
  );
}
