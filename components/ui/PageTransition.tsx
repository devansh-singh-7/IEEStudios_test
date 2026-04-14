"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Page Transition Wrapper */}
      <AnimatePresence mode="wait">
        <motion.div key={pathname}>
          {children}
          
          {/* Slide IN from bottom on route exit */}
          <motion.div
            className="page-transition-overlay"
            initial={{ y: "100%" }}
            animate={{ y: "100%", transition: { duration: 0 } }}
            exit={{ y: "0%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Slide OUT to top on route enter */}
          <motion.div
            className="page-transition-overlay"
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            exit={{ y: "-100%", transition: { duration: 0 } }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </AnimatePresence>

      <style>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #8B9FFF;
          z-index: 10000;
        }

        .page-transition-overlay {
          position: fixed;
          inset: 0;
          background: #080808;
          z-index: 9998;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
