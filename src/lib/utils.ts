import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Prefixes local public/ paths with Vite's base URL. Full URLs (http/https) pass through unchanged.
export const asset = (path: string) =>
  path.startsWith('http') ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
