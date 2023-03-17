import { render, screen, waitFor } from "@/test-utils";
import { UserContext } from "@/context/user-context";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";

const userContextValue = {
  user: {
    email: "joan.doe@northwestern.edu",
    isLoggedIn: true,
    isReadingRoom: false,
    name: "Joan Doe",
    sub: "jdoe2399",
  },
};
const readingRoomMessage =
  /You have access to Work because you are in the reading room/i;

describe("WorkViewerWrapper", () => {
  it("renders a wrapping element for Clover", async () => {
    render(<WorkViewerWrapper manifestId="http://testing.com" />);
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
        <WorkViewerWrapper isWorkRestricted={true} manifestId="http://testing.com" />
      </UserContext.Provider>
    );

    expect(
      await screen.findByText(readingRoomMessage)
    ).toBeInTheDocument();

  });

  it("does not render an announcement when in the Reading Room and the Work is not restricted", async () => {
    const readingUserContext = { ...userContextValue };
    readingUserContext.user.isReadingRoom = true;

    render(
      <UserContext.Provider value={readingUserContext}>
        <WorkViewerWrapper isWorkRestricted={false} manifestId="http://testing.com" />
      </UserContext.Provider>
    );

    let el;
    await waitFor(() => {
       el = screen.queryByText(readingRoomMessage);
    })
    expect(el).toBeNull();
  });
});
