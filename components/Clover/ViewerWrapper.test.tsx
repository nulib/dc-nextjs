import { render, screen, waitFor } from "@/test-utils";

import { UserContext } from "@/context/user-context";
import WorkViewerWrapper from "@/components/Clover/ViewerWrapper";

const userContextValue = {
  user: {
    email: "joan.doe@northwestern.edu",
    isLoggedIn: true,
    isReadingRoom: false,
    name: "Joan Doe",
    sub: "jdoe2399",
    isInstitution: true,
    scopes: ["read:Public", "read:Institution", "read:Published", "chat"],
    primaryAffiliation: "staff",
    provider: "nusso",
  },
  isLoading: false,
  isSignInModalOpen: false,
  openSignInModal: jest.fn(),
  closeSignInModal: jest.fn(),
};
const readingRoomMessage =
  /You have access to this Work because you are in the reading room/i;

describe("WorkViewerWrapper", () => {
  it("renders a wrapping element for Clover", async () => {
    render(<WorkViewerWrapper iiifContent="http://testing.com" />);
    await waitFor(() => {
      const el = screen.getByTestId("work-viewer-wrapper");
      expect(el).toBeInTheDocument();
    });
  });

  it("renders an announcement when in the Reading Room only when the Work is protected", async () => {
    const readingUserContext = { ...userContextValue };
    readingUserContext.user.isReadingRoom = true;

    render(
      <UserContext.Provider value={readingUserContext}>
        <WorkViewerWrapper
          isWorkReadingRoomOnly={true}
          iiifContent="http://testing.com"
        />
      </UserContext.Provider>,
    );

    expect(await screen.findByText(readingRoomMessage)).toBeInTheDocument();
  });

  it("does not render an announcement when in the Reading Room and the Work is not restricted", async () => {
    const readingUserContext = { ...userContextValue };
    readingUserContext.user.isReadingRoom = true;

    render(
      <UserContext.Provider value={readingUserContext}>
        <WorkViewerWrapper
          isWorkReadingRoomOnly={false}
          iiifContent="http://testing.com"
        />
      </UserContext.Provider>,
    );

    let el;
    await waitFor(() => {
      el = screen.queryByText(readingRoomMessage);
    });
    expect(el).toBeNull();
  });
});
