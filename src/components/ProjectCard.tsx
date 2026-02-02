"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Project, TaglineEffect } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  isAnyHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const brandColors = ["#a78bba", "#7eb8c9", "#e0c097", "#c4d4a0", "#d4a0a0", "#9bb0d4", "#ffffff"];

function TaglineRenderer({
  text,
  effect,
  isHovered,
}: {
  text: string;
  effect: TaglineEffect;
  isHovered: boolean;
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
        isHovered ? "opacity-80 text-text-secondary" : "opacity-20 text-text-tertiary"
      }`}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            animate={
              isHovered
                ? {
                    y: [0, -8, 0, 6, 0],
                    rotate: [0, -3, 0, 3, 0],
                  }
                : { y: 0, rotate: 0 }
            }
            transition={
              isHovered
                ? {
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.04,
                    ease: "easeInOut" as const,
                  }
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
                  "0 0 0px rgba(192,192,192,0)",
                  "0 0 4px rgba(192,192,192,0.2)",
                  "0 0 10px rgba(192,192,192,0.4)",
                  "0 0 16px rgba(192,192,192,0.5)",
                  "0 0 10px rgba(192,192,192,0.4)",
                  "0 0 4px rgba(192,192,192,0.2)",
                  "0 0 10px rgba(192,192,192,0.4)",
                  "0 0 16px rgba(192,192,192,0.5)",
                  "0 0 10px rgba(192,192,192,0.4)",
                  "0 0 4px rgba(192,192,192,0.2)",
                  "0 0 0px rgba(192,192,192,0)",
                ],
              }
            : { opacity: 1, scale: 1, textShadow: "0 0 0px rgba(192,192,192,0)" }
        }
        transition={
          isHovered
            ? { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
            : { duration: 0.3 }
        }
        className={`${baseClass} inline-block transition-colors duration-300 ${
          isHovered ? "text-accent-hover" : "opacity-20 text-text-tertiary"
        }`}
      >
        {text}
      </motion.span>
    );
  }

  if (effect === "colorize") {
    return (
      <span
        className={`${baseClass} transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-20"
        }`}
      >
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="transition-colors duration-500"
            style={{
              color: isHovered
                ? brandColors[i % brandColors.length]
                : "#6a6a6a",
            }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  }

  if (effect === "typewriter") {
    return (
      <span
        className={`${baseClass} font-mono transition-opacity duration-300 ${
          isHovered ? "opacity-70 text-text-secondary" : "opacity-20 text-text-tertiary"
        }`}
      >
        {isHovered ? typedText : text}
        {isHovered && typedText.length < text.length && (
          <span className="animate-pulse">|</span>
        )}
      </span>
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
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        scale: isHovered ? 1.03 : 1,
        filter: !isHovered && isAnyHovered ? "blur(2px)" : "blur(0px)",
        opacity: !isHovered && isAnyHovered ? 0.5 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-surface rounded-lg overflow-hidden border border-border"
    >
      {/* Visual area with hover tagline */}
      <div className="aspect-video bg-gradient-to-br from-surface to-bg-alt relative flex items-center justify-center">
        {project.tagline && project.taglineEffect && (
          <TaglineRenderer
            text={project.tagline}
            effect={project.taglineEffect}
            isHovered={isHovered}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-primary">
          {project.title}
        </h3>
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
  );
}
