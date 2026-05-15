import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Prefixes public/ asset paths with Vite's base URL so they work on GitHub Pages (/team-mas-bjj/).
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
