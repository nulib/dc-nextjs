import React, { useEffect } from "react";
import { UserContext } from "@/context/user-context";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";

export const defaultAIState = {
  enabled: "false",
  expires: undefined,
};

export default function useGenerativeAISearchToggle() {
  const router = useRouter();

  const [ai, setAI] = useLocalStorage("ai", defaultAIState);
  const { user, openSignInModal } = React.useContext(UserContext);

  const expires = Date.now() + 1000 * 60 * 60;
  const isAIPreference = ai.enabled === "true";
  const isChecked = isAIPreference && user?.isLoggedIn;

  // If "ai" is saved in localStorage and the user is
  // not logged in on initial load, show the alert dialog
  useEffect(() => {
    if (!user) return;
    if (isAIPreference && !user.isLoggedIn) {
      openSignInModal();
    }
  }, [isAIPreference, user]);

  useEffect(() => {
    if (router.isReady) {
      const { query } = router;
      if (query.ai === "true") {
        setAI({ enabled: "true", expires });
      }
    }
  }, [router.asPath]);

  function handleCheckChange(checked: boolean) {
    if (!user?.isLoggedIn) {
      openSignInModal();
    } else {
      setAI({
        enabled: checked ? "true" : "false",
        expires: checked ? expires : undefined,
      });
    }
  }

  return {
    handleCheckChange,
    isChecked,
  };
}
