import React, { useState } from "react";

import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import { UserContext } from "@/context/user-context";
import { useRouter } from "next/router";

const defaultModalState = {
  isOpen: false,
  title: "Use Generative AI",
};

const aiQueryParam = "ai";

export default function useGenerativeAISearchToggle() {
  const router = useRouter();
  const isChecked = router.query[aiQueryParam] === "true";

  const { user } = React.useContext(UserContext);

  const [dialog, setDialog] = useState(defaultModalState);

  const loginUrl = `${DCAPI_ENDPOINT}/auth/login?goto=${goToLocation()}`;

  function goToLocation() {
    const currentUrl = `${window.location.origin}${router.asPath}`;
    const url = new URL(currentUrl);

    url.searchParams.set(aiQueryParam, "true");
    const encodedUri = encodeURIComponent(url.href);
    return encodedUri;
  }

  function closeDialog() {
    setDialog({ ...dialog, isOpen: false });
  }

  function handleCheckChange(checked: boolean) {
    if (!user?.isLoggedIn) {
      setDialog({ ...dialog, isOpen: checked });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [aiQueryParam]: _, ...query } = router.query;

      if (checked) {
        query[aiQueryParam] = checked.toString();
      }

      router.push({
        pathname: router.pathname,
        query,
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
