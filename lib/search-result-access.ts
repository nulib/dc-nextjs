import type { UserContext } from "@/types/context/user";

/** Match the access indicator shown on a search result card. */
export const isSearchResultRestricted = (
  visibility: string | null | undefined,
  { user, isLoading }: Pick<UserContext, "user" | "isLoading">,
): boolean => {
  if (visibility === "Public") return false;
  if (isLoading) return true;
  return !(user?.scopes?.includes(`read:${visibility}`) ?? false);
};
