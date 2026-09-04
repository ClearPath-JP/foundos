/**
 * Head metadata used to live here, as one static title covering both demos —
 * which is exactly why `?biz=bakery` opened a tab labelled "Truck OS". It is
 * now built per-business in `page.tsx`'s `generateMetadata`, from the same
 * `?biz=` value the page body renders from. Keep it there: a title in this
 * layout would silently apply to whichever business the URL asked for.
 */
export default function TruckOsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#0f0b0a]">{children}</div>;
}
