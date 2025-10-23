import { Head, Html, Main, NextScript } from "next/document";

import NorthwesternFonts from "@/components/Fonts";

export default function Document() {
  return (
    <Html>
      <Head>
        <NorthwesternFonts />
        <script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/9c3338e8c0f82fb5466c9727/script.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener("cookieyes_banner_load",()=>{let e=document.querySelector(".cky-consent-container");e&&e.setAttribute("data-nosnippet","true")});`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
