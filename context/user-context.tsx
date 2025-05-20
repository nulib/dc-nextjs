import React, { ReactNode, createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  type User,
  type UserContext as UserContextType,
} from "@/types/context/user";
import { getUser } from "@/lib/user-helpers";

const UserContext = createContext<UserContextType>({
  user: null,
  isSignInModalOpen: false,
  openSignInModal: () => {},
  closeSignInModal: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    /* Determine if user is authenticated via cookie */
    getUser().then((result) => {
      if (!result) return;
      const {
        email,
        isInstitution = false,
        isLoggedIn = false,
        isReadingRoom = false,
        name,
        primaryAffiliation,
        provider,
        scopes,
        sub,
      } = result;
      setUser({
        email,
        isInstitution,
        isLoggedIn,
        isReadingRoom,
        name,
        primaryAffiliation,
        provider,
        scopes,
        sub,
      });
    });
  }, []);

  useEffect(() => {
    const { login_modal } = router.query;
    if (login_modal === "true") {
      setIsSignInModalOpen(true);
    }
  }, [router.query]);

  const openSignInModal = () => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, login_modal: "true" },
      },
      undefined,
      { shallow: true },
    );

    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    const query = { ...router.query };
    delete query.login_modal;
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true },
    );

    setIsSignInModalOpen(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isSignInModalOpen,
        openSignInModal,
        closeSignInModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
