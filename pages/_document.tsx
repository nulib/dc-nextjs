import { Head, Html, Main, NextScript } from "next/document";

import NorthwesternFonts from "@/components/Fonts";

export default function Document() {
  return (
    <Html>
      <Head>
        <NorthwesternFonts />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
