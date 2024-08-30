import React, { ReactNode, createContext, useState } from "react";
import {
  type User,
  type UserContext as UserContextType,
} from "@/types/context/user";
import { getUser } from "@/lib/user-helpers";

const UserContext = createContext<UserContextType>({ user: null });

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
        primaryAffiliation,
        sub,
      } = result;
      setUser({
        email,
        isLoggedIn,
        isReadingRoom,
        name,
        primaryAffiliation,
        sub,
      });
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
