import { type ClassValue, clsx } from "clsx";
import { Inter, Sora, Almarai } from "next/font/google";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const almarai = Almarai({
  variable: "--font-almaria",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});
