"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import Overlay from "@/components/Overlay";

export default function Home() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <Hero onExplore={() => setOverlayOpen(true)} />
      <AnimatePresence>
        {overlayOpen && <Overlay onClose={() => setOverlayOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
