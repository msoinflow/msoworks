"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import ProjectsGrid from "./ProjectsGrid";
import { projects, socials, email } from "@/lib/data";

type Section = "story" | "work" | "contact";

const menuLinks: { key: Section; label: string }[] = [
  { key: "story", label: "my story" },
  { key: "work", label: "what i do" },
  { key: "contact", label: "contact" },
];

const letterVariants = {
  hidden: { opacity: 0, y: -18 },
  visible: { opacity: 1, y: 0 },
};

function LetterStagger({ text, index }: { text: string; index: number }) {
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.25 + index * 0.1 + i * 0.03,
            duration: 0.3,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function MagneticMenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 25, stiffness: 200 });
  const springY = useSpring(y, { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(Math.max(-12, Math.min(12, (e.clientX - (rect.left + rect.width / 2)) * 0.2)));
    y.set(Math.max(-12, Math.min(12, (e.clientY - (rect.top + rect.height / 2)) * 0.2)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="text-4xl md:text-6xl font-bold text-text-secondary hover:text-accent-hover transition-colors duration-300"
    >
      {children}
    </motion.button>
  );
}

export default function Overlay({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<Section | null>(null);

  const handleBack = () => {
    if (activeSection) {
      setActiveSection(null);
    } else {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 bg-bg overflow-y-auto"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-24 h-16">
        <button
          onClick={handleBack}
          className="text-text-primary font-semibold text-lg tracking-tight hover:text-accent-hover transition-colors duration-200"
        >
          MSO
        </button>
        <button
          onClick={handleBack}
          className="text-text-secondary hover:text-accent-hover transition-colors duration-200 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Content area */}
      <AnimatePresence mode="wait">
        {activeSection === null ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] pb-20"
          >
            <div className="flex flex-col items-center gap-6 md:gap-8">
              {menuLinks.map((link, index) => (
                <MagneticMenuItem
                  key={link.key}
                  onClick={() => setActiveSection(link.key)}
                >
                  <LetterStagger text={link.label} index={index} />
                </MagneticMenuItem>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-8 md:py-20"
          >
            {activeSection === "story" && <StoryContent onNavigate={setActiveSection} />}
            {activeSection === "work" && <WorkContent onNavigate={setActiveSection} />}
            {activeSection === "contact" && <ContactContent />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent footer */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 py-4 text-xs text-text-tertiary pointer-events-none">
        <a
          href={socials.find((s) => s.name === "LinkedIn")?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent-hover transition-colors duration-200 pointer-events-auto"
        >
          LinkedIn
        </a>
        <span>·</span>
        <a
          href={socials.find((s) => s.name === "Instagram")?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent-hover transition-colors duration-200 pointer-events-auto"
        >
          Instagram
        </a>
        <span>·</span>
        <a
          href={`mailto:${email}`}
          className="hover:text-accent-hover transition-colors duration-200 pointer-events-auto"
        >
          {email}
        </a>
      </div>
    </motion.div>
  );
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}

function StoryContent({
  onNavigate,
}: {
  onNavigate: (s: Section | null) => void;
}) {
  const [quizState, setQuizState] = useState<"idle" | "hint" | "revealed">("idle");
  const isTouch = useIsTouchDevice();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14">
      <div className="space-y-5">
        <p className="text-text-secondary leading-relaxed">
          Here&apos;s something most people don&apos;t expect: I&apos;m a civil
          engineer. I know — not the typical origin story for someone building
          websites and digital products. But honestly, I was never the type to
          follow the typical path anyway.
        </p>
        <p className="text-text-secondary leading-relaxed">
          I always knew I wanted to create my own things, offer my own
          solutions. For years, that stayed as a thought in the back of my head.
          Then 2025 came along and I finally stopped thinking about it and
          started doing it. This website? It&apos;s one of those things.
        </p>
        <p className="text-text-secondary leading-relaxed">
          What I do is listen — to people, to brands, to ideas — and turn them
          into something real. I understand the problem, I find my own angle on
          it, and I build (yes, but not bridges this time). Whether that means
          code, design, or content doesn&apos;t really matter to me. The point
          is solving the right problem in the right way.
        </p>
        <p className="text-text-secondary leading-relaxed">
          We live in a time where AI can do almost anything. But there&apos;s a
          difference between done and done right — I care about the latter.
        </p>
      </div>

      {/* Interactive Quiz Widget */}
      <div className="flex items-center justify-center md:justify-start">
        <div
          className="w-full max-w-xs"
          onClick={() => {
            if (isTouch && quizState === "hint") setQuizState("revealed");
          }}
          onDoubleClick={() => {
            if (!isTouch && quizState === "hint") setQuizState("revealed");
          }}
        >
          <AnimatePresence mode="wait">
            {quizState === "idle" && (
              <motion.div
                key="quiz-idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <p className="text-sm text-text-tertiary">
                  do you think this was written by ai?
                </p>
                <div className="flex gap-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuizState("hint")}
                    className="px-6 py-2 text-sm text-text-secondary border border-border rounded hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
                  >
                    yes
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuizState("hint")}
                    className="px-6 py-2 text-sm text-text-secondary border border-border rounded hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
                  >
                    no
                  </motion.button>
                </div>
              </motion.div>
            )}

            {quizState === "hint" && (
              <motion.div
                key="quiz-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="select-none"
              >
                <p className="text-sm text-text-tertiary italic">
                  hmm, are you sure?
                  <br />
                  {isTouch ? "tap to find out." : "double-click to find out."}
                </p>
              </motion.div>
            )}

            {quizState === "revealed" && (
              <motion.div
                key="quiz-revealed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                <p className="text-sm text-text-tertiary">
                  curious, aren&apos;t you?
                  <br />
                  the answer is in
                </p>
                <button
                  onClick={() => onNavigate(null)}
                  className="text-sm text-accent hover:text-accent-hover transition-colors duration-200"
                >
                  → what i do
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function WorkContent({
  onNavigate,
}: {
  onNavigate: (s: Section | null) => void;
}) {
  return (
    <div>
      <ProjectsGrid projects={projects} />

      <div className="mt-12 flex flex-col items-center text-center opacity-40 hover:opacity-100 transition-opacity duration-300">
        <p className="text-sm text-text-tertiary mb-5">
          still looking for the answer?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => onNavigate("story")}
            className="px-5 py-2 text-sm text-text-secondary border border-border rounded hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
          >
            what answer?
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="px-5 py-2 text-sm text-text-secondary border border-border rounded hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
          >
            take me there →
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactContent() {
  const [riddleOpen, setRiddleOpen] = useState(false);

  return (
    <div>
      <div className="space-y-6">
        <p className="text-text-secondary leading-relaxed">
          Have a project in mind or just want to say hello? Feel free to reach
          out.
        </p>
        <a
          href={`mailto:${email}`}
          className="inline-block text-lg font-medium text-accent hover:text-accent-hover transition-colors duration-200 border-b border-accent/40 hover:border-accent-hover pb-1"
        >
          {email}
        </a>
        <div className="flex items-center gap-8 pt-2">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-sm font-medium text-text-secondary hover:text-accent-hover transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-accent after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {!riddleOpen ? (
            <motion.button
              key="riddle-trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setRiddleOpen(true)}
              className="opacity-40 hover:opacity-100 transition-all duration-300 text-sm text-text-tertiary hover:text-accent-hover"
            >
              stop here, traveler.
            </motion.button>
          ) : (
            <motion.p
              key="riddle-answer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-sm text-text-tertiary italic"
            >
              does it matter who held the pen, if the story is real?
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
