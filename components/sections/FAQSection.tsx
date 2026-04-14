"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ──────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What's the turnaround time for a launch film?",
    a: "Most launch films are delivered within 3–4 weeks from kick-off. This covers discovery, concept, production, and revisions. Rush timelines can be accommodated on a case-by-case basis — just flag it early.",
  },
  {
    q: "How is a Launch Film different from a launch video?",
    a: "A launch video shows your product. A Launch Film tells a story. We approach every project through the lens of cinema — deliberate pacing, a narrative arc, and a score that makes the audience feel something. It's the difference between a feature and a film.",
  },
  {
    q: "How does the process work?",
    a: "We start with a 45-minute discovery call to understand your product, audience, and launch goals. From there we develop a creative brief, script, and storyboard. Once approved, we move into production and deliver a polished cut with two rounds of revisions included.",
  },
  {
    q: "What does it cost?",
    a: "Projects typically start at $8,000 for a single-deliverable launch film. Larger campaigns with multiple cuts or extended licensing are scoped individually. We're transparent about pricing from day one — no surprises, no hidden fees.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes. Some of our best work has come from pre-launch founders who knew they needed to make a big first impression. If you're raising a round or going public with your product for the first time, this is exactly the right moment to invest in how the world sees you.",
  },
];

// ─── Framer Motion variants ────────────────────────────────────────────────
const answerVariants = {
  closed: { height: 0, opacity: 0 },
  open:   { height: "auto", opacity: 1 },
};

const iconVariants = {
  closed: { rotate: 0 },
  open:   { rotate: 45 },
};

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ─── Single FAQ item  ──────────────────────────────────────────────────────
interface FAQItemProps {
  faq:    { q: string; a: string };
  index:  number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className={`faq__item${isOpen ? " faq__item--open" : ""}`}>
      <button
        className="faq__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {/* Index number */}
        <span className="faq__num">{num}</span>

        {/* Question text */}
        <span className="faq__question">{faq.q}</span>

        {/* Animated plus icon */}
        <motion.span
          className="faq__icon"
          variants={iconVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease }}
          aria-hidden
        >
          +
        </motion.span>
      </button>

      {/* Animated answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            variants={answerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.45, ease }}
            style={{ overflow: "hidden" }}
          >
            <p className="faq__answer">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── FAQSection ────────────────────────────────────────────────────────────
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  // Entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading block fades up
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Each FAQ item staggers in from below
      const items = gsap.utils.toArray<HTMLElement>(".faq__item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="faq">
      <div className="faq__inner">

        {/* Heading block */}
        <div ref={headingRef} className="faq__header">
          <span className="faq__eyebrow">Got questions?</span>
          <h2 className="faq__heading">Frequently Asked</h2>
        </div>

        {/* Accordion list */}
        <div className="faq__list" role="list">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

      </div>

      <style>{`
        /* ── Section shell ──────────────────────────────────── */
        .faq {
          padding: 120px 0;
          background: transparent;
        }

        .faq__inner {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ── Heading block ──────────────────────────────────── */
        .faq__header {
          margin-bottom: 56px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .faq__eyebrow {
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.3);
        }

        .faq__heading {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }

        /* ── Accordion list ────────────────────────────────── */
        .faq__list {
          display: flex;
          flex-direction: column;
        }

        /* ── Single item ────────────────────────────────────── */
        .faq__item {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          transition: border-color 0.3s ease;
          will-change: opacity, transform;
          opacity: 0; /* GSAP animates this in */
        }

        .faq__item:last-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .faq__item--open {
          border-color: rgba(255, 255, 255, 0.12);
        }

        /* ── Trigger button ────────────────────────────────── */
        .faq__trigger {
          width: 100%;
          display: grid;
          grid-template-columns: 40px 1fr 32px;
          align-items: center;
          gap: 16px;
          padding: 24px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: opacity 0.2s ease;
        }

        .faq__trigger:hover .faq__question {
          color: rgba(255, 255, 255, 0.75);
        }

        /* ── Index number ────────────────────────────────────── */
        .faq__num {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.25);
          letter-spacing: 0.06em;
          font-variant-numeric: tabular-nums;
        }

        /* ── Question text ─────────────────────────────────── */
        .faq__question {
          font-size: 17px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.4;
          letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }

        .faq__item--open .faq__question {
          color: #ffffff;
        }

        /* ── Plus icon ─────────────────────────────────────── */
        .faq__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-size: 18px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1;
          flex-shrink: 0;
          transition: border-color 0.3s ease, color 0.3s ease,
                      background 0.3s ease;
          /* transform handled by framer-motion */
        }

        .faq__item--open .faq__icon {
          border-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        /* ── Answer ────────────────────────────────────────── */
        .faq__answer {
          /* Indented to align with the question column */
          padding: 0 40px 28px 56px;
          font-size: 15px;
          line-height: 1.72;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.005em;
        }

        /* ── Responsive ────────────────────────────────────── */
        @media (max-width: 600px) {
          .faq__inner {
            padding: 0 20px;
          }

          .faq__trigger {
            grid-template-columns: 32px 1fr 28px;
            gap: 12px;
            padding: 20px 0;
          }

          .faq__question {
            font-size: 15px;
          }

          .faq__answer {
            padding: 0 0 24px 44px;
          }
        }
      `}</style>
    </section>
  );
}
