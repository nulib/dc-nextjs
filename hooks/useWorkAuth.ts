import { UserContext } from "@/pages/_app";
import { WorkShape } from "@/types/components/works";
import { useContext } from "react";

const useWorkAuth = (work: WorkShape | null | undefined) => {
  const userAuthContext = useContext(UserContext);
  const isUserLoggedIn = userAuthContext?.user?.isLoggedIn;
  const isWorkInstitution = work?.visibility === "Institution";
  const isWorkPrivate = work?.visibility === "Private";
  const isWorkPublic = work?.visibility === "Public";

  const isWorkRestricted =
    isWorkPrivate || (!isUserLoggedIn && isWorkInstitution);

  return {
    isUserLoggedIn,
    isWorkInstitution,
    isWorkPrivate,
    isWorkPublic,
    isWorkRestricted,
  };
};

export default useWorkAuth;
