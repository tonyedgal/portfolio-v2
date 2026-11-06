import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// custom theme sizes must be declared, or text-xxs reads as a colour and a later text colour drops it
const twMerge = extendTailwindMerge({
  extend: { theme: { text: ["xxs"] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
