import { render, screen } from "@/test-utils";

import ChatConversation from "./Conversation";

describe("Conversaton component", () => {
  const handleConversationCallback = jest.fn();

  it("renders a chat conversation", () => {
    render(
      <ChatConversation conversationCallback={handleConversationCallback} />,
    );

    const wrapper = screen.getByTestId("chat-conversation");
    expect(wrapper).toBeInTheDocument();
  });
});
