import { render, screen } from "@/test-utils";

import Chat from "@/components/Chat/Chat";
import { SearchProvider } from "@/context/search-context";
import mockRouter from "next-router-mock";
import useChatSocket from "@/hooks/useChatSocket";

const mockSendMessage = jest.fn();

jest.mock("@/context/search-context", () => {
  const actual = jest.requireActual("@/context/search-context");

  return {
    __esModule: true,
    ...actual,
    useSearchState: () => ({
      searchDispatch: jest.fn(),
      searchState: {
        activeTab: "stream",
        aggregations: {},
        chat: {
          answer: "",
          documents: [],
          question: "",
        },
        searchFixed: false,
      },
    }),
  };
});

jest.mock("@/components/Chat/Response/Response", () => {
  return function MockChatResponse(props: any) {
    return (
      <div data-testid="mock-chat-response" data-props={JSON.stringify(props)}>
        Mock Chat Response
      </div>
    );
  };
});

// Mock the useChatSocket hook and provide a default mock
// implementation which can be overridden in individual tests
jest.mock("@/hooks/useChatSocket");
(useChatSocket as jest.Mock).mockImplementation(() => ({
  authToken: "fake-token-1",
  isConnected: false,
  message: { answer: "fake-answer-1" },
  sendMessage: mockSendMessage,
}));

describe("Chat component", () => {
  it("renders default placeholder text when no search term is present", () => {
    render(<Chat />);

    const wrapper = screen.getByText(
      "What can I help you find? Try searching for",
      {
        exact: false,
      },
    );
    expect(wrapper).toBeInTheDocument();
  });

  it("renders the chat response component when search term is present", () => {
    mockRouter.setCurrentUrl("/search?q=tell+me+about+boats");

    render(
      <SearchProvider>
        <Chat />
      </SearchProvider>,
    );

    const el = screen.getByTestId("mock-chat-response");
    expect(el).toBeInTheDocument();

    const dataProps = el.getAttribute("data-props");
    expect(JSON.parse(dataProps!)).toEqual({
      isStreamingComplete: false,
      searchTerm: "tell me about boats",
      sourceDocuments: [],
      streamedAnswer: "",
    });
  });

  it("sends a websocket message when the search term changes", () => {
    const mockMessage = jest.fn();

    (useChatSocket as jest.Mock).mockImplementation(() => ({
      authToken: "fake-token",
      isConnected: true,
      message: { answer: "fake-answer-1" },
      sendMessage: mockMessage,
    }));

    mockRouter.setCurrentUrl("/search?q=boats");

    render(
      <SearchProvider>
        <Chat />
      </SearchProvider>,
    );

    expect(mockMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        auth: "fake-token",
        message: "chat",
        question: "boats",
      }),
    );
  });

  it("doesn't send a websocket message if the search term is empty", () => {
    mockRouter.setCurrentUrl("/search");
    render(
      <SearchProvider>
        <Chat />
      </SearchProvider>,
    );

    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});
