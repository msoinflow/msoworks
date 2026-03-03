"use client";

import { useId, useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import type { Project, TaglineEffect } from "@/lib/data";
import { isSafariBrowser } from "@/lib/safari";

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  isAnyHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const brandColors = ["#a78bba", "#7eb8c9", "#e0c097", "#c4d4a0", "#d4a0a0", "#9bb0d4", "#ffffff"];

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}

function TaglineRenderer({
  text,
  effect,
  isHovered,
  isTouch,
}: {
  text: string;
  effect: TaglineEffect;
  isHovered: boolean;
  isTouch: boolean;
}) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (effect !== "typewriter") return;
    if (!isHovered) {
      setTypedText("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [isHovered, text, effect]);

  const baseClass = "text-sm italic";

  if (effect === "float") {
    return (
      <span className={`${baseClass} inline-flex gap-[1px] transition-all duration-300 ${
        isHovered ? "opacity-80 text-text-secondary" : isTouch ? "opacity-50 text-text-secondary" : "opacity-20 text-text-tertiary"
      }`}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            animate={
              isHovered
                ? { y: [0, -8, 0, 6, 0], rotate: [0, -3, 0, 3, 0] }
                : { y: 0, rotate: 0 }
            }
            transition={
              isHovered
                ? { duration: 1.8, repeat: Infinity, delay: i * 0.04, ease: "easeInOut" as const }
                : { duration: 0.3 }
            }
            className="inline-block"
            style={{ minWidth: char === " " ? "0.25em" : undefined }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  }

  if (effect === "scale") {
    return (
      <motion.span
        animate={
          isHovered
            ? {
                opacity: [0.3, 0.6, 0.9, 1, 0.9, 0.7, 0.9, 1, 0.9, 0.6, 0.3],
                scale: [0.95, 1, 1.06, 1.1, 1.06, 1.02, 1.06, 1.1, 1.06, 1, 0.95],
                textShadow: [
                  "0 0 0px rgba(224,122,95,0)",
                  "0 0 4px rgba(224,122,95,0.2)",
                  "0 0 10px rgba(224,122,95,0.4)",
                  "0 0 16px rgba(224,122,95,0.5)",
                  "0 0 10px rgba(224,122,95,0.4)",
                  "0 0 4px rgba(224,122,95,0.2)",
                  "0 0 10px rgba(224,122,95,0.4)",
                  "0 0 16px rgba(224,122,95,0.5)",
                  "0 0 10px rgba(224,122,95,0.4)",
                  "0 0 4px rgba(224,122,95,0.2)",
                  "0 0 0px rgba(224,122,95,0)",
                ],
              }
            : { opacity: 1, scale: 1, textShadow: "0 0 0px rgba(224,122,95,0)" }
        }
        transition={
          isHovered
            ? { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
            : { duration: 0.3 }
        }
        className={`${baseClass} inline-block transition-colors duration-300 ${
          isHovered ? "text-accent-hover" : isTouch ? "opacity-50 text-text-secondary" : "opacity-20 text-text-tertiary"
        }`}
      >
        {text}
      </motion.span>
    );
  }

  if (effect === "colorize") {
    return (
      <span className={`${baseClass} transition-opacity duration-300 ${isHovered ? "opacity-100" : isTouch ? "opacity-50" : "opacity-20"}`}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="transition-colors duration-500"
            style={{ color: isHovered ? brandColors[i % brandColors.length] : "#6a6a6a" }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  }

  if (effect === "slide") {
    return (
      <span className={`${baseClass} inline-flex gap-[1px] overflow-hidden transition-opacity duration-300 ${
        isHovered ? "opacity-80 text-text-secondary" : isTouch ? "opacity-50 text-text-secondary" : "opacity-20 text-text-tertiary"
      }`}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            animate={
              isHovered
                ? { x: [16, 0], opacity: [0, 1] }
                : { x: 0, opacity: 1 }
            }
            transition={
              isHovered
                ? { duration: 0.25, delay: i * 0.03, ease: "easeOut" }
                : { duration: 0.15 }
            }
            className="inline-block"
            style={{ minWidth: char === " " ? "0.25em" : undefined }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  }

  if (effect === "typewriter") {
    return (
      <span className={`${baseClass} font-mono transition-opacity duration-300 ${
        isHovered ? "opacity-70 text-text-secondary" : isTouch ? "opacity-50 text-text-secondary" : "opacity-20 text-text-tertiary"
      }`}>
        {isHovered ? typedText : text}
        {isHovered && typedText.length < text.length && (
          <span className="animate-pulse">|</span>
        )}
      </span>
    );
  }

  return null;
}

function ServicePattern({ title, uid }: { title: string; uid: string }) {
  const patId = `pat-${uid}`;

  if (title === "Motion Design") {
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id={patId} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="24" stroke="#2e2e2e" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patId})`} />
        {/* Clapperboard icon */}
        <g transform="translate(50% 50%)" style={{ transform: "translate(calc(50% - 20px), calc(50% - 20px))" }}>
          <rect x="0" y="8" width="40" height="32" rx="2" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
          <line x1="0" y1="14" x2="40" y2="14" stroke="#3a3a3a" strokeWidth="1.5" />
          <line x1="8" y1="8" x2="12" y2="0" stroke="#3a3a3a" strokeWidth="1.5" />
          <line x1="18" y1="8" x2="22" y2="0" stroke="#3a3a3a" strokeWidth="1.5" />
          <line x1="28" y1="8" x2="32" y2="0" stroke="#3a3a3a" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  if (title === "E-commerce Visuals") {
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id={patId} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect x="2" y="2" width="12" height="12" rx="1" fill="none" stroke="#2e2e2e" strokeWidth="1" />
            <rect x="18" y="2" width="12" height="12" rx="1" fill="none" stroke="#2e2e2e" strokeWidth="1" />
            <rect x="2" y="18" width="12" height="12" rx="1" fill="none" stroke="#2e2e2e" strokeWidth="1" />
            <rect x="18" y="18" width="12" height="12" rx="1" fill="none" stroke="#2e2e2e" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patId})`} />
      </svg>
    );
  }

  if (title === "Brand Identity") {
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id={patId} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="28" fill="none" stroke="#2e2e2e" strokeWidth="1" />
            <circle cx="30" cy="30" r="18" fill="none" stroke="#272727" strokeWidth="1" />
            <circle cx="30" cy="30" r="8" fill="none" stroke="#252525" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patId})`} />
      </svg>
    );
  }

  if (title === "AI Workflows") {
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id={patId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="#2e2e2e" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patId})`} />
        {/* Simple circuit lines */}
        <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#2e2e2e" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="#2e2e2e" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    );
  }

  if (title === "Mobile App Development") {
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id={patId} x="0" y="0" width="30" height="50" patternUnits="userSpaceOnUse">
            {/* Phone outline tile */}
            <rect x="5" y="4" width="20" height="42" rx="4" fill="none" stroke="#2e2e2e" strokeWidth="1" />
            {/* Notch */}
            <line x1="11" y1="4" x2="19" y2="4" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patId})`} />
        {/* Center phone icon */}
        <g style={{ transform: "translate(calc(50% - 14px), calc(50% - 22px))" }}>
          <rect x="0" y="0" width="28" height="44" rx="5" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
          <line x1="9" y1="0" x2="19" y2="0" stroke="#3a3a3a" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="14" cy="38" r="2.5" fill="none" stroke="#3a3a3a" strokeWidth="1.2" />
        </g>
      </svg>
    );
  }

  if (title === "Web Development & Design") {
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id={patId} x="0" y="0" width="60" height="14" patternUnits="userSpaceOnUse">
            {/* Code line dashes */}
            <line x1="0" y1="7" x2="60" y2="7" stroke="#2e2e2e" strokeWidth="1" strokeDasharray="8 6 20 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patId})`} />
        {/* Browser window icon */}
        <g style={{ transform: "translate(calc(50% - 28px), calc(50% - 20px))" }}>
          <rect x="0" y="0" width="56" height="40" rx="3" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
          <line x1="0" y1="11" x2="56" y2="11" stroke="#3a3a3a" strokeWidth="1.5" />
          <circle cx="8" cy="5.5" r="2" fill="none" stroke="#3a3a3a" strokeWidth="1.2" />
          <circle cx="15" cy="5.5" r="2" fill="none" stroke="#3a3a3a" strokeWidth="1.2" />
          <circle cx="22" cy="5.5" r="2" fill="none" stroke="#3a3a3a" strokeWidth="1.2" />
        </g>
      </svg>
    );
  }

  return null;
}

