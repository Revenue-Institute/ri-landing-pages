import Image from "next/image";
import Link from "next/link";

const PRIVACY_URL = "https://revenueinstitute.com/privacy-policy";

/**
 * Shared header/footer for every assessment page (CleverSite, PIE, ...).
 * Server Component - no state, so it's safe to reuse from either page.tsx
 * without a client boundary. Wraps children in .assessment-page, which
 * sets the page background/type on top of the site-wide Revenue Institute
 * brand tokens (docs/brand.md, see globals.css) - the whole site shares
 * one brand now, this just adds this page's own background/font.
 *
 * The 10px green top bar is rendered once in the root layout, not here -
 * it's the same site-wide identity mark on every route.
 *
 * `minimal` drops the header/logo - used on every step past the intro so
 * the flow gets the full viewport on mobile, where the header is real
 * vertical space competing with the question itself.
 */
export default function AssessmentPageChrome({
  children,
  minimal = false,
}: {
  children: React.ReactNode;
  minimal?: boolean;
}) {
  return (
    <div className="assessment-page">
      {!minimal && (
        <header className="assessment-page-header">
          <div className="wrap assessment-page-header-inner">
            <Link href="/" aria-label="Revenue Institute home" className="assessment-wordmark">
              <Image src="/dark-logo.png" alt="Revenue Institute" width={120} height={37} priority />
            </Link>
          </div>
        </header>
      )}

      <main id="main">{children}</main>

      <footer className="assessment-page-footer">
        <div className="wrap assessment-page-footer-inner">
          <span>© 2026 Revenue Institute</span>
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
            Privacy policy
          </a>
        </div>
      </footer>
    </div>
  );
}
