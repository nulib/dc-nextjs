import { User, UserContextInterface } from "@/types/context/user";
import type { AppProps } from "next/app";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Head from "next/head";
import { ObjectLiteral } from "@/types";
import React from "react";
import Script from "next/script";
import { SearchProvider } from "@/context/search-context";
import Transition from "@/components/Transition";
import axios from "axios";
import { defaultOpenGraphData } from "@/lib/open-graph";
import globalStyles from "@/styles/global";
import setupHoneyBadger from "@/lib/honeybadger/config";

export const UserContext = React.createContext<UserContextInterface | null>(
  null
);

setupHoneyBadger();

interface MyAppProps extends AppProps {
  pageProps: ObjectLiteral;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  globalStyles();

  const { openGraphData = {} } = pageProps;
  const ogData = { ...defaultOpenGraphData, ...openGraphData };

  const [user, setUser] = React.useState<User | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    /* Determine if user is authenticated via cookie */
    axios
      .get(`${DCAPI_ENDPOINT}/auth/whoami`, {
        withCredentials: true,
      })
      .then((result) => {
        if (!result.data) return;
        const {
          email,
          isLoggedIn = false,
          isReadingRoom = false,
          name,
          sub,
        } = result.data;
        setUser({
          email,
          isLoggedIn,
          isReadingRoom,
          name,
          sub,
        });
      });
  }, []);

  {
    /** Add GTM (Google Tag Manager) data */
  }
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.dataLayer?.push({
        event: "VirtualPageView",
        // @ts-ignore
        ...pageProps.dataLayer,
      });
    }
  }, [pageProps]);

  return (
    <>
      <Head>
        {/* Add Open Graph <meta></meta> tags here */}
        {Object.keys(ogData).map((key) => (
          // @ts-ignore
          <meta property={key} content={ogData[key]} key={key} />
        ))}
      </Head>

      <UserContext.Provider value={{ user }}>
        <Transition>
          <SearchProvider>
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NDJXLQW');
      `}
            </Script>
            {mounted && <Component {...pageProps} />}
          </SearchProvider>
        </Transition>
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
