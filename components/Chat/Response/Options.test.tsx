import { SearchProvider, useSearchState } from "@/context/search-context";
import { render, screen } from "@testing-library/react";

import ResponseOptions from "@/components/Chat/Response/Options";

const mockConversation = {
  body: [
    {
      question: "Do you have photos of Joan Baez in your collection?",
      answer: "",
    },
  ],
  ref: "1234",
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

    //
    expect(conversation.body[conversationIndex].question).toBe(
      "Do you have photos of Joan Baez in your collection?",
    );
  });
});
