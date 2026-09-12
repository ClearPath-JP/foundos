import type { ReactNode } from 'react';
import Link from 'next/link';

/**
 * Two ways to decorate a phrase inside one of Josh's copy strings without
 * editing the string. Moved here from src/app/page.tsx on 2026-09-11, when most
 * of the homepage's argument moved to /why and both pages needed them.
 *
 * ⚠️ THE PHRASE IS FOUND IN THE COPY AT RENDER, NEVER WRITTEN INTO IT. Every
 * sentence on these pages lives in a constant so that what ships is
 * byte-for-byte what Josh wrote. If a copy edit moves a phrase, the paragraph
 * renders exactly as written and only loses its mark or its link. A drifted
 * phrase costs a decoration; it never costs a word, and it cannot crash.
 */

/**
 * Wraps one or more verbatim phrases in `.eb-mark` spans — the skim path. It
 * consumes the string in order, so one phrase list can be handed to every
 * paragraph in a block and the paragraphs without the phrase come back
 * untouched. See `.eb-mark` in css.ts for why weight is permanent and colour is
 * the reveal.
 */
export function Marked({ text, phrases }: { text: string; phrases: readonly string[] }) {
  const out: ReactNode[] = [];
  let rest = text;

  phrases.forEach((phrase, i) => {
    const at = rest.indexOf(phrase);
    if (at === -1) return;
    out.push(rest.slice(0, at));
    out.push(
      <span key={i} className="eb-mark">
        {phrase}
      </span>,
    );
    rest = rest.slice(at + phrase.length);
  });

  if (out.length === 0) return <>{text}</>;
  out.push(rest);
  return <>{out}</>;
}

/**
 * Wraps one verbatim phrase in a link. The phrase must appear exactly once in
 * the string, or the link lands on the first occurrence.
 *
 * `className` defaults to the homepage's `.eb-inline-a`; the service-page family
 * passes `.sv-a`, which is the same style under that family's name. Both carry
 * the padding-block trick that gives an inline link a 44px hit box without
 * moving the line box.
 */
export function Linked({
  text,
  phrase,
  href,
  className = 'eb-inline-a',
}: {
  text: string;
  phrase: string;
  href: string;
  className?: string;
}) {
  const at = text.indexOf(phrase);
  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <Link className={className} href={href}>
        {phrase}
      </Link>
      {text.slice(at + phrase.length)}
    </>
  );
}
