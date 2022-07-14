import { API_TOKEN_COOKIE, AUTH_DOMAIN } from "@/lib/constants/auth";
import { User, UserContextInterface } from "@/types/context/user";
import { deleteCookie, getCookie } from "cookies-next";
import type { AppProps } from "next/app";
import React from "react";
import { SearchProvider } from "@/context/search-context";
import Transition from "@/components/Transition";
import axios from "axios";
import globalStyles from "@/styles/global";


export const UserContext = React.createContext<UserContextInterface | null>(
  null
);

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    /**
     * Determine if user is authenticated via cookie
     */
    const token = getCookie(API_TOKEN_COOKIE);
    if (token) {
      axios.get("/api/auth/whoami").then((result) => {
        if (!result.data) return;

        const { displayName, mail } = result.data;
        setUser({
          displayName: displayName[0],
          mail,
        });
      });
    }
  }, []);

  const logout = () => {
    // Remove user from client context
    setUser(null);

    // Delete cookie - Maybe move to new /logout API route if we want to delete NUSSO cookie
    deleteCookie(API_TOKEN_COOKIE, { domain: AUTH_DOMAIN });
  };

  return (
    <UserContext.Provider value={{ logout, user }}>
      <Transition>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </Transition>
    </UserContext.Provider>
  );
}

export default MyApp;
