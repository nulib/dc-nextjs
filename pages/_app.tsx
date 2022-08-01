import type { AppProps } from "next/app";
import { SearchProvider } from "@/context/search-context";
import globalStyles from "@/styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
}

export default MyApp;
