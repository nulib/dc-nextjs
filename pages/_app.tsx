import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SearchProvider } from "@/context/search-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
}

export default MyApp;
