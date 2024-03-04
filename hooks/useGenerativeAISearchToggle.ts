import React, { useEffect, useState } from "react";

import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import { UserContext } from "@/context/user-context";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

const defaultModalState = {
  isOpen: false,
  title: "Use Generative AI",
};

const aiQueryParam = "ai";

export default function useGenerativeAISearchToggle() {
  const router = useRouter();
  const effectQueryDep = router.query[aiQueryParam];

  const { searchState, searchDispatch } = useSearchState();
  const { user } = React.useContext(UserContext);

  const [dialog, setDialog] = useState(defaultModalState);
  const [isChecked, setIsChecked] = useState<boolean>(
    searchState.isGenerativeAI
  );

  const loginUrl = `${DCAPI_ENDPOINT}/auth/login?goto=${goToLocation()}`;

  // TODO: This needs to accept more than one query param when
  // directing to NU SSO.  We need the additional query param
  // to know that user came wanting to use Generative AI
  function goToLocation() {
    const currentUrl = `${window.location.origin}${router.asPath}`;
    const url = new URL(currentUrl);
    url.searchParams.set(aiQueryParam, "true");
    return url.toString();
  }

  function closeDialog() {
    setDialog({ ...dialog, isOpen: false });
  }

  function handleCheckChange(checked: boolean) {
    if (!user?.isLoggedIn) {
      setDialog({ ...dialog, isOpen: checked });
    }

    if (user?.isLoggedIn) {
      searchDispatch({
        isGenerativeAI: checked,
        type: "updateGenerativeAI",
      });
    }
  }

  function handleLogin() {
    router.push(loginUrl);
  }

  useEffect(() => {
    setIsChecked(searchState.isGenerativeAI);
  }, [searchState.isGenerativeAI]);

  useEffect(() => {
    if (effectQueryDep && user?.isLoggedIn) {
      searchDispatch({
        isGenerativeAI: true,
        type: "updateGenerativeAI",
      });
    }
  }, [effectQueryDep, searchDispatch, user?.isLoggedIn]);

  return {
    closeDialog,
    dialog,
    handleCheckChange,
    handleLogin,
    isChecked,
  };
}
