import { render, screen } from "@/test-utils";

import Chat from "@/components/Chat/Chat";
import { SearchProvider } from "@/context/search-context";
import mockRouter from "next-router-mock";

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

jest.mock("@/hooks/useChatSocket", () => {
  return function useChatSocket() {
    return {
      authToken: "fake-token",
      isConnected: false,
      message: { answer: "fake-answer" },
      sendMessage: mockSendMessage,
    };
  };
});

describe("Chat component", () => {
  it("renders default ai response placeholder text", () => {
    mockRouter.setCurrentUrl("/search?ai=true");
    render(<Chat />);

    const wrapper = screen.getByText(
      "What can I help you find? Try searching for",
      {
        exact: false,
      }
    );
    expect(wrapper).toBeInTheDocument();
  });

  it("renders the chat response component when search term is present", () => {
    mockRouter.setCurrentUrl("/search?q=tell+me+about+boats&ai=true");

    render(
      <SearchProvider>
        <Chat />
      </SearchProvider>
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
});
