import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ChatFeedback from "./Feedback";
import { SearchProvider } from "@/context/search-context";
import { handleChatFeedbackRequest } from "@/lib/chat-helpers";
import type { SearchContextStore } from "@/types/context/search-context";

jest.mock("@/lib/chat-helpers", () => ({
  handleChatFeedbackRequest: jest.fn().mockResolvedValue({
    message: "Feedback received. Thank you.",
  }),
}));

const mockHandleChatFeedbackRequest = jest.mocked(handleChatFeedbackRequest);

describe("ChatFeedback", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("includes the API-required works property when submitting a turn", async () => {
    const initialState = {
      conversation: {
        ref: "conversation-ref",
        initialQuestion: "Show me photographs of Chicago",
        turns: [
          {
            question: "Show me photographs of Chicago",
            answer: "Here are some photographs.",
            aggregations: [],
          },
        ],
      },
      panel: {
        open: false,
      },
    } as unknown as SearchContextStore;

    render(
      <SearchProvider initialState={initialState}>
        <ChatFeedback conversationIndex={0} />
      </SearchProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "No the answer was not helpful",
      }),
    );

    await waitFor(() => {
      expect(mockHandleChatFeedbackRequest).toHaveBeenCalledTimes(1);
    });

    expect(mockHandleChatFeedbackRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        sentiment: "negative",
        context: expect.objectContaining({
          turns: [
            expect.objectContaining({
              aggregations: [],
              works: [],
            }),
          ],
        }),
      }),
    );
  });
});
