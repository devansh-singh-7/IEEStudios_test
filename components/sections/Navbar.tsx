"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();

  // ── Scroll-driven background ─────────────────────────────────────────────
  const progress = useTransform(scrollY, [0, 60], [0, 1]);

  const bgAlpha   = useTransform(progress, [0, 1], [0, 0.4]); 
  const blurPx    = useTransform(progress, [0, 1], [0, 16]);
  const borderAlpha = useTransform(progress, [0, 1], [0, 0.08]);

  const background   = useMotionTemplate`rgba(8,8,8,${bgAlpha})`;
  const backdropBlur = useMotionTemplate`blur(${blurPx}px)`;
  const borderBottom = useMotionTemplate`1px solid rgba(255,255,255,${borderAlpha})`;

  return (
    <motion.header
      style={{
        background,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        borderBottom,
      }}
      className="navbar"
    >
      {/* ── Left: Logo ── */}
      <div className="navbar__logo-group">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="navbar__logo-icon"
        >
          <path
            d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
            fill="currentColor"
          />
        </svg>
        <span className="navbar__logo-text">IEE Studios</span>
      </div>

      {/* ── Center: Blank now ── */}
      <div className="navbar__center"></div>

      <div className="navbar__actions" />

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 80px;
          will-change: background, backdrop-filter;
          transition: padding 0.3s ease;
        }

        /* ── Logo ── */
        .navbar__logo-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .navbar__logo-icon {
          color: #ffffff;
        }

        .navbar__logo-text {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.01em;
          user-select: none;
        }

        /* ── Right Action ── */
        .navbar__actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .navbar {
            padding: 0 24px;
            height: 64px;
          }
        }
      `}</style>
    </motion.header>
  );
}
