import { render, screen } from "@/test-utils";

import ChatConversation from "./Conversation";

describe("Conversation component", () => {
  const handleConversationCallback = jest.fn();

  it("renders a default view", async () => {
    render(
      <ChatConversation
        conversationCallback={handleConversationCallback}
        isStreaming={false}
      />,
    );

    const wrapper = screen.getByTestId("chat-conversation");
    expect(wrapper).toBeInTheDocument();

    const textarea = wrapper.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("placeholder", "Ask a followup question");

    const button = wrapper.querySelector("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Reply");
    expect(button).not.toBeDisabled();

    const form = wrapper.querySelector("form");
    expect(form?.dataset.isFocused).toBe("false");

    // send event to focus the textarea
    textarea?.focus();

    // Wait for the DOM to update
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(form).toBeInTheDocument();
    expect(form?.dataset.isFocused).toBe("true");
  });

  it("renders in streaming state", () => {
    render(
      <ChatConversation
        conversationCallback={handleConversationCallback}
        isStreaming={true}
      />,
    );

    const wrapper = screen.getByTestId("chat-conversation");
    expect(wrapper).toBeInTheDocument();

    const button = wrapper.querySelector("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Responding");
    expect(button).toBeDisabled();
  });

  it("submits textarea", () => {
    render(
      <ChatConversation
        conversationCallback={handleConversationCallback}
        isStreaming={false}
      />,
    );

    const wrapper = screen.getByTestId("chat-conversation");
    expect(wrapper).toBeInTheDocument();

    const textarea = wrapper.querySelector("textarea");
    expect(textarea).toBeInTheDocument();

    // focus and enter a value
    textarea?.focus();
  });
});
