import Image from "next/image";
import Link from "next/link";

const ACCENT = "#d9412a";
const SOFT = "rgba(217, 65, 42, 0.12)";

/* ── Small building blocks ─────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]"
      style={{ background: SOFT, color: ACCENT }}
    >
      {children}
    </span>
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] font-black leading-[1.1] tracking-tight text-white sm:text-4xl">
      {children}
    </h2>
  );
}

/* ── Page ──────────────────────────────────────────── */

export default function TruckOfferPage() {
  return (
    <main className="min-h-screen bg-[#0f0b0a] text-white">
      {/* ── Hero ───────────────────────────────────── */}
      <div className="relative">
        <Image
          src="/demo/truckos/hero.jpg"
          alt="A food truck serving customers at night"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0b0a]/70 via-[#0f0b0a]/80 to-[#0f0b0a]" />
        <div className="relative px-5 pb-16 pt-20 sm:pb-24 sm:pt-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/45">
              foundos<span style={{ color: ACCENT }}>.</span>ai
            </p>
            <h1 className="mt-5 text-[38px] font-black leading-[0.98] tracking-tight sm:text-6xl">
              Your regulars can&apos;t buy from you
              <span className="block" style={{ color: ACCENT }}>
                if they can&apos;t find you.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              A website that shows where you&apos;re parked right now, a text list
              that belongs to you, and a sold-out button you tap with one thumb.
              Built for a business that moves.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/demo/truckos"
                className="rounded-xl px-6 py-4 text-sm font-bold text-white transition hover:brightness-110 active:scale-95"
                style={{ background: ACCENT }}
              >
                See it working →
              </Link>
              <a
                href="#pricing"
                className="rounded-xl border border-white/20 px-6 py-4 text-sm font-bold text-white/85 transition hover:bg-white/5"
              >
                What it costs
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── The problem ────────────────────────────── */}
      <Section>
        <Eyebrow>What it&apos;s costing you</Eyebrow>
        <H2>
          You already did the hard part.
          <br />
          The food is good. People just can&apos;t find it.
        </H2>

        <div className="mt-9 space-y-3">
          {[
            {
              stat: "1 in 10",
              title: "That's how many of your followers see a post.",
              body: "You post your spot every morning. Instagram shows it to a fraction of the people who already told you they like your food. The rest have no idea where you are today.",
            },
            {
              stat: "1:00pm",
              title: "You sell out — and people keep driving over.",
              body: "They get there, it's gone, and that's the story they tell. Nothing on your page told them, because nothing on your page can be changed from a truck window.",
            },
            {
              stat: "0",
              title: "Followers you actually own.",
              body: "Every one of them belongs to Instagram. Account goes down, algorithm shifts, and your customer list goes with it. A phone number is yours forever.",
            },
          ].map((p) => (
            <div
              key={p.stat}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex sm:gap-6"
            >
              <div
                className="text-3xl font-black leading-none tracking-tight sm:w-28 sm:shrink-0"
                style={{ color: ACCENT }}
              >
                {p.stat}
              </div>
              <div className="mt-3 sm:mt-0">
                <p className="text-[17px] font-bold leading-snug">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── The math ───────────────────────────────── */}
      <Section className="border-y border-white/10 bg-white/[0.02]">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <div
            className="text-[84px] font-black leading-none tracking-tighter sm:text-[120px]"
            style={{ color: ACCENT }}
          >
            10
          </div>
          <div>
            <H2>That&apos;s the whole math.</H2>
            <p className="mt-3 text-base leading-relaxed text-white/60">
              At a $15 average ticket, this needs to bring you{" "}
              <strong className="font-bold text-white">
                ten extra customers a month
              </strong>{" "}
              to pay for itself. Ten. One good Tuesday text covers the entire
              month — and you keep every customer it brings.
            </p>
          </div>
        </div>
      </Section>

      {/* ── A day with it ──────────────────────────── */}
      <Section>
        <Eyebrow>How it actually works</Eyebrow>
        <H2>One day, start to finish.</H2>
        <p className="mt-4 text-base leading-relaxed text-white/55">
          There&apos;s no dashboard to learn and no computer involved. It&apos;s
          your phone, and it&apos;s four taps.
        </p>

        <div className="mt-10 space-y-0">
          {[
            {
              time: "9:40am",
              title: "You tap where you’re parked.",
              body: "Four of your regular spots are already saved. Tap one. Your website updates before you put the phone down — address, hours, directions link, all of it.",
            },
            {
              time: "9:41am",
              title: "Your regulars get a text.",
              body: "One button. Everyone who scanned your QR code gets: “We're at Glover Park Brewery today, 5 to 9.” Not a post they might see — a text they will.",
            },
            {
              time: "11:15am",
              title: "Orders start landing, already paid.",
              body: "They picked it on their phone and paid by card. It shows up on a tablet in the truck. You tap Start when you begin, Ready when it's bagged — and they get a text that it's waiting.",
            },
            {
              time: "1:20pm",
              title: "Birria's gone. One tap.",
              body: "Tap it on the sold-out board. It greys out on your site instantly and nobody can order it. No wasted trips, no bad reviews, no one arguing at the window.",
            },
            {
              time: "8:00pm",
              title: "Twelve more numbers than yesterday.",
              body: "Every person who ordered ahead or scanned the code is on your list now. That list is the asset. It's yours — you can export it any time, and it leaves with you if you ever leave us.",
            },
          ].map((step, i, arr) => (
            <div key={step.time} className="flex gap-4 sm:gap-6">
              <div className="flex flex-col items-center">
                <div
                  className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                  style={{ background: ACCENT }}
                />
                {i < arr.length - 1 ? (
                  <div className="w-px flex-1 bg-white/12" />
                ) : null}
              </div>
              <div className={i < arr.length - 1 ? "pb-9" : ""}>
                <p
                  className="text-[11px] font-black uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  {step.time}
                </p>
                <p className="mt-1.5 text-[17px] font-bold leading-snug">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── What you get ───────────────────────────── */}
      <Section className="border-t border-white/10">
        <Eyebrow>What you get</Eyebrow>
        <H2>Four things. All of them earn.</H2>

        <div className="mt-9 grid gap-3 sm:grid-cols-2">
          {[
            {
              img: "/demo/truckos/hero.jpg",
              n: "01",
              t: "Live “where we are today”",
              d: "The one thing Instagram can't do: a permanent address that always says where you actually are. With a directions link, so nobody gets lost.",
            },
            {
              img: "/demo/truckos/chorizo.jpg",
              n: "02",
              t: "A text list that's yours",
              d: "QR code at the window, people join in one tap. You text them your spot each morning. Export the numbers whenever you want — they're yours, not ours.",
            },
            {
              img: "/demo/truckos/papas.jpg",
              n: "03",
              t: "One-tap sold out",
              d: "Out of something? Tap it once. It greys out on the site immediately and can't be ordered. Counted items tick down on their own as orders come in.",
            },
            {
              img: "/demo/truckos/birria.jpg",
              n: "04",
              t: "Found on Google",
              d: "Your Google profile claimed, categorised and kept current — so when someone nearby searches “food near me,” you're in the results with photos and hours.",
            },
          ].map((f) => (
            <div
              key={f.n}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative h-32">
                <Image
                  src={f.img}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 350px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141010] via-[#141010]/30 to-transparent" />
              </div>
              <div className="p-5">
                <p
                  className="text-[11px] font-black tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  {f.n}
                </p>
                <p className="mt-1.5 text-[17px] font-bold leading-snug">{f.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{f.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 p-5" style={{ background: SOFT }}>
          <p className="text-sm leading-relaxed text-white/75">
            <strong className="font-bold text-white">
              Want to see it before you decide anything?
            </strong>{" "}
            The demo is live and you can press every button in it — including the
            owner&apos;s screen.{" "}
            <Link href="/demo/truckos" className="font-bold underline underline-offset-4" style={{ color: ACCENT }}>
              Open the demo →
            </Link>
          </p>
        </div>
      </Section>

      {/* ── Pricing ────────────────────────────────── */}
      <Section id="pricing" className="border-t border-white/10 bg-white/[0.02]">
        <Eyebrow>What it costs</Eyebrow>
        <H2>Start at one-forty-nine a month.</H2>
        <p className="mt-4 text-base leading-relaxed text-white/55">
          No contract. Leave whenever you want, and your customer list leaves with
          you.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          <div
            className="rounded-2xl border-2 p-6"
            style={{ borderColor: ACCENT, background: SOFT }}
          >
            <p
              className="text-[10px] font-black uppercase tracking-[0.16em]"
              style={{ color: ACCENT }}
            >
              Start here
            </p>
            <p className="mt-3 text-4xl font-black tracking-tight">
              $149<span className="text-lg font-bold text-white/45">/mo</span>
            </p>
            <p className="mt-1 text-sm font-semibold text-white/60">
              plus $500 to build it
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Your website, built around your food",
                "Live “where we are today”",
                "Text list + QR code for the window",
                "One-tap sold out board",
                "Google profile claimed & managed",
                "8 text sends a month to 500 people",
              ].map((li) => (
                <li key={li} className="flex gap-2.5 text-sm leading-snug text-white/75">
                  <span style={{ color: ACCENT }}>✓</span>
                  {li}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/12 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/40">
              When you&apos;re ready
            </p>
            <p className="mt-3 text-4xl font-black tracking-tight">
              $279<span className="text-lg font-bold text-white/45">/mo</span>
            </p>
            <p className="mt-1 text-sm font-semibold text-white/60">
              plus $1,200 to build it
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Everything on the left, plus:",
                "Order ahead, paid by card",
                "Staff screen for the truck",
                "Automatic “your order is ready” text",
                "Inventory that counts itself down",
                "Card money lands in your bank, not ours",
              ].map((li, i) => (
                <li
                  key={li}
                  className={`flex gap-2.5 text-sm leading-snug ${
                    i === 0 ? "font-bold text-white/85" : "text-white/75"
                  }`}
                >
                  {i === 0 ? null : <span style={{ color: ACCENT }}>✓</span>}
                  {li}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-white/35">
          Texts included: up to 8 sends a month to 500 subscribers. Past that
          it&apos;s billed at cost — fractions of a cent per message, and
          you&apos;ll see the bill. Card payments run through your own Stripe
          account.
        </p>
      </Section>

      {/* ── Objections ─────────────────────────────── */}
      <Section className="border-t border-white/10">
        <Eyebrow>Straight answers</Eyebrow>
        <H2>The things you&apos;re about to ask.</H2>

        <div className="mt-8 space-y-5">
          {[
            {
              q: "I'm not good with computers.",
              a: "You won't touch one. Everything is your phone, and the whole thing is four buttons: where you are, send a text, start an order, sold out. If you can post a story, you can run this.",
            },
            {
              q: "How long until it's live?",
              a: "About a week for the site and the sold-out board. The text list takes two to three weeks longer, because the phone carriers have to approve any business that sends texts — that's their rule, not ours, and I start it the day we begin.",
            },
            {
              q: "Who owns the phone numbers?",
              a: "You do. Not me, not the software. You can export the whole list any time, and if you ever leave, it goes with you. That's in writing.",
            },
            {
              q: "What if it doesn't work?",
              a: "No contract. Cancel any month. I'd rather you stay because it's making you money than because you're locked in.",
            },
            {
              q: "I already have Instagram.",
              a: "Keep it — it's how people find you the first time. This is how they find you the second, third and tenth time. Instagram is the front door; the text list is the regulars' table.",
            },
            {
              q: "Do I need to buy anything?",
              a: "For the $149 plan, nothing — it runs on the phone in your pocket. Order-ahead works best with a cheap tablet in the truck, about $180, and you buy it so you own it.",
            },
          ].map((f) => (
            <div key={f.q} className="border-b border-white/8 pb-5">
              <p className="text-[16px] font-bold leading-snug">{f.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Close ──────────────────────────────────── */}
      <Section className="border-t border-white/10">
        <div className="rounded-3xl border border-white/12 p-8 text-center sm:p-12">
          <H2>Let&apos;s start with photos.</H2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/60">
            Before you spend a dollar — let me come shoot your food. An hour, no
            charge, and you keep every photo whether you hire me or not. Use them
            on Instagram, on your menu, anywhere.
          </p>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/60">
            If you like what you see, we talk about the rest.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:josh@foundos.ai?subject=Truck%20OS"
              className="w-full rounded-xl px-7 py-4 text-sm font-bold text-white transition hover:brightness-110 active:scale-95 sm:w-auto"
              style={{ background: ACCENT }}
            >
              josh@foundos.ai
            </a>
            <Link
              href="/demo/truckos"
              className="w-full rounded-xl border border-white/20 px-7 py-4 text-sm font-bold text-white/85 transition hover:bg-white/5 sm:w-auto"
            >
              Open the demo
            </Link>
          </div>

          <p className="mt-7 text-xs leading-relaxed text-white/30">
            Joshua Potesta · Founder, foundos.ai · Marietta, GA
          </p>
        </div>
      </Section>

      <footer className="border-t border-white/10 px-5 py-8">
        <p className="mx-auto max-w-3xl text-center text-[11px] leading-relaxed text-white/25">
          Demo uses sample photography and a sample menu. Your build uses your
          food and your words.
        </p>
      </footer>
    </main>
  );
}
