"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const entryTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. SECTION ENTRY
      // Background remains transparent so global stars show through
      // Text fade in
      gsap.fromTo(
        entryTextRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: entryTextRef.current,
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

        // 1. Ghost number fades from 0.02 to 0.06
        tl.fromTo(id, { opacity: 0.02 }, { opacity: 0.06 }, 0);

        // 2. Client name slides in
        tl.fromTo(client, { opacity: 0, x: -15 }, { opacity: 1, x: 0 }, 0);

        // 3. Title slides in 0.1s after
        tl.fromTo(title, { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, 0.1);

        // 4. Story fade up
        tl.fromTo(story, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, 0.2);

        // 5. Accent line draws
        tl.fromTo(line, { width: 0 }, { width: 60 }, 0.3);

        // 6. Right side scale/rotate
        tl.fromTo(
          right,
          { scale: 0.85, opacity: 0, rotation: -2 },
          { scale: 1, opacity: 1, rotation: 0, ease: "power2.out" },
          0
        );

        // 7. Background Wash (opacity 0.03 of project.color) comes in
        tl.fromTo(bgWash, { opacity: 0 }, { opacity: 0.03 }, 0);

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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="work" id="work">
      
      {/* SECTION ENTRY */}
      <div className="work__entry">
        <p ref={entryTextRef} className="work__entry-text">
          — a few stories we&apos;ve told
        </p>
      </div>

      {/* CHAPTERS */}
      {projects.map((project, i) => (
        <div key={project.id} className="chapter-wrapper">
          
          <div className="chapter">
            {/* Extremely subtle section wash, animated in GSAP */}
            <div 
              className="chapter__bg-wash" 
              style={{ backgroundColor: project.color }}
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
                  style={{ backgroundColor: `rgba(${parseInt(project.color.slice(1,3),16)}, ${parseInt(project.color.slice(3,5),16)}, ${parseInt(project.color.slice(5,7),16)}, 0.15)` }}
                >
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

      <style>{`
        /* ── SECTION SHELL ── */
        .work {
          position: relative;
          background: transparent;
          width: 100%;
          z-index: 10;
        }

        /* ── ENTRY ── */
        .work__entry {
          padding: 180px 40px 100px;
          max-width: 1440px;
          margin: 0 auto;
        }

        .work__entry-text {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 500;
        }

        /* ── CHAPTER SHELL ── */
        .chapter-wrapper {
          position: relative;
          width: 100%;
        }

        .chapter {
          position: relative;
          min-height: 100vh;
          width: 100%;
        }

        .chapter__bg-wash {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .chapter__inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: stretch;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
          min-height: 100vh;
        }

        /* ── LEFT SIDE (STICKY) ── */
        .chapter__left {
          width: 40%;
          position: relative;
        }

        .chapter__sticky-content {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: 60px;
        }

        .chapter__id {
          position: absolute;
          top: 15%;
          left: -10%;
          font-size: clamp(100px, 15vw, 160px);
          font-weight: 100;
          color: rgba(255, 255, 255, 0.04);
          line-height: 1;
          user-select: none;
          z-index: -1;
        }

        .chapter__client {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.35);
          font-weight: 600;
          display: inline-block;
          margin-bottom: 24px;
        }

        .chapter__title {
          font-size: clamp(40px, 4vw, 52px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }

        .chapter__meta-bottom {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .chapter__category,
        .chapter__year {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 500;
        }

        /* Uses the imported Playfair Display via the CSS var from layout.tsx */
        .chapter__story {
          font-family: var(--font-playfair), serif;
          font-size: 18px;
          font-style: italic;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
          margin-bottom: 32px;
          max-width: 380px;
        }

        .chapter__line {
          height: 1px;
          width: 0;
        }

        /* ── RIGHT SIDE ── */
        .chapter__right {
          width: 60%;
          display: flex;
          align-items: center;
          padding: 80px 0;
        }

        .chapter__right-content {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5);
        }

        .chapter__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: lighten;
        }

        /* ── TRANSITION BEAT ── */
        .transition-beat {
          max-width: 1440px;
          margin: 0 auto;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
        }

        .transition-beat__line {
          width: 100%;
          height: 1px;
        }

        .transition-beat__next {
          font-size: clamp(60px, 10vw, 120px);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.04);
          letter-spacing: -0.04em;
          text-align: right;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .chapter__inner {
            flex-direction: column;
            padding: 40px 24px;
            gap: 40px;
          }

          .chapter__left,
          .chapter__right {
            width: 100%;
          }

          .chapter__sticky-content {
            position: relative;
            height: auto;
            padding-right: 0;
          }

          .chapter__id {
            left: 0;
            top: -40px;
          }

          .transition-beat { padding: 24px; }
          .work__entry { padding: 100px 24px 60px; }
        }
      `}</style>
    </section>
  );
}
