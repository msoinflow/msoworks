"use client";

export default function Grain() {
  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, left: 0,
      zIndex: 9999, pointerEvents: "none", opacity: 0.04,
      overflow: "hidden",
      transform: "translateZ(0)",
    }}>
      <svg xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "-5%", left: "-5%",
          width: "110%", height: "110%",
          animation: "grain 0.5s steps(1) infinite",
          willChange: "transform",
        }}
      >
        <filter id="grain-filter">
          <feTurbulence type="turbulence" baseFrequency="0.65"
            numOctaves="3" seed="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
