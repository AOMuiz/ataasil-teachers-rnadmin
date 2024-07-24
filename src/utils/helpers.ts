import { type ClassValue, clsx } from "clsx";
import { Inter, Sora, Almarai } from "next/font/google";
import { twMerge } from "tailwind-merge";

import {
  required,
  number,
  minValue,
  maxValue,
  minLength,
  maxLength,
  email,
} from "react-admin";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const almarai = Almarai({
  variable: "--font-almaria",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

export const Val = {
  req: [required()],
  reqNum: [required(), number()],
  reqNumRange: [required(), number(), minValue(0), maxValue(100)],
  reqMail: [required(), email()],
  reqMax: (max: any) => [required(), number(), maxValue(max)],
  reqMinLen: (min: any) => [required(), number(), minLength(min)],
  reqMaxLen: (max: any) => [required(), number(), maxLength(max)],
};
