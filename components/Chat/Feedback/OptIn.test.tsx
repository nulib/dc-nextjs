import { render, screen } from "@testing-library/react";

import ChatFeedbackOptIn from "@/components/Chat/Feedback/OptIn";
import React from "react";
import { UserContext } from "@/context/user-context";

const mockUserContextValue = {
  user: {
    email: "foo@bar.com",
    isLoggedIn: true,
    isReadingRoom: false,
    name: "foo",
    sub: "123",
  },
};

describe("ChatFeedbackOptIn", () => {
  it("renders a checkbox input with the user email value", () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <ChatFeedbackOptIn />
      </UserContext.Provider>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("value", "foo@bar.com");
    expect(checkbox).toBeInTheDocument();
  });

  it("renders a label", () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <ChatFeedbackOptIn />
      </UserContext.Provider>
    );
    const label = screen.getByText(/please follow up with me/i);
    expect(label).toBeInTheDocument();
  });
});
