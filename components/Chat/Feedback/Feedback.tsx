import { IconThumbsDown, IconThumbsUp } from "@/components/Shared/SVG/Icons";
import { SyntheticEvent, useContext, useRef, useState } from "react";

import Announcement from "@/components/Shared/Announcement";
import { Button } from "@nulib/design-system";
import ChatFeedbackOptIn from "@/components/Chat/Feedback/OptIn";
import ChatFeedbackOption from "@/components/Chat/Feedback/Option";
import ChatFeedbackTextArea from "@/components/Chat/Feedback/TextArea";
import Container from "@/components/Shared/Container";
import Icon from "@/components/Shared/Icon";
import { UserContext } from "@/context/user-context";
import { handleChatFeedbackRequest } from "@/lib/chat-helpers";
import { styled } from "@/stitches.config";
import { useSearchState } from "@/context/search-context";

type ChatFeedbackSentiment = "positive" | "negative" | "";

type ChatFeedbackFormPayload = {
  sentiment: ChatFeedbackSentiment;
  feedback: {
    options: string[];
    text: string;
    email: string;
  };
  context: {
    ref: string;
    question: string;
    answer: string;
    source_documents: string[];
  };
};

const defaultSubmittedState = {
  completed: false,
  sentiment: "",
};

const ChatFeedback = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(defaultSubmittedState);

  const [isError, setIsError] = useState(false);

  const {
    searchState: {
      conversation: { body, ref },
    },
  } = useSearchState();

  const { user } = useContext(UserContext);
  const userEmail = user?.email || "";

  const initialPayload: ChatFeedbackFormPayload = {
    sentiment: "",
    feedback: {
      options: [],
      text: "",
      email: "",
    },
    context: {
      ref: String(ref),
      question: body[0]?.question || "",
      answer: body[0]?.answer || "",
      source_documents: [],
    },
  };

  async function handleSubmit() {
    const formData = formRef.current?.elements || [];
    const payload = { ...initialPayload };

    // Handle sentiment
    if (isSubmitted.sentiment) {
      payload.sentiment = isSubmitted.sentiment as ChatFeedbackSentiment;
    }

    for (let i of formData) {
      if (i instanceof HTMLInputElement) {
        // Handle checkbox values
        if (i.name === "email") {
          payload.feedback.email = userEmail;
        } else {
          if (i.checked) {
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/labels
            const labels = Array.from(i?.labels!);
            const label = labels.map((l) => l.textContent).join("");

            payload.feedback.options.push(label);
          }
        }
      }

      // Handle textarea element
      if (i instanceof HTMLTextAreaElement) {
        payload.feedback.text = i.value || "";
      }
    }

    setIsSubmitted({ ...isSubmitted, completed: true });

    const response = await handleChatFeedbackRequest(payload);
    response.err && handleError();
  }

  const handleSentimentSubmission = async (
    e: SyntheticEvent<HTMLButtonElement>,
  ) => {
    const sentiment = e.currentTarget.value;
    if (!sentiment) return;

    if (sentiment === "negative") setIsExpanded(true);

    setIsSubmitted({
      ...isSubmitted,
      completed: sentiment === "positive",
      sentiment,
    });

    const payload = {
      ...initialPayload,
      sentiment,
    };

    const response = await handleChatFeedbackRequest(payload);
    response.err && handleError();
  };

  function handleError() {
    setIsError(true);
    setIsSubmitted(defaultSubmittedState);
    setIsExpanded(false);
  }

  return (
    <StyledChatFeedback isSubmitted={isSubmitted.completed}>
      <Container>
        <StyledChatFeedbackActivate>
          <span>Was this answer helpful?</span>

          <StyledSentimentButton
            value="positive"
            onClick={handleSentimentSubmission}
            disabled={isExpanded}
            aria-label="Yes the answer was helpful"
            title="Yes"
            data-sentiment="positive"
            data-is-selected={isSubmitted.sentiment === "positive"}
          >
            <Icon>
              <IconThumbsUp />
            </Icon>
          </StyledSentimentButton>
          <StyledSentimentButton
            value="negative"
            onClick={handleSentimentSubmission}
            disabled={isExpanded}
            aria-label="No the answer was not helpful"
            title="No"
            data-sentiment="negative"
            data-is-selected={isSubmitted.sentiment === "negative"}
          >
            <Icon>
              <IconThumbsDown />
            </Icon>
          </StyledSentimentButton>
        </StyledChatFeedbackActivate>

        {isError && (
          <Announcement>
            There was an error submitting the feedback form
          </Announcement>
        )}

        {isSubmitted.completed ? (
          <StyledChatFeedbackConfirmation>
            Thank you for your submission.
          </StyledChatFeedbackConfirmation>
        ) : (
          <StyledChatFeedbackForm isExpanded={isExpanded} ref={formRef}>
            <ChatFeedbackOption
              name="style"
              label="Don't like the response style"
            />
            <ChatFeedbackOption
              name="factually"
              label="Not factually correct"
            />
            <ChatFeedbackOption
              name="instructions"
              label="Didn't fully follow instruction"
            />
            <ChatFeedbackOption
              name="refused"
              label="Refused when it shouldn't have"
            />
            <ChatFeedbackOption name="lazy" label="Being lazy" />
            <ChatFeedbackOption name="unsafe" label="Unsafe or problematic" />
            <ChatFeedbackOption name="other" label="Other" />
            <ChatFeedbackTextArea />
            <ChatFeedbackOptIn />
            <Button isLowercase isPrimary onClick={handleSubmit}>
              Submit
            </Button>
          </StyledChatFeedbackForm>
        )}
      </Container>
    </StyledChatFeedback>
  );
};

/* eslint-disable sort-keys */
const StyledChatFeedbackActivate = styled("div", {
  margin: "0 0 $gr2 ",
  display: "flex",
  alignItems: "center",
  borderTop: "1px solid $gray6",
  padding: "$gr3 0",

  "> span": {
    marginRight: "$gr2",
  },
});

const StyledChatFeedbackConfirmation = styled("div", {});

const StyledChatFeedbackForm = styled("form", {
  margin: "$gr3 0",
  transition: "200ms all ease-in-out",
  width: "61.8%",

  variants: {
    isExpanded: {
      true: {
        opacity: "1",
        height: "auto",
      },
      false: {
        opacity: "0",
        height: "0",
      },
    },
  },
});

const StyledChatFeedback = styled("div", {
  fontSize: "$gr2",
  color: "$black50",

  variants: {
    isSubmitted: {
      true: {
        [`& ${StyledChatFeedbackActivate}`]: {
          display: "none",
        },
      },
      false: {},
    },
  },
});

const StyledSentimentButton = styled("button", {
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  height: "40px",
  width: "40px",
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "50%",

  "> span": {
    height: "32px",
    width: "32px",
    fill: "$black20",
  },

  "&:not([disabled])": {
    cursor: "pointer",
  },

  "&[data-is-selected=true] > span": {
    fill: "$purple",
  },
});

export default ChatFeedback;
