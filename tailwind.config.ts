import type { Config } from "tailwindcss";

const config: Config = {
  plugins: [require("daisyui")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      "2md": { max: "950px" },
      // => @media (max-width: 950px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["sans-serif"],
        almarai: ["var(--font-almarai)"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          P50: "#eaf9fa",
          P75: "#abe5ea",
          P100: "#88dae1",
          P200: "#54cbd5",
          P300: "#31c0cc",
          P400: "#22868f",
          P500: "#1e757c",
          P600: "#039BE5",
        },
        secondary: {
          S50: "#e7e8ee",
          S75: "#9ba0b9",
          S100: "#72789c",
          S200: "#353e72",
          S300: "#0c1755",
          S400: "#08103b",
          S500: "#070e34",
        },
        gray: {
          G10: "#f4f4f4",
          G15: "#F5F5F5",
          G20: "#E7E7E7",
          G30: "#5A5A5A",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
};

export default config;
