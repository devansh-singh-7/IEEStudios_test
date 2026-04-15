"use client";

import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleBookCall = useCallback(() => {
    window.location.href = "mailto:hello@ieestudios.com?subject=Book%20a%20Call";
  }, []);

  // ─── CTA Scroll Animation ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Animates as top of footer comes 20% from bottom of screen
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─── Magnetic Effect ─────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to -1 -> +1 relative to button center
    const distX = (e.clientX - centerX) / (rect.width / 2);
    const distY = (e.clientY - centerY) / (rect.height / 2);

    // Subtle translation
    gsap.to(btn, {
      x: distX * 12,
      y: distY * 12,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  return (
    <footer ref={sectionRef} className="footer" id="contact">
      {/* ── Top Half: Large CTA ── */}
      <div className="footer__cta-wrap">
        <h2 ref={headingRef} className="footer__cta-heading">
          Ready to launch?
        </h2>
        <button
          type="button"
          ref={buttonRef}
          className="footer__cta-btn"
          data-cursor="hover"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleBookCall}
        >
          Book a Call
        </button>
      </div>

      {/* ── Bottom Half: Actual Footer ── */}
      <div className="footer__bottom">
        <div className="footer__columns">
          {/* Column 1: Logo / Tagline */}
          <div className="footer__col">
            <span className="footer__logo">IEE Studios</span>
            <span className="footer__text">
              Award-winning launch films for tech
            </span>
          </div>

          {/* Column 2: Email */}
          <div className="footer__col footer__col--center">
            <a
              href="mailto:hello@ieestudios.com"
              className="footer__link"
              data-cursor="hover"
            >
              hello@ieestudios.com
            </a>
          </div>

          {/* Column 3: Socials */}
          <div className="footer__col footer__col--right">
            <a href="#" className="footer__link" data-cursor="hover">
              Twitter / X
            </a>
            <a href="#" className="footer__link" data-cursor="hover">
              Instagram
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer__copyright">
          © {new Date().getFullYear()} IEE Studios. All rights reserved.
        </div>
      </div>

      <style>{`
        /* ── Section Shell ─────────────────────────────────── */
        .footer {
          background: transparent;
          display: flex;
          flex-direction: column;
          /* Setting stacking context for GSAP transformations */
          position: relative; 
          z-index: 10;
        }

        /* ── Top Half: CTA ─────────────────────────────────── */
        .footer__cta-wrap {
          padding: 140px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 40px;
        }

        .footer__cta-heading {
          font-size: clamp(48px, 8vw, 80px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.1;
          will-change: transform, opacity;
        }

        .footer__cta-btn {
          font-size: 16px;
          font-weight: 500;
          color: #080808;
          background: #ffffff;
          padding: 16px 40px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: opacity 0.3s ease;
          transform-style: preserve-3d; /* Isolate GSAP transforms */
        }

        .footer__cta-btn:hover {
          opacity: 0.88;
        }

        /* ── Bottom Half: Footer details ───────────────────── */
        .footer__bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 40px 48px 24px;
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        /* ── Columns layout ────────────────────────────────── */
        .footer__columns {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: start;
        }

        .footer__col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer__col--center {
          align-items: center;
        }

        .footer__col--right {
          align-items: flex-end;
        }

        .footer__logo {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }

        .footer__text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
        }

        .footer__link {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s ease;
        }

        .footer__link:hover {
          color: #ffffff;
        }

        /* ── Copyright ─────────────────────────────────────── */
        .footer__copyright {
          text-align: center;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.25);
          letter-spacing: 0.02em;
        }

        /* ── Responsive ────────────────────────────────────── */
        @media (max-width: 768px) {
          .footer__bottom {
            padding: 32px 24px 24px;
            gap: 48px;
          }

          .footer__columns {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .footer__col--center,
          .footer__col--right {
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}
