import { SearchProvider, useSearchState } from "@/context/search-context";
import { render, screen } from "@testing-library/react";
import type { SearchContextStore } from "@/types/context/search-context";

import ResponseOptions from "@/components/Chat/Response/Options";

const mockConversation: SearchContextStore["conversation"] = {
  ref: "1234",
  initialQuestion: "Do you have photos of Joan Baez in your collection?",
  turns: [
    {
      question: "Do you have photos of Joan Baez in your collection?",
      answer: "",
      aggregations: [],
      works: [],
    },
  ],
};

const mockSearchDispatch = jest.fn();
jest.mock("@/context/search-context", () => {
  const actual = jest.requireActual("@/context/search-context");

  return {
    __esModule: true,
    ...actual,
    useSearchState: () => ({
      searchDispatch: mockSearchDispatch,
      searchState: {
        conversation: mockConversation,
        panel: {
          open: false,
        },
      },
    }),
  };
});

describe("ResponseOptions", () => {
  test("renders response options", () => {
    const conversationIndex = 0;

    render(
      <SearchProvider>
        <ResponseOptions conversationIndex={conversationIndex} />
      </SearchProvider>,
    );

    const responseOptions = screen.getByTestId("response-options");
    expect(responseOptions).toBeInTheDocument();

    const {
      searchState: { conversation },
    } = useSearchState();

    expect(conversation.turns[conversationIndex].question).toBe(
      "Do you have photos of Joan Baez in your collection?",
    );
  });
});
