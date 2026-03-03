"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/data";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ transform: "translateZ(0)" }}>
      {projects.map((project, i) => (
        <ProjectCard
          key={project.title}
          project={project}
          isHovered={hoveredIndex === i}
          isAnyHovered={hoveredIndex !== null}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}
