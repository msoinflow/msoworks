"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { isSafariBrowser } from "@/lib/safari";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
const TARGET_NAME = "Mehmet Salih Ozdinc";
const ROLES = [
  "Motion Designer",
  "Brand Strategist",
  "AI Creative",
  "E-commerce Visual Expert",
  "Mobile App Developer",
  "Web Developer",
];

function useScramble(target: string) {
  const [text, setText] = useState(target);

  useEffect(() => {
    const chars = target.split("");
    const totalFrames = chars.length * 3;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const revealUpTo = Math.floor((frame / totalFrames) * chars.length);

      setText(
        chars
          .map((char, i) => {
            if (i < revealUpTo || char === " ") return char;
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join("")
      );

      if (frame >= totalFrames) {
        setText(target);
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [target]);

  return text;
}

export default function Hero({ onExplore }: { onExplore: () => void }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const scrambledName = useScramble(TARGET_NAME);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = isSafariBrowser()
    ? { damping: 28, stiffness: 90 }
    : { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springCfg);
  const springY = useSpring(mouseY, springCfg);
  const spotlightBg = useMotionTemplate`radial-gradient(600px at ${springX}px ${springY}px, rgba(224, 122, 95, 0.08), transparent 80%)`;

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2500
    );
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Cursor spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlightBg, willChange: "background", transform: "translateZ(0)" }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center relative z-10"
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-border bg-surface/50 text-xs font-mono text-text-secondary"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#22c55e" }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#22c55e" }} />
          </span>
          Available for projects
        </motion.div>

        {/* Scrambled name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-text-primary font-mono"
        >
          {scrambledName}
        </motion.h1>

        {/* Role ticker */}
        <div className="mt-3 h-7 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-sm font-mono text-accent"
            >
              {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onClick={onExplore}
          className="mt-12 group inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-accent-hover transition-colors duration-300"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-lg leading-none"
          >
            ↓
          </motion.span>
          <span>explore</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
