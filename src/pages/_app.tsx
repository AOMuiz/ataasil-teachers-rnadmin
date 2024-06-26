import "@/styles/globals.css";
import { Almarai } from "next/font/google";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
  variable: "--font-almarai",
});

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const lang = locale === "ar" ? "ar" : "en";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${almarai.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
