
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SegmentStyles } from "@/types/resume";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safe style retriever that ensures we don't get undefined errors
export function getStyleValue(styles: SegmentStyles | undefined, property: keyof SegmentStyles, defaultValue: string): string {
  if (!styles || !styles[property]) {
    return defaultValue;
  }
  return styles[property] as string;
}

// Safely apply text alignment from custom styles
export function getTextAlign(styles: SegmentStyles | undefined, defaultAlign: 'left' | 'center' | 'right' = 'left'): 'left' | 'center' | 'right' {
  if (!styles || !styles.textAlign) {
    return defaultAlign;
  }
  
  const alignment = styles.textAlign as string;
  if (alignment === 'left' || alignment === 'center' || alignment === 'right') {
    return alignment;
  }
  
  return defaultAlign;
}
