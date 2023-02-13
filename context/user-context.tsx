import React, { ReactNode, createContext, useState } from "react";
import { type User, type UserContext } from "@/types/context/user";
import { getUser } from "@/lib/user-helpers";

const UserContext = createContext<UserContext>({ user: null });

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    /* Determine if user is authenticated via cookie */
    getUser().then((result) => {
      if (!result) return;
      const {
        email,
        isLoggedIn = false,
        isReadingRoom = false,
        name,
        sub,
      } = result;
      setUser({
        email,
        isLoggedIn,
        isReadingRoom,
        name,
        sub,
      });
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
