import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format "tanggal bulan" (Contoh: "04 April")
export const tanggalBulan = (dateObj: Date) =>
  dateObj.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
  });

// Format Jam (Contoh: "23:10")
export const jam = (dateObj: Date) =>
  dateObj.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
