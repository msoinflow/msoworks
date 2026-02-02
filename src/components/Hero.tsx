"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center"
      >
        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary"
        >
          Mehmet Salih Ozdinc
        </motion.h1>
        <motion.button
          variants={item}
          onClick={onExplore}
          className="mt-6 text-sm md:text-base text-text-tertiary hover:text-accent-hover transition-colors duration-300 cursor-pointer"
        >
          just a human who likes to{" "}
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
            className="italic text-accent"
          >
            imagine
          </motion.span>{" "}
          and work
        </motion.button>
      </motion.div>
    </section>
  );
}
