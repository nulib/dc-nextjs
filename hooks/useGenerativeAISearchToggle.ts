import React, { useEffect, useState } from "react";

import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import { UserContext } from "@/context/user-context";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";

export const defaultAIState = {
  enabled: "false",
  expires: undefined,
};

export const defaultModalState = {
  isOpen: false,
  title: "Use Generative AI",
};

export default function useGenerativeAISearchToggle() {
  const router = useRouter();

  const [ai, setAI] = useLocalStorage("ai", defaultAIState);
  const { user } = React.useContext(UserContext);

  const [dialog, setDialog] = useState(defaultModalState);

  const expires = Date.now() + 1000 * 60 * 60;
  const isAIPreference = ai.enabled === "true";
  const isChecked = isAIPreference && user?.isLoggedIn;

  const loginUrl = `${DCAPI_ENDPOINT}/auth/login?goto=${goToLocation()}`;

  // If "ai" is saved in localStorage and the user is
  // not logged in on initial load, show the alert dialog
  useEffect(() => {
    if (!user) return;
    if (isAIPreference) {
      setDialog((prevDialog) => ({ ...prevDialog, isOpen: !user?.isLoggedIn }));
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

  function goToLocation() {
    const currentUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${router.asPath}`
        : "";
    if (!currentUrl) return;

    const url = new URL(currentUrl);
    url.searchParams.set("ai", "true");
    return encodeURIComponent(url.href);
  }

  function closeDialog() {
    setDialog({ ...dialog, isOpen: false });
  }

  function handleCheckChange(checked: boolean) {
    if (!user?.isLoggedIn) {
      setDialog({ ...dialog, isOpen: checked });
    } else {
      setAI({
        enabled: checked ? "true" : "false",
        expires: checked ? expires : undefined,
      });
    }
  }

  function handleLogin() {
    router.push(loginUrl);
  }

  return {
    closeDialog,
    dialog,
    handleCheckChange,
    handleLogin,
    isChecked,
  };
}
