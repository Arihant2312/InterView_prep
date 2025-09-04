import { interviewCovers } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ SimpleIcons CDN
const simpleIconBaseURL = "https://cdn.simpleicons.org";

// Normalize tech name for SimpleIcons
const normalizeTechName = (tech: string) => {
  return tech.toLowerCase().replace(/\.js$/, "dotjs").replace(/\s+/g, "");
};

// Check if icon exists at URL
const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

// ✅ Main function: generate logos with fallback
export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${simpleIconBaseURL}/${normalized}`, // e.g. https://cdn.simpleicons.org/flutter
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg", // fallback if not found
    }))
  );

  return results;
};

// Random interview cover
export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};
