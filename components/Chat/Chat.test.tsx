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
          end: "stop",
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
  message: { answer: "fake-answer-1", end: "stop" },
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

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const el = screen.getByTestId("mock-chat-response");
    expect(el).toBeInTheDocument();

    const dataProps = el.getAttribute("data-props");
    const dataPropsObj = JSON.parse(dataProps!);
    expect(dataPropsObj.question).toEqual("tell me about boats");
    expect(dataPropsObj.isStreamingComplete).toEqual(false);
    expect(dataPropsObj.message).toEqual({
      answer: "fake-answer-1",
      end: "stop",
    });
    expect(typeof dataPropsObj.conversationRef).toBe("string");
    expect(uuidRegex.test(dataPropsObj.conversationRef)).toBe(true);
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

  xit("displays an error message when the response hits the LLM token limit", () => {
    (useChatSocket as jest.Mock).mockImplementation(() => ({
      authToken: "fake",
      isConnected: true,
      message: {
        end: {
          reason: "length",
          ref: "fake",
        },
      },
      sendMessage: mockSendMessage,
    }));

    mockRouter.setCurrentUrl("/search?q=boats");

    render(
      <SearchProvider>
        <Chat />
      </SearchProvider>,
    );

    const error = screen.getByText("The response has hit the LLM token limit.");
    expect(error).toBeInTheDocument();
  });

  xit("displays an error message when the response times out", () => {
    (useChatSocket as jest.Mock).mockImplementation(() => ({
      authToken: "fake",
      isConnected: true,
      message: {
        end: {
          reason: "timeout",
          ref: "fake",
        },
      },
      sendMessage: mockSendMessage,
    }));

    mockRouter.setCurrentUrl("/search?q=boats");

    render(
      <SearchProvider>
        <Chat />
      </SearchProvider>,
    );

    const error = screen.getByText("The response has timed out.");
    expect(error).toBeInTheDocument();
  });
});