export default function ProjectCard({
  project,
  isHovered,
  isAnyHovered,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  const uid = useId();
  const isTouch = useIsTouchDevice();
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchStart = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    onMouseEnter();
  };

  const handleTouchEnd = () => {
    touchTimerRef.current = setTimeout(() => onMouseLeave(), 600);
  };

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springCfg = isSafariBrowser()
    ? { damping: 28, stiffness: 120 }
    : { damping: 22, stiffness: 200 };

  const springRotX = useSpring(rotateX, springCfg);
  const springRotY = useSpring(rotateY, springCfg);
  const springGlareX = useSpring(glareX, springCfg);
  const springGlareY = useSpring(glareY, springCfg);

  const glareBg = useMotionTemplate`radial-gradient(circle at ${springGlareX}% ${springGlareY}%, rgba(255,255,255,0.07), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(cx * 20);
    rotateX.set(-cy * 20);
    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    onMouseLeave();
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <div style={{ perspective: "1000px" }}>
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      animate={{
        scale: isHovered ? 1.03 : 1,
        filter: !isHovered && isAnyHovered ? "blur(2px)" : "blur(0px)",
        opacity: !isHovered && isAnyHovered ? 0.5 : 1,
      }}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-surface rounded-lg overflow-hidden border border-border"
    >
      {/* Visual area */}
      <div className="aspect-video bg-gradient-to-br from-surface to-bg-alt relative flex items-center justify-center overflow-hidden">
        {/* SVG pattern background */}
        <div className="absolute inset-0 opacity-60">
          <ServicePattern title={project.title} uid={uid} />
        </div>

        {/* Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-t-lg"
          style={{
            background: glareBg,
            opacity: isHovered ? 1 : 0,
            willChange: "background",
            transform: "translateZ(0)",
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Tagline */}
        {project.tagline && project.taglineEffect && (
          <div className="relative z-10">
            <TaglineRenderer
              text={project.tagline}
              effect={project.taglineEffect}
              isHovered={isHovered}
              isTouch={isTouch}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs bg-bg px-2.5 py-1 rounded text-text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
    </div>
  );
}
