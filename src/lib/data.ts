export type TaglineEffect = "float" | "scale" | "colorize" | "typewriter";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  tagline?: string;
  taglineEffect?: TaglineEffect;
}

export const projects: Project[] = [
  {
    title: "Motion Design",
    description:
      "Engaging motion design videos that bring your brand or product to life — from concept to final render.",
    tags: ["Claude", "Remotion", "Figma"],
    tagline: "yes, things move here.",
    taglineEffect: "float",
  },
  {
    title: "E-commerce Visuals",
    description:
      "Your products deserve better than a white background. Listing visuals and website imagery that actually sell.",
    tags: ["AI-Image", "AI-Video", "Adobe"],
    tagline: "your product, but make it pretty.",
    taglineEffect: "scale",
  },
  {
    title: "Brand Identity",
    description:
      "Your brand is more than a logo — it's a feeling. I craft visual identities that make people remember you.",
    tags: ["Midjourney", "Illustrator", "Moodboard"],
    tagline: "more than a logo. promise.",
    taglineEffect: "colorize",
  },
  {
    title: "AI Workflows",
    description:
      "Let AI handle the boring parts — so you can focus on the interesting ones. Custom automations that actually save time.",
    tags: ["AI", "No-Code", "Automation"],
    tagline: "robots doing the boring stuff.",
    taglineEffect: "typewriter",
  },
];

export const socials = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mehmet-salih-%C3%B6zdin%C3%A7-02918a255" },
  { name: "Instagram", url: "https://www.instagram.com/msoworks.ai/" },
];

export const email = "msoworksai@gmail.com";
