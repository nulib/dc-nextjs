import type { AppProps } from "next/app";
import { SearchProvider } from "@/context/search-context";
import Transition from "@/components/Transition";
import globalStyles from "@/styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <Transition>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </Transition>
  );
}

export default MyApp;
