import { act, render, screen } from "@/test-utils";

import ChatResponse from "./Response";
import exp from "constants";
import { sampleWork1 } from "@/mocks/sample-work1";
import { sampleWork2 } from "@/mocks/sample-work2";
import useChatSocket from "@/hooks/useChatSocket";
import { useState } from "react";
import { work1 } from "@/mocks/work-page/work1";
import { workManifest1 } from "@/mocks/work-page/work-manifest1";

const mockSendMessage = jest.fn();

const useChatSocketDefaults = {
  authToken: "1234",
  isConnected: true,
  sendMessage: mockSendMessage,
};

const tokens = [
  "Streamed token content",
  " and streaming continues and continues",
  " until streaming is completed.",
];

// Mock the default export
jest.mock("@/hooks/useChatSocket", () => ({
  __esModule: true,
  default: jest.fn(() => {
    return {
      ...useChatSocketDefaults,
    };
  }),
}));

describe("ChatResponse component", () => {
  const question = "Do you have photos of Joan Baez in your collection?";
  const conversationRef = "1234";

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("renders default state", () => {
    render(
      <ChatResponse question={question} conversationRef={conversationRef} />,
    );

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article.dataset["question"]).toBe(question);
    expect(article.dataset["ref"]).toBe(conversationRef);

    const header = article.querySelector("header");
    expect(header).toHaveTextContent(question);

    const content = screen.getByTestId("response-content");
    expect(content).toBeInTheDocument();

    const loading = screen.getByRole("status");
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveAttribute("aria-label", "loading");
  });

  it("renders response content with multiple tokens messages", async () => {
    // Simulate a dynamic hook using React state
    let setMessageState: React.Dispatch<any>;

    (useChatSocket as jest.Mock).mockImplementation(() => {
      const [message, setMessage] = useState();
      setMessageState = setMessage; // Expose the setter to the test
      return {
        ...useChatSocketDefaults,
        message, // hook returns the current message state
      };
    });

    render(
      <ChatResponse question={question} conversationRef={conversationRef} />,
    );

    const content = screen.getByTestId("response-content");
    expect(content).toBeInTheDocument();

    const tokens = [
      "Streamed token content",
      " and streaming continues and continues",
      " until streaming is completed.",
    ];

    // Update the message state with tokens to simulate streaming
    tokens.forEach((token, index) => {
      act(() => {
        setMessageState({
          type: "token",
          message: token,
          ref: conversationRef,
        });
      });

      expect(content).toHaveTextContent(tokens.slice(0, index + 1).join(""));
      expect(content.querySelector("div")).toHaveAttribute(
        "data-message-type",
        "token",
      );
      expect(screen.queryByRole("status")).toBeInTheDocument();
    });

    act(() => {
      setMessageState({
        type: "answer",
        message: tokens.join(""),
        ref: conversationRef,
      });
    });
  });

  it("renders response answer content and then completes", async () => {
    // Simulate a dynamic hook using React state
    let setMessageState: React.Dispatch<any>;

    (useChatSocket as jest.Mock).mockImplementation(() => {
      const [message, setMessage] = useState();
      setMessageState = setMessage; // Expose the setter to the test
      return {
        ...useChatSocketDefaults,
        message, // hook returns the current message state
      };
    });

    render(
      <ChatResponse question={question} conversationRef={conversationRef} />,
    );

    const content = screen.getByTestId("response-content");
    expect(content).toBeInTheDocument();

    act(() => {
      setMessageState({
        type: "answer",
        message: tokens.join(""),
        ref: conversationRef,
      });
    });

    // content displays the answer message
    expect(content).toHaveTextContent(tokens.join(""));
    expect(content.querySelector("div")).toHaveAttribute(
      "data-message-type",
      "answer",
    );

    // communicates streaming is completed
    act(() => {
      setMessageState({
        type: "final_message",
        ref: conversationRef,
      });
    });

    // options are displayed and loading status is removed
    const options = screen.getByTestId("response-options");
    expect(options).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders an interstitial message", async () => {
    // Simulate a dynamic hook using React state
    let setMessageState: React.Dispatch<any>;

    (useChatSocket as jest.Mock).mockImplementation(() => {
      const [message, setMessage] = useState();
      setMessageState = setMessage; // Expose the setter to the test
      return {
        ...useChatSocketDefaults,
        message, // hook returns the current message state
      };
    });

    render(
      <ChatResponse question={question} conversationRef={conversationRef} />,
    );

    const content = screen.getByTestId("response-content");
    expect(content).toBeInTheDocument();

    const tools = ["aggregate", "discover_fields", "search"];

    const query = "Joan Baez";

    tools.forEach((tool) => {
      act(() => {
        setMessageState({
          type: "tool_start",
          message: {
            tool,
            input: tool === "search" ? { query } : undefined,
          },
          ref: conversationRef,
        });
      });

      if (tool === "aggregate") {
        expect(content).toHaveTextContent("Aggregating");
      }

      if (tool === "discover_fields") {
        expect(content).toHaveTextContent("Discovering");
      }

      if (tool === "search") {
        expect(content).toHaveTextContent(`Searching for ${query}`);
        expect(content.querySelector("strong")).toHaveTextContent(query);

        const action = content.querySelector("button");
        expect(action).toHaveTextContent("View results");
      }
    });
  });

  it("renders a search result message", async () => {
    // Simulate a dynamic hook using React state
    let setMessageState: React.Dispatch<any>;

    (useChatSocket as jest.Mock).mockImplementation(() => {
      const [message, setMessage] = useState();
      setMessageState = setMessage; // Expose the setter to the test
      return {
        ...useChatSocketDefaults,
        message, // hook returns the current message state
      };
    });

    render(
      <ChatResponse question={question} conversationRef={conversationRef} />,
    );

    const content = screen.getByTestId("response-content");
    expect(content).toBeInTheDocument();

    const works = [sampleWork1, sampleWork2];

    act(() => {
      setMessageState({
        type: "search_result",
        message: works,
        ref: conversationRef,
      });
    });

    // content displays the search result message
    const results = screen.getAllByRole("link");
    expect(results).toHaveLength(2);

    results.forEach((result, index) => {
      expect(result.querySelector("figcaption")).toHaveTextContent(
        String(works[index].title),
      );
      expect(result.querySelector("img")).toHaveAttribute("src");
      expect(result.querySelector("img")).toHaveAttribute("alt");
      expect(result).toHaveAttribute("href", `/items/${works[index].id}`);
    });
  });

  it("renders an aggregation result message", async () => {
    // Simulate a dynamic hook using React state
    let setMessageState: React.Dispatch<any>;

    (useChatSocket as jest.Mock).mockImplementation(() => {
      const [message, setMessage] = useState();
      setMessageState = setMessage; // Expose the setter to the test
      return {
        ...useChatSocketDefaults,
        message, // hook returns the current message state
      };
    });

    render(
      // @ts-ignore
      <ChatResponse question={question} conversationRef={conversationRef} />,
    );

    const content = screen.getByTestId("response-content");
    expect(content).toBeInTheDocument();

    // const works = [sampleWork1, sampleWork2];

    act(() => {
      setMessageState({
        type: "aggregation_result",
        message: {
          buckets: [
            { key: "Berkeley, California", doc_count: 5 },
            { key: "Joan Baez", doc_count: 17 },
          ],
        },
        ref: conversationRef,
      });
    });

    // content displays the aggregation result message

    const results = screen.getByRole("table");
    expect(results).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(2);

    rows.forEach((row, index) => {
      expect(row.querySelector("td")).toHaveTextContent(
        ["Berkeley, California", "Joan Baez"][index],
      );
      expect(row.querySelector("td:last-child")).toHaveTextContent(
        ["5", "17"][index],
      );
    });
  });
});
