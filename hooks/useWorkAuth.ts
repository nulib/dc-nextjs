import { UserContext } from "@/context/user-context";
import { type Work } from "@nulib/dcapi-types";
import { useContext } from "react";

const useWorkAuth = (work: Work | null | undefined) => {
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
