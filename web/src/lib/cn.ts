import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type ClassProps = {
  class?: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
