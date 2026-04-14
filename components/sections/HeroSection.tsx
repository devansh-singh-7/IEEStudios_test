"use client";

import { useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

// ─── Dynamic Canvas (no SSR) ──────────────────────────────────────────────
const Canvas = dynamic(
  () => import("@react-three/fiber").then((m) => ({ default: m.Canvas })),
  { ssr: false }
);

// ─── 3D: Particle Field ───────────────────────────────────────────────────
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 200;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    // Autonomous slow drift exclusively
    ref.current.rotation.y = t * 0.04;
    ref.current.rotation.x = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a0b4ff"
        size={0.048}
        sizeAttenuation
        transparent
        opacity={0.72}
      />
    </points>
  );
}

// ─── 3D: Background Wireframe Sphere ─────────────────────────────────────
function BackgroundSphere() {
  return (
    <mesh position={[0, 0, -7]}>
      <sphereGeometry args={[5.5, 20, 20]} />
      <meshBasicMaterial
        color="#8b9fff"
        wireframe
        transparent
        opacity={0.032}
      />
    </mesh>
  );
}

// ─── 3D: Scene root ───────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ParticleField />
      <BackgroundSphere />
    </>
  );
}

// ─── Trusted-by data ──────────────────────────────────────────────────────
const TRUSTED = ["Notion", "Linear", "Vercel", "Raycast", "Loom"];

// ─── HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection() {

  // GSAP animation targets
  const badgeRef    = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const btnsRef     = useRef<HTMLDivElement>(null);
  const trustedRef  = useRef<HTMLDivElement>(null);



  // Entry animation timeline
  useEffect(() => {
    const els = [
      badgeRef.current,
      line1Ref.current,
      line2Ref.current,
      btnsRef.current,
      trustedRef.current,
    ];

    gsap.set(els, { y: 30, opacity: 0, willChange: "transform, opacity" });

    const delays = [0.2, 0.4, 0.55, 0.9, 1.1];

    els.forEach((el, i) => {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: delays[i],
        ease: "power3.out",
      });
    });
  }, []);

  return (
    <section className="hero">

      {/* ── 3D Canvas background ───────────────────────────── */}
      <div className="hero__canvas" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </div>

      {/* ── HTML overlay ───────────────────────────────────── */}
      <div className="hero__content">

        {/* Badge */}
        <div ref={badgeRef} className="hero__badge">
          Award-winning launch films for tech
        </div>

        {/* Headline */}
        <h1 className="hero__h1">
          <span ref={line1Ref} className="hero__line hero__line--white">
            Exclusive Launch Films
          </span>
          <span ref={line2Ref} className="hero__line hero__line--purple">
            for Tech &amp; SaaS
          </span>
        </h1>



        {/* CTAs */}
        <div ref={btnsRef} className="hero__btns">
          <button className="hero__btn hero__btn--fill" data-cursor="hover">
            Book a Call
          </button>
          <button className="hero__btn hero__btn--ghost" data-cursor="hover">
            View Work
          </button>
        </div>
      </div>

      {/* ── Trusted by (pinned to bottom) ─────────────────── */}
      <div ref={trustedRef} className="hero__trusted">
        <span className="hero__trusted-label">Trusted by</span>
        <div className="hero__trusted-logos">
          {TRUSTED.map((name) => (
            <span key={name} className="hero__logo-name">
              {name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Section shell ─────────────────────────────────── */
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 640px;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* ── Canvas fills entire section ───────────────────── */
        .hero__canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        /* ── Centered content stack ────────────────────────── */
        .hero__content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          padding: 0 24px;
          max-width: 860px;
          width: 100%;
        }

        /* ── Badge ─────────────────────────────────────────── */
        .hero__badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 18px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.15);
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.04em;
          background: rgba(255,255,255,0.03);
        }

        /* ── Headline ──────────────────────────────────────── */
        .hero__h1 {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          font-size: clamp(40px, 6.5vw, 72px);
          line-height: 1.06;
          letter-spacing: -0.03em;
        }

        .hero__line {
          display: block;
        }

        .hero__line--white {
          font-weight: 700;
          color: #ffffff;
        }

        .hero__line--purple {
          font-weight: 400;
          font-style: italic;
          color: #8b9fff;
        }

        /* ── Subtitle ──────────────────────────────────────── */
        .hero__subtitle {
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255,255,255,0.48);
          max-width: 480px;
        }

        /* ── CTA buttons ───────────────────────────────────── */
        .hero__btns {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero__btn {
          font-size: 14px;
          font-weight: 500;
          padding: 12px 28px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.3s ease, color 0.3s ease,
                      opacity 0.3s ease, border-color 0.3s ease;
        }

        .hero__btn--fill {
          background: #ffffff;
          color: #080808;
          border: 1px solid transparent;
        }

        .hero__btn--fill:hover {
          opacity: 0.86;
        }

        .hero__btn--ghost {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.2);
          position: relative;
        }

        /* Underline slide-in on hover */
        .hero__btn--ghost::after {
          content: "";
          position: absolute;
          bottom: 10px;
          left: 28px;
          right: 28px;
          height: 1px;
          background: rgba(255,255,255,0.7);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.3s ease;
        }

        .hero__btn--ghost:hover::after {
          transform: scaleX(1);
        }

        /* ── Trusted-by strip ──────────────────────────────── */
        .hero__trusted {
          position: absolute;
          bottom: 40px;
          left: 0;
          right: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .hero__trusted-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        .hero__trusted-logos {
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero__logo-name {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.18);
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .hero__logo-name:hover {
          color: rgba(255,255,255,0.45);
        }

        /* ── Responsive ────────────────────────────────────── */
        @media (max-width: 600px) {
          .hero__trusted-logos {
            gap: 20px;
          }

          .hero__trusted {
            bottom: 24px;
          }
        }
      `}</style>
    </section>
  );
}
