import { UserContext } from "@/context/user-context";
import { UserContext as UserContextType } from "@/types/context/user";
import type { Work } from "@nulib/dcapi-types";
import React from "react";
import { renderHook } from "@testing-library/react";
import useWorkAuth from "./useWorkAuth";

const publicWork = {
  id: "public-work",
  published: true,
  visibility: "Public",
} as Work;

const unpublishedPublicWork = {
  id: "unpublished-public-work",
  published: false,
  visibility: "Public",
} as Work;

const institutionWork = {
  id: "institution-work",
  published: true,
  visibility: "Institution",
} as Work;

const anonymousUser: UserContextType["user"] = {
  isInstitution: false,
  isLoggedIn: false,
  isReadingRoom: false,
  scopes: ["read:Public", "read:Published"],
};

const netIdUser: UserContextType["user"] = {
  isInstitution: false,
  isLoggedIn: true,
  isReadingRoom: false,
  scopes: ["read:Public", "read:Published", "read:Institution"],
};

const withUserProvider = (
  work: Work | null | undefined,
  userContext: Partial<UserContextType>,
) => {
  const value: UserContextType = {
    user: null,
    isLoading: true,
    isSignInModalOpen: false,
    openSignInModal: jest.fn(),
    closeSignInModal: jest.fn(),
    ...userContext,
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );

  return renderHook(() => useWorkAuth(work), { wrapper });
};

describe("useWorkAuth", () => {
  it("treats a public, published work as readable while auth is still loading", () => {
    const { result } = withUserProvider(publicWork, {
      isLoading: true,
      user: null,
    });

    expect(result.current.userCanRead).toBe(true);
    expect(result.current.loginRequired).toBe(false);
  });

  it("treats a public, published work as readable when auth resolves without a user (failed whoami)", () => {
    const { result } = withUserProvider(publicWork, {
      isLoading: false,
      user: null,
    });

    expect(result.current.userCanRead).toBe(true);
    expect(result.current.loginRequired).toBe(false);
  });

  it("treats a public, published work as readable for a resolved anonymous user", () => {
    const { result } = withUserProvider(publicWork, {
      isLoading: false,
      user: anonymousUser,
    });

    expect(result.current.userCanRead).toBe(true);
    expect(result.current.loginRequired).toBe(false);
  });

  it("still restricts a public but unpublished work for an anonymous user", () => {
    const { result } = withUserProvider(unpublishedPublicWork, {
      isLoading: false,
      user: anonymousUser,
    });

    expect(result.current.userCanRead).toBe(false);
    expect(result.current.loginRequired).toBe(true);
  });

  it("renders neither viewer nor banner for a non-public work while auth is loading", () => {
    const { result } = withUserProvider(institutionWork, {
      isLoading: true,
      user: null,
    });

    expect(result.current.userCanRead).toBe(false);
    expect(result.current.loginRequired).toBe(false);
  });

  it("requires login for a non-public work once auth resolves without matching scope", () => {
    const { result } = withUserProvider(institutionWork, {
      isLoading: false,
      user: anonymousUser,
    });

    expect(result.current.userCanRead).toBe(false);
    expect(result.current.loginRequired).toBe(true);
  });

  it("allows a non-public work once auth resolves with a matching scope", () => {
    const { result } = withUserProvider(institutionWork, {
      isLoading: false,
      user: netIdUser,
    });

    expect(result.current.userCanRead).toBe(true);
    expect(result.current.loginRequired).toBe(false);
  });

  it("does not throw when the resolved user is missing a scopes array", () => {
    const { result } = withUserProvider(publicWork, {
      isLoading: false,
      // @ts-expect-error - simulating a malformed whoami payload
      user: { isInstitution: false, isLoggedIn: false, isReadingRoom: false },
    });

    expect(result.current.userCanRead).toBe(true);
    expect(result.current.loginRequired).toBe(false);
  });
});
