import CubeLogo from "./CubeLogo";

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-12"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <CubeLogo size={20} />
          <span
            className="text-sm font-semibold tracking-[0.15em]"
            style={{ color: "#f7f8f8" }}
          >
            FOUNDOS
          </span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { name: "Instagram", url: "https://instagram.com/foundos.ai" },
            { name: "TikTok", url: "https://tiktok.com/@foundos.ai" },
            {
              name: "LinkedIn",
              url: "https://linkedin.com/in/jppotesta",
            },
          ].map(({ name, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors"
              style={{ color: "#62666d" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#f7f8f8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#62666d")
              }
            >
              {name}
            </a>
          ))}
        </div>
        <a
          href="mailto:hello@foundos.ai"
          className="text-xs transition-colors"
          style={{ color: "#62666d" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "#f7f8f8")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "#62666d")
          }
        >
          hello@foundos.ai
        </a>
      </div>
    </footer>
  );
}
