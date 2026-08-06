import { UserContext } from "@/context/user-context";
import type { Work } from "@nulib/dcapi-types";
import { useContext } from "react";

const useWorkAuth = (work: Work | null | undefined) => {
  const userAuthContext = useContext(UserContext);
  const isAuthLoading = userAuthContext?.isLoading ?? true;
  const isUserLoggedIn = userAuthContext?.user?.isLoggedIn;
  const isWorkInstitution = work?.visibility === "Institution";
  const isWorkPrivate = work?.visibility === "Private";
  const isWorkPublic = work?.visibility === "Public";

  const publishedStatus = work?.published ? "Published" : "Unpublished";

  const hasScope = (scope: string) =>
    userAuthContext?.user?.scopes?.includes(scope) ?? false;

  // A public, published work is readable by anyone, regardless of whether
  // auth has resolved yet (or resolved to an anonymous/failed user). This
  // mirrors the search results' visibility short-circuit and avoids a race
  // between the work fetch and /auth/whoami that would otherwise flash
  // "Authentication needed" on public works.
  const isPubliclyReadable = isWorkPublic && work?.published === true;

  const userCanRead = work
    ? isPubliclyReadable ||
      (hasScope(`read:${work.visibility}`) &&
        hasScope(`read:${publishedStatus}`))
    : false;

  // Only assert "restricted" once auth has actually resolved, so a
  // non-public work doesn't briefly show the login banner before swapping
  // to the viewer for a user who turns out to have access.
  const loginRequired = Boolean(work) && !userCanRead && !isAuthLoading;

  const isWorkReadingRoomOnly =
    userAuthContext?.user?.isReadingRoom &&
    (isWorkPrivate ||
      (isWorkInstitution && !userAuthContext?.user?.isInstitution));

  return {
    isAuthLoading,
    isUserLoggedIn,
    isWorkInstitution,
    isWorkPrivate,
    isWorkPublic,
    isWorkReadingRoomOnly,
    loginRequired,
    userCanRead,
  };
};

export default useWorkAuth;
