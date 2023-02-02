import React, { ReactNode, createContext, useState } from "react";
import { type User, type UserContext } from "@/types/context/user";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import axios from "axios";

const UserContext = createContext<UserContext>({ user: null });

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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

  //  165.124.167.1

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
