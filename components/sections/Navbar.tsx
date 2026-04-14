"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // ── Scroll-driven background ─────────────────────────────────────────────
  const progress = useTransform(scrollY, [0, 60], [0, 1]);

  const bgAlpha   = useTransform(progress, [0, 1], [0, 0.4]); 
  const blurPx    = useTransform(progress, [0, 1], [0, 16]);
  const borderAlpha = useTransform(progress, [0, 1], [0, 0.08]);

  const background   = useMotionTemplate`rgba(8,8,8,${bgAlpha})`;
  const backdropBlur = useMotionTemplate`blur(${blurPx}px)`;
  const borderBottom = useMotionTemplate`1px solid rgba(255,255,255,${borderAlpha})`;


  // ── Search Interaction ───────────────────────────────────────────────────
  useEffect(() => {
    // Close on click outside
    function handleClickOutside(e: MouseEvent) {
      if (searchOpen && searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    // Esc key support
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  useEffect(() => {
    // Auto-focus input when the drawer expands
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    } else if (!searchOpen && inputRef.current) {
      inputRef.current.value = ""; // clear when closed
    }
  }, [searchOpen]);

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

      {/* ── Right: Search Bar ── */}
      <div className="navbar__actions" ref={searchContainerRef}>
        <motion.div
          className={`search-wrapper ${searchOpen ? "search-wrapper--active" : ""}`}
          initial={false}
          animate={{
            width: searchOpen ? 280 : 44,
            backgroundColor: searchOpen ? "rgba(255, 255, 255, 0.08)" : "transparent",
            borderColor: searchOpen ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0)",
          }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => !searchOpen && setSearchOpen(true)}
          style={{
            height: 44,
            borderRadius: 9999,
            border: "1px solid",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            cursor: searchOpen ? "text" : "pointer"
          }}
        >
          {/* Search Icon */}
          <div className="search-icon">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="11" cy="11" r="8"></circle>
               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
             </svg>
          </div>

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search projects..."
            style={{
              opacity: searchOpen ? 1 : 0,
              pointerEvents: searchOpen ? "auto" : "none"
            }}
          />

          {/* Close button (X) */}
          <AnimatePresence>
            {searchOpen && (
              <motion.button
                className="search-close"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchOpen(false);
                }}
                aria-label="Close search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

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

        /* ── Search Actions ── */
        .navbar__actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        /* Hover style just for the search icon bounds when entirely closed */
        .search-wrapper:not(.search-wrapper--active):hover .search-icon {
          background: rgba(255, 255, 255, 0.05); /* Slight highlight */
        }

        .search-icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.85);
          transition: background 0.3s ease, color 0.3s ease;
          border-radius: 50%;
        }

        .search-input {
          flex: 1;
          height: 100%;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 14px;
          outline: none;
          padding: 0;
          transition: opacity 0.3s ease;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .search-close {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .search-close:hover {
          color: #ffffff;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .navbar {
            padding: 0 24px;
            height: 64px;
          }
        }
        
        @media (max-width: 480px) {
           .search-wrapper--active {
              width: calc(100vw - 160px) !important;
           }
        }
      `}</style>
    </motion.header>
  );
}
