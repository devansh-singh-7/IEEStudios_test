"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ─── Data ─────────────────────────────────────────────────────────────────
const projects = [
  {
    id: "01",
    title: "Nebula",
    client: "Tableau",
    category: "SaaS Launch Film",
    year: "2024",
    story: "They had 48 hours before launch. We had a story to tell.",
    color: "#3D52A0",       // deep blue accent
    videoPlaceholder: true
  },
  {
    id: "02", 
    title: "Signal",
    client: "Motion Links",
    category: "Brand Campaign",
    year: "2024",
    story: "A brand that whispered. We made it roar.",
    color: "#7B2D8B",       // deep purple accent
    videoPlaceholder: true
  },
  {
    id: "03",
    title: "Basalt",
    client: "Basalt Co.",
    category: "Product Launch Film",
    year: "2023",
    story: "Built for builders. Shot like cinema.",
    color: "#1a3a2a",       // deep green accent
    videoPlaceholder: true
  },
  {
    id: "04",
    title: "Construct",
    client: "Dev Collab",
    category: "Product Showcase",
    year: "2024",
    story: "Code is invisible. We made it feel tangible.",
    color: "#3a2a1a",       // deep amber accent
    videoPlaceholder: true
  },
  {
    id: "05",
    title: "Meridian",
    client: "Risk Systems",
    category: "Brand Story",
    year: "2024",
    story: "Trust takes years to build. 90 seconds to show.",
    color: "#1a2a3a",       // deep navy accent
    videoPlaceholder: true
  },
  {
    id: "06",
    title: "Epoch",
    client: "Nova Platform",
    category: "Launch Spot",
    year: "2025",
    story: "The future launched. We caught it on camera.",
    color: "#2a1a3a",       // deep violet accent
    videoPlaceholder: true
  }
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const entryKickerRef = useRef<HTMLParagraphElement>(null);
  const entryTitleRef = useRef<HTMLHeadingElement>(null);
  const entryTextRef = useRef<HTMLParagraphElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. SECTION ENTRY
      // Background remains transparent so global stars show through
      // Text fade in
      gsap.fromTo(
        [entryKickerRef.current, entryTitleRef.current, entryTextRef.current],
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: entryTitleRef.current,
            start: "top 85%",
            end: "bottom center",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. PROJECT CHAPTERS
      const chapters = gsap.utils.toArray<HTMLElement>(".chapter");
      
      chapters.forEach((chapter, i) => {
        const id       = chapter.querySelector(".chapter__id");
        const client   = chapter.querySelector(".chapter__client");
        const title    = chapter.querySelector(".chapter__title");
        const story    = chapter.querySelector(".chapter__story");
        const line     = chapter.querySelector(".chapter__line");
        const right    = chapter.querySelector(".chapter__right-content");
        const bgWash   = chapter.querySelector(".chapter__bg-wash");
        
        // The master timeline per chapter
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.5,
          }
        });

        // 1. Ghost number blooms to a readable, intentional watermark
        tl.fromTo(id, { opacity: 0.08 }, { opacity: 0.2 }, 0);

        // 2. Client name slides in
        tl.fromTo(client, { opacity: 0, x: -15 }, { opacity: 1, x: 0 }, 0);

        // 3. Title slides in 0.1s after
        tl.fromTo(title, { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, 0.1);

        // 4. Story fade up
        tl.fromTo(story, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, 0.2);

        // 5. Accent line draws
        tl.fromTo(line, { width: 0 }, { width: 138 }, 0.3);

        // 6. Right side scale/rotate
        tl.fromTo(
          right,
          { scale: 0.85, opacity: 0, rotation: -2 },
          { scale: 1, opacity: 1, rotation: 0, ease: "power2.out" },
          0
        );

        // 7. Background wash rises for better depth and contrast
        tl.fromTo(bgWash, { opacity: 0 }, { opacity: 0.24 }, 0);

      });

      // 3. TRANSITION BEATS
      const beats = gsap.utils.toArray<HTMLElement>(".transition-beat");
      beats.forEach((beat) => {
        const line = beat.querySelector(".transition-beat__line");
        const text = beat.querySelector(".transition-beat__next");

        const beatTl = gsap.timeline({
          scrollTrigger: {
            trigger: beat,
            start: "top 90%",
            end: "top 40%",
            scrub: 1.5,
          }
        });

        beatTl.fromTo(line, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center" }, 0);
        beatTl.fromTo(text, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.1);
      });

      // 4. EXIT BLOCK
      gsap.fromTo(
        exitRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: exitRef.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: 1.5,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="work">
      
      {/* SECTION ENTRY */}
      <div className="work__entry">
        <p ref={entryKickerRef} className="work__entry-kicker">
          Stories
        </p>
        <h2 ref={entryTitleRef} className="work__entry-title">
          Films Built To Be Remembered
        </h2>
        <p ref={entryTextRef} className="work__entry-text">
          Each chapter below is a launch story crafted for clarity, emotion, and conversion.
        </p>
      </div>

      {/* CHAPTERS */}
      {projects.map((project, i) => (
        <div key={project.id} className="chapter-wrapper">
          
          <div className="chapter">
            {/* Extremely subtle section wash, animated in GSAP */}
            <div 
              className="chapter__bg-wash" 
              style={{
                background: `radial-gradient(circle at 72% 42%, ${hexToRgba(project.color, 0.52)} 0%, rgba(8, 8, 8, 0) 62%)`
              }}
              aria-hidden
            />

            <div className="chapter__inner">
              
              {/* LEFT SIDE: Narrative Details */}
              <div className="chapter__left">
                <div className="chapter__sticky-content">
                  <span className="chapter__id">{project.id}</span>
                  
                  <div className="chapter__meta-top">
                    <span className="chapter__client">{project.client}</span>
                  </div>

                  <h3 className="chapter__title">{project.title}</h3>
                  
                  <div className="chapter__meta-bottom">
                    <span className="chapter__category">{project.category}</span>
                    <span className="chapter__year">{project.year}</span>
                  </div>

                  <p className="chapter__story">{project.story}</p>
                  
                  <div 
                    className="chapter__line" 
                    style={{ backgroundColor: project.color }}
                  />
                </div>
              </div>

              {/* RIGHT SIDE: Video / Image Array */}
              <div className="chapter__right">
                <div 
                  className="chapter__right-content"
                  style={{
                    background: `linear-gradient(150deg, ${hexToRgba(project.color, 0.34)} 0%, rgba(14, 14, 16, 0.84) 55%, rgba(6, 6, 8, 0.96) 100%)`,
                    borderColor: hexToRgba(project.color, 0.7),
                    boxShadow: `0 52px 120px -58px ${hexToRgba(project.color, 0.95)}`
                  }}
                >
                  <span className="chapter__video-tag">Launch Reel</span>
                  <video
                    className="chapter__video"
                    src={`/videos/${project.title.toLowerCase()}.mp4`}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                </div>
              </div>

            </div>
          </div>

          {/* TRANSITION BEAT (only if not last project) */}
          {i !== projects.length - 1 && (
            <div className="transition-beat">
               <div 
                 className="transition-beat__line" 
                 style={{ backgroundColor: projects[i].color }}
               />
               <span className="transition-beat__next">
                 {projects[i+1].title}
               </span>
            </div>
          )}

        </div>
      ))}

      {/* SECTION EXIT */}
      <div ref={exitRef} className="work__exit">
        <h4 className="work__exit-title">6 stories told.</h4>
        <p className="work__exit-sub">Yours could be next.</p>
        <a href="#contact" className="work__exit-cta group">
          Start a Project{" "}
          <span className="work__exit-arrow">→</span>
          <span className="work__exit-underline" />
        </a>
      </div>

      <style>{`
        /* ── SECTION SHELL ── */
        .work {
          position: relative;
          background: transparent;
          width: 100%;
          z-index: 10;
          padding-bottom: 40px;
        }

        .work::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(circle at 14% 10%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 34%),
            radial-gradient(circle at 86% 18%, rgba(174, 255, 66, 0.08) 0%, rgba(174, 255, 66, 0) 30%),
            linear-gradient(180deg, rgba(8, 8, 8, 0.2) 0%, rgba(8, 8, 8, 0.82) 100%);
        }

        .work > * {
          position: relative;
          z-index: 1;
        }

        /* ── ENTRY ── */
        .work__entry {
          padding: 170px 40px 82px;
          max-width: 1440px;
          margin: 0 auto;
        }

        .work__entry-kicker {
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.24);
          background: rgba(255, 255, 255, 0.08);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.92);
          font-weight: 600;
          margin-bottom: 14px;
        }

        .work__entry-title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(38px, 5.2vw, 72px);
          font-style: italic;
          font-weight: 550;
          letter-spacing: -0.025em;
          color: #ffffff;
          line-height: 0.98;
          margin-bottom: 16px;
          max-width: 12ch;
          text-wrap: balance;
        }

        .work__entry-text {
          font-size: clamp(16px, 1.35vw, 20px);
          line-height: 1.62;
          color: rgba(255, 255, 255, 0.82);
          max-width: 52ch;
          font-weight: 500;
        }

        /* ── CHAPTER SHELL ── */
        .chapter-wrapper {
          position: relative;
          width: 100%;
        }

        .chapter {
          position: relative;
          min-height: 90vh;
          width: 100%;
        }

        .chapter__bg-wash {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          filter: saturate(1.2);
        }

        .chapter__inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: stretch;
          gap: 48px;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
          min-height: 100vh;
        }

        /* ── LEFT SIDE (STICKY) ── */
        .chapter__left {
          width: 42%;
          position: relative;
        }

        .chapter__sticky-content {
          position: sticky;
          top: 68px;
          height: calc(100vh - 136px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 42px 38px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.34);
          background:
            linear-gradient(160deg, rgba(22, 22, 26, 0.93) 0%, rgba(11, 11, 14, 0.88) 100%),
            radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 35%);
          backdrop-filter: blur(14px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 36px 84px -56px rgba(0, 0, 0, 0.98);
        }

        .chapter__id {
          position: absolute;
          top: -22px;
          right: 18px;
          font-size: clamp(86px, 11vw, 142px);
          font-weight: 200;
          color: rgba(255, 255, 255, 0.16);
          line-height: 1;
          user-select: none;
          z-index: 0;
          letter-spacing: -0.05em;
        }

        .chapter__client {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          display: inline-block;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }

        .chapter__title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(44px, 4.5vw, 64px);
          font-style: italic;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.02;
          letter-spacing: -0.025em;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .chapter__meta-bottom {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .chapter__category,
        .chapter__year {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.1);
        }

        /* Uses the imported Playfair Display via the CSS var from layout.tsx */
        .chapter__story {
          font-size: clamp(18px, 1.45vw, 23px);
          font-style: normal;
          color: rgba(255, 255, 255, 0.96);
          line-height: 1.55;
          margin-bottom: 34px;
          max-width: 32ch;
          font-weight: 500;
          position: relative;
          z-index: 1;
        }

        .chapter__line {
          height: 4px;
          width: 0;
          border-radius: 999px;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
          position: relative;
          z-index: 1;
        }

        /* ── RIGHT SIDE ── */
        .chapter__right {
          width: 58%;
          display: flex;
          align-items: center;
          padding: 78px 0;
        }

        .chapter__right-content {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.4);
          isolation: isolate;
        }

        .chapter__right-content::before,
        .chapter__right-content::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .chapter__right-content::before {
          background:
            linear-gradient(124deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 42%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%);
        }

        .chapter__right-content::after {
          background: radial-gradient(circle at 50% 120%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 58%);
        }

        .chapter__video-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 3;
          padding: 7px 10px;
          border-radius: 999px;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
          background: rgba(8, 8, 8, 0.76);
          border: 1px solid rgba(255, 255, 255, 0.36);
          font-weight: 600;
          backdrop-filter: blur(4px);
        }

        .chapter__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          mix-blend-mode: normal;
          opacity: 1;
          filter: saturate(1.12) contrast(1.12) brightness(0.98);
        }

        /* ── TRANSITION BEAT ── */
        .transition-beat {
          max-width: 1440px;
          margin: 0 auto;
          padding: 52px 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 18px;
        }

        .transition-beat__line {
          width: 100%;
          height: 2px;
          border-radius: 999px;
          box-shadow: 0 0 26px rgba(255, 255, 255, 0.15);
        }

        .transition-beat__next {
          font-family: var(--font-playfair), serif;
          font-size: clamp(58px, 9vw, 110px);
          font-style: italic;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.34);
          letter-spacing: -0.03em;
          text-align: right;
          line-height: 0.95;
          text-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }

        /* ── EXIT BLOCK ── */
        .work__exit {
          max-width: 760px;
          margin: 24px auto 0;
          padding: 74px 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background:
            linear-gradient(160deg, rgba(255, 255, 255, 0.08) 0%, rgba(18, 18, 22, 0.5) 42%, rgba(8, 8, 10, 0.76) 100%),
            radial-gradient(circle at 70% -30%, rgba(200, 255, 0, 0.2) 0%, rgba(200, 255, 0, 0) 52%);
          box-shadow: 0 44px 88px -62px rgba(200, 255, 0, 0.55);
        }

        .work__exit-title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(34px, 4.4vw, 48px);
          font-style: italic;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }

        .work__exit-sub {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 30px;
        }

        .work__exit-cta {
          position: relative;
          font-size: 15px;
          font-weight: 600;
          color: #0f1115;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 999px;
          background: #c8ff00;
          border: 1px solid rgba(200, 255, 0, 0.45);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .work__exit-arrow {
          transition: transform 0.3s ease;
        }

        .work__exit-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 35px -18px rgba(200, 255, 0, 0.9);
        }
        
        .work__exit-cta:hover .work__exit-arrow {
          transform: translateX(4px);
        }

        .work__exit-underline {
          position: absolute;
          bottom: 9px;
          left: 18px;
          width: calc(100% - 36px);
          height: 1px;
          background: rgba(9, 10, 11, 0.5);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .work__exit-cta:hover .work__exit-underline {
          transform: scaleX(1);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .chapter__inner {
            flex-direction: column;
            padding: 40px 24px;
            gap: 30px;
          }

          .work__entry {
            padding: 110px 24px 46px;
          }

          .work__entry-kicker {
            margin-bottom: 10px;
          }

          .work__entry-title {
            max-width: 14ch;
            margin-bottom: 12px;
          }

          .chapter__left,
          .chapter__right {
            width: 100%;
          }

          .chapter__sticky-content {
            position: relative;
            height: auto;
            top: auto;
            padding: 28px 22px;
          }

          .chapter__id {
            right: 14px;
            top: -12px;
            font-size: clamp(72px, 24vw, 128px);
          }

          .chapter__title {
            font-size: clamp(38px, 12vw, 54px);
          }

          .chapter__story {
            max-width: none;
            margin-bottom: 28px;
          }

          .chapter__right {
            padding: 0;
          }

          .chapter__right-content {
            border-radius: 18px;
          }

          .transition-beat {
            padding: 22px 24px 30px;
            align-items: flex-start;
          }

          .transition-beat__next {
            text-align: left;
            font-size: clamp(46px, 14vw, 78px);
          }

          .work__exit {
            margin: 18px 24px 0;
            padding: 48px 22px;
            border-radius: 22px;
          }
        }
      `}</style>
    </section>
  );
}
