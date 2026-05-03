import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FoundOS",
  description: "How FoundOS handles your data. Plain English, no legalese.",
};

export default function PrivacyPage() {
  return (
    <>
      <nav className="nav nav--scrolled">
        <a href="/" className="nav__logo">FOUNDOS</a>
      </nav>

      <section className="section" style={{ paddingTop: "120px" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <p className="mono section__label">Legal</p>
          <h1 className="heading" style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: 16 }}>
            Privacy Policy
          </h1>
          <p className="mono" style={{ marginBottom: 48 }}>Last updated: May 1, 2026</p>

          <div className="privacy-content">
            <h2>Who We Are</h2>
            <p>
              FoundOS is a web design and development studio run by Josh Potesta in Atlanta, GA.
              When this policy says &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our,&rdquo; it means FoundOS.
            </p>

            <h2>What We Collect</h2>
            <p>We keep data collection minimal:</p>
            <ul>
              <li>
                <strong>Contact information</strong> &mdash; your name, email, and phone number when
                you book a call, fill out a form, or reach out directly.
              </li>
              <li>
                <strong>Basic analytics</strong> &mdash; page views, device type, and referral source
                through Vercel Analytics. No cookies. No personal tracking.
              </li>
              <li>
                <strong>Project files</strong> &mdash; content, images, and copy you provide for your
                website project. We use these solely to build and maintain your site.
              </li>
            </ul>

            <h2>What We Don&apos;t Collect</h2>
            <ul>
              <li>We don&apos;t use tracking cookies or third-party ad scripts.</li>
              <li>We don&apos;t sell, rent, or share your data with anyone.</li>
              <li>We don&apos;t store payment card details &mdash; payments are processed securely through Stripe.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To communicate with you about your project.</li>
              <li>To build and maintain your website.</li>
              <li>To send you updates if you opt in (you can opt out anytime).</li>
            </ul>

            <h2>Your Website &amp; Your Data</h2>
            <p>
              When we build a website for you, here&apos;s how ownership works:
            </p>
            <ul>
              <li>
                <strong>Domain name</strong> &mdash; registered in your name. You own it. We help
                you set it up and manage DNS, but the domain is yours.
              </li>
              <li>
                <strong>Website content</strong> &mdash; your photos, copy, menus, and branding are
                yours. We never reuse client content without permission.
              </li>
              <li>
                <strong>Hosting</strong> &mdash; your site runs on Vercel, a secure, enterprise-grade
                platform. If we part ways, we transfer everything to you.
              </li>
            </ul>

            <h2>Security</h2>
            <p>
              All FoundOS sites are served over HTTPS. We use secure, industry-standard infrastructure
              (Vercel, GitHub, Stripe). We don&apos;t store passwords or sensitive credentials in plain text.
            </p>

            <h2>Third-Party Services</h2>
            <p>We use a small number of trusted services:</p>
            <ul>
              <li><strong>Vercel</strong> &mdash; hosting and analytics</li>
              <li><strong>Stripe</strong> &mdash; payment processing</li>
              <li><strong>Cal.com</strong> &mdash; appointment scheduling</li>
              <li><strong>Google Workspace</strong> &mdash; email (hello@foundos.ai)</li>
            </ul>
            <p>Each of these has their own privacy policy. We only use services we trust.</p>

            <h2>Your Rights</h2>
            <p>You can:</p>
            <ul>
              <li>Ask what data we have about you.</li>
              <li>Request we delete your data.</li>
              <li>Opt out of any communications.</li>
            </ul>
            <p>Just email <a href="mailto:hello@foundos.ai" style={{ color: "var(--white)" }}>hello@foundos.ai</a> and we&apos;ll handle it.</p>

            <h2>Changes</h2>
            <p>
              If we update this policy, we&apos;ll update the date at the top. No surprises.
            </p>

            <h2>Contact</h2>
            <p>
              Questions? Reach out:<br />
              <a href="mailto:hello@foundos.ai" style={{ color: "var(--white)" }}>hello@foundos.ai</a>
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer__bottom">
            <p className="mono">&copy; 2026 FoundOS</p>
            <p className="mono">Atlanta, GA</p>
          </div>
        </div>
      </footer>
    </>
  );
}
