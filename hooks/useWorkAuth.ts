import { UserContext } from "@/context/user-context";
import type { Work } from "@nulib/dcapi-types";
import { useContext } from "react";

const useWorkAuth = (work: Work | null | undefined) => {
  const userAuthContext = useContext(UserContext);
  const isUserLoggedIn = userAuthContext?.user?.isLoggedIn;
  const isWorkInstitution = work?.visibility === "Institution";
  const isWorkPrivate = work?.visibility === "Private";
  const isWorkPublic = work?.visibility === "Public";

  const publishedStatus = work?.published ? "Published" : "Unpublished";
  const userCanRead =
    userAuthContext?.user?.scopes.includes(`read:${work?.visibility}`) &&
    userAuthContext?.user?.scopes.includes(`read:${publishedStatus}`);

  const isWorkReadingRoomOnly =
    userAuthContext?.user?.isReadingRoom &&
    (isWorkPrivate ||
      (isWorkInstitution && !userAuthContext?.user?.isInstitution));

  return {
    isUserLoggedIn,
    isWorkInstitution,
    isWorkPrivate,
    isWorkPublic,
    isWorkReadingRoomOnly,
    userCanRead,
  };
};

export default useWorkAuth;
