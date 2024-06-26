import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { almarai } from "@/utils/helpers";

export default function App({ Component, pageProps }: AppProps) {
  // const { locale } = useRouter();
  // const dir = locale === "ar" ? "rtl" : "ltr";
  // const lang = locale === "ar" ? "ar" : "en";

  // useEffect(() => {
  //   document.documentElement.dir = dir;
  //   document.documentElement.lang = lang;
  // }, [dir, lang]);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${almarai.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Ataasil Teachers</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
