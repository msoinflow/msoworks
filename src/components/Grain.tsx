"use client";

import { useEffect, useRef } from "react";

export default function Grain() {
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let animId: number;
    let frame = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      if (time - lastTime > 50) {
        lastTime = time;
        frame = (frame + 1) % 999;
        turbRef.current?.setAttribute("seed", String(frame));
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0.04,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <filter id="grain-filter">
          <feTurbulence
            ref={turbRef}
            type="turbulence"
            baseFrequency="0.65"
            numOctaves="3"
            seed="0"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
