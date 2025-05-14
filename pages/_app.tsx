import { GoogleTagManager, sendGTMEvent } from "@next/third-parties/google";

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
import AuthDialog from "@/components/Shared/AuthDialog";
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
            }
          `}</style>
          {mounted && <Component {...pageProps} />}
          <AuthDialog />
          <GoogleTagManager gtmId="GTM-NDJXLQW" />
        </SearchProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
