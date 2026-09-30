import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Magic UI InteractiveHoverButton, adapted 2026-09-30 for foundos:
 *   - Renders an <a> when given `href`, because every CTA on the homepage is a
 *     link to #checkup or sms:, not a form button.
 *   - Colours come from the page (.fx-ihb in src/app/page.tsx), not the shadcn
 *     neutral tokens, so it is purple at rest — on a phone there is no hover,
 *     and the resting state has to be the finished button.
 */
type Common = { children: React.ReactNode; className?: string }
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function InteractiveHoverButton(props: AsButton | AsLink) {
  const { children, className } = props
  const classes = cn(
    "group relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold",
    className
  )
  const inner = (
    <>
      <span className="flex items-center justify-center gap-2">
        <span className="ihb-dot h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8] motion-reduce:transition-none" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 motion-reduce:transition-none">
          {children}
        </span>
      </span>
      <span aria-hidden="true" className="ihb-over absolute top-0 left-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none">
        <span>{children}</span>
        <ArrowRight aria-hidden="true" size={18} />
      </span>
    </>
  )

  if (props.href !== undefined) {
    const { children: _c, className: _cl, ...rest } = props
    void _c
    void _cl
    return (
      <a className={classes} {...rest}>
        {inner}
      </a>
    )
  }
  const { children: _c, className: _cl, ...rest } = props
  void _c
  void _cl
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  )
}
