import { GoogleTagManager, sendGTMEvent } from "@next/third-parties/google";
import {
  akkurat,
  akkuratBold,
  akkuratLight,
  campton,
  camptonBold,
  camptonExtraBold,
  camptonExtraLight,
} from "@/styles/fonts";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ObjectLiteral } from "@/types";
import React from "react";
import { SearchProvider } from "@/context/search-context";
import { User } from "@/types/context/user";
import { UserProvider } from "@/context/user-context";
import { defaultAIState } from "@/hooks/useGenerativeAISearchToggle";
import { defaultOpenGraphData } from "@/lib/open-graph";
import { getUser } from "@/lib/user-helpers";
import globalStyles from "@/styles/global";
import setupHoneyBadger from "@/lib/honeybadger/config";
import useLocalStorage from "@/hooks/useLocalStorage";

// Init Honeybadger
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

  const [ai, setAI] = useLocalStorage("ai", defaultAIState);
  const isUsingAI = ai?.enabled === "true";

  React.useEffect(() => {
    async function getData() {
      const userResponse = await getUser();
      setUser(userResponse);
      setMounted(true);
    }
    getData();

    // Check if AI is enabled and if it has expired
    if (ai?.expires && ai.expires < Date.now()) setAI(defaultAIState);
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined" && mounted) {
      const payload = {
        ...pageProps.dataLayer,
        isLoggedIn: user?.isLoggedIn,
        isUsingAI: isUsingAI && user?.isLoggedIn,
        userPrimaryAffiliation: user?.primaryAffiliation,
      };

      // "VirtualPageView" is a custom event that we use to track page views.
      // Also pass in updated page data to dataLayer object which GTM will use to track events.
      sendGTMEvent({
        event: "VirtualPageView",
        ...payload,
      });
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
        <SearchProvider>
          <style jsx global>{`
            :root {
              --font-akkurat-light: ${akkuratLight.style.fontFamily};
              --font-akkurat: ${akkurat.style.fontFamily};
              --font-akkurat-bold: ${akkuratBold.style.fontFamily};
              --font-campton: ${campton.style.fontFamily};
              --font-campton-bold: ${camptonBold.style.fontFamily};
              --font-campton-extra-bold: ${camptonExtraBold.style.fontFamily};
              --font-campton-extra-light: ${camptonExtraLight.style.fontFamily};
            }
          `}</style>
          {mounted && <Component {...pageProps} />}
          <GoogleTagManager gtmId="GTM-NDJXLQW" />
        </SearchProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
