import { render, screen } from "@/test-utils";
import React from "react";
import TranscriptionResults from "@/components/Search/TranscriptionResults";
import { FileSetSearchResult, Pagination } from "@/types/api/response";
import { UserContext } from "@/context/user-context";
import { UserContext as UserContextType } from "@/types/context/user";

jest.mock("@/lib/constants/endpoints", () => ({
  DCAPI_ENDPOINT: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2",
}));

const defaultUserContext: UserContextType = {
  user: {
    isInstitution: false,
    isLoggedIn: false,
    isReadingRoom: false,
    scopes: ["read:Public", "read:Published"],
  },
  isLoading: false,
  isSignInModalOpen: false,
  openSignInModal: jest.fn(),
  closeSignInModal: jest.fn(),
};

const pagination: Pagination = {
  query_url:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search/file-sets?searchToken=N4IgRg9gJgniBcoDOBLAXgUwQFgAwBoQB9JCAVwC&page=1",
  current_page: 1,
  limit: 10,
  offset: 0,
  total_hits: 1,
  total_pages: 1,
  collapsed_by: {
    field: "work_id",
    total_hits: 1,
  },
};

const publicResult: FileSetSearchResult = {
  id: "file-set-public",
  label: "Page 1",
  work_id: "work-public",
  work_title: "Public Work",
  collection: { id: "collection-1", title: "Collection" },
  rank: 1,
  annotations: [
    {
      id: "annotation-1",
      type: "transcription",
      content: "This transcript contains a public match.",
      language: ["eng"],
      model: "Transcription",
    },
  ],
  representative_image_url:
    "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/file-set-public",
  accession_number: "abc",
  visibility: "Public",
};

const withUserProvider = (
  Component: React.ReactNode,
  userContext: UserContextType = defaultUserContext,
) => {
  return (
    <UserContext.Provider value={userContext}>{Component}</UserContext.Provider>
  );
};

const renderTranscriptionResults = (
  results: FileSetSearchResult[],
  userContext: UserContextType = defaultUserContext,
) => {
  return render(
    withUserProvider(
      <TranscriptionResults
        results={results}
        pagination={pagination}
        searchTerm="match"
        onPageChange={jest.fn()}
      />,
      userContext,
    ),
  );
};

describe("TranscriptionResults component", () => {
  it("does not render locks for public file sets when auth finishes without a user", () => {
    renderTranscriptionResults([publicResult], {
      ...defaultUserContext,
      user: null,
    });

    expect(screen.queryByTitle("Restricted Item")).not.toBeInTheDocument();
  });

  it("renders locks for non-public file sets while auth is loading", () => {
    renderTranscriptionResults(
      [
        {
          ...publicResult,
          id: "file-set-institution",
          visibility: "Institution",
        },
      ],
      {
        ...defaultUserContext,
        isLoading: true,
        user: null,
      },
    );

    expect(screen.getAllByTitle("Restricted Item")).toHaveLength(2);
  });

  it("does not render locks for non-public file sets when the user has the matching scope", () => {
    renderTranscriptionResults(
      [
        {
          ...publicResult,
          id: "file-set-institution",
          visibility: "Institution",
        },
      ],
      {
        ...defaultUserContext,
        user: {
          ...defaultUserContext.user!,
          scopes: ["read:Public", "read:Published", "read:Institution"],
        },
      },
    );

    expect(screen.queryByTitle("Restricted Item")).not.toBeInTheDocument();
  });
});
