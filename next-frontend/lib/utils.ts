import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: unknown, decimals = 2) {
  const num = Number(value);
  if (isNaN(num)) return '$0.00';
  return `$${num.toFixed(decimals)}`;
}
