"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ──────────────────────────────────────────────────────────────────
const STATS = [
  { value: 50,  suffix: "+",  label: "Films Delivered"          },
  { value: 8,   suffix: "M+", label: "Total Views Generated"    },
  { value: 3,   suffix: "x",  label: "Avg. Launch Day Traffic"  },
  { value: 100, suffix: "%",  label: "Client Retention"         },
] as const;

// ─── StatsBar ──────────────────────────────────────────────────────────────
export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  // One ref slot per numeric span
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = numRefs.current[i];
        if (!el) return;

        // Proxy object GSAP tweens; onUpdate writes to the DOM
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: stat.value,
          duration: 1.5,
          ease: "power2.out",
          onUpdate() {
            el.textContent = String(Math.round(proxy.val));
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stats">
      <div className="stats__inner">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="stats__item">
            {/* Number + suffix */}
            <p className="stats__figure">
              <span
                ref={(el) => { numRefs.current[i] = el; }}
                className="stats__count"
              >
                0
              </span>
              <span className="stats__suffix">{stat.suffix}</span>
            </p>
            {/* Label */}
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        /* ── Section shell ─────────────────────────────────── */
        .stats {
          width: 100%;
          padding: 80px 0;
          background: rgba(13, 13, 13, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-top:    1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* ── Row ───────────────────────────────────────────── */
        .stats__inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          gap: 40px;
          flex-wrap: wrap;
        }

        /* ── Individual stat ───────────────────────────────── */
        .stats__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        /* ── Number + suffix row ───────────────────────────── */
        .stats__figure {
          display: flex;
          align-items: baseline;
          gap: 2px;
          line-height: 1;
        }

        .stats__count,
        .stats__suffix {
          font-size: 56px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }

        /* ── Label ─────────────────────────────────────────── */
        .stats__label {
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
        }

        /* ── Responsive ────────────────────────────────────── */
        @media (max-width: 768px) {
          .stats__inner {
            gap: 48px 32px;
            padding: 0 24px;
            justify-content: center;
          }

          .stats__count,
          .stats__suffix {
            font-size: 44px;
          }
        }

        @media (max-width: 480px) {
          .stats__inner {
            /* 2-column grid on small phones */
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
