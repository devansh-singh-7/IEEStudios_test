"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="section-divider"
    >
      <style>{`
        .section-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          transform-origin: left center;
        }
      `}</style>
    </motion.div>
  );
}
