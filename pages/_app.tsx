import type { AppProps } from "next/app";
import Head from "next/head";
import { ObjectLiteral } from "@/types";
import React from "react";
import Script from "next/script";
import { SearchProvider } from "@/context/search-context";
import Transition from "@/components/Transition";
import { User } from "@/types/context/user";
import { UserProvider } from "@/context/user-context";
import { defaultOpenGraphData } from "@/lib/open-graph";
import { getUser } from "@/lib/user-helpers";
import globalStyles from "@/styles/global";
import setupHoneyBadger from "@/lib/honeybadger/config";

setupHoneyBadger();

interface MyAppProps extends AppProps {
  pageProps: ObjectLiteral;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  globalStyles();

  const { openGraphData = {} } = pageProps;
  const ogData = { ...defaultOpenGraphData, ...openGraphData };
  const [mounted, setMounted] = React.useState(false);
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    async function getData() {
      const userResponse = await getUser();
      setUser(userResponse);
      setMounted(true);
    }
    getData();
  }, []);

  {
    /** Add GTM (Google Tag Manager) data */
  }
  React.useEffect(() => {
    if (typeof window !== "undefined" && mounted) {
      const payload = {
        event: "VirtualPageView",
        // @ts-ignore
        ...pageProps.dataLayer,
        isLoggedIn: user?.isLoggedIn,
      };
      // @ts-ignore
      window.dataLayer?.push(payload);
    }
  }, [mounted, pageProps, user]);

  return (
    <>
      <Head>
        {/* Add Open Graph <meta></meta> tags here */}
        {Object.keys(ogData).map((key) => (
          // @ts-ignore
          <meta property={key} content={ogData[key]} key={key} />
        ))}
      </Head>

      <UserProvider>
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
      </UserProvider>
    </>
  );
}

export default MyApp;
