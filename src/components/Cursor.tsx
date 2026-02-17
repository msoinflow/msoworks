"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 280, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 280, mass: 0.5 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(isTouch);
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsPointer(!!(t.closest("button") || t.closest("a") || t.closest("[role='button']")));
    };

    document.documentElement.addEventListener("mouseleave", () => setIsVisible(false));
    document.documentElement.addEventListener("mouseenter", () => setIsVisible(true));
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner dot — exact position */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "none",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#e07a5f",
        }}
        animate={{ scale: isPointer ? 0 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      />

      {/* Outer ring — spring lag */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "none",
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid #e07a5f",
        }}
        animate={{
          scale: isPointer ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isPointer ? "rgba(224, 122, 95, 0.1)" : "transparent",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
