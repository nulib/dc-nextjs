import styles from "@/components/Chat/Feedback/Feedback.module.css";
import { IconThumbsDown, IconThumbsUp } from "@/components/Shared/SVG/Icons";
import { SyntheticEvent, useContext, useRef, useState } from "react";
import Announcement from "@/components/Shared/Announcement";
import { Button } from "@/components/Shared/Button/Button";
import ChatFeedbackOptIn from "@/components/Chat/Feedback/OptIn";
import ChatFeedbackOption from "@/components/Chat/Feedback/Option";
import ChatFeedbackTextArea from "@/components/Chat/Feedback/TextArea";
import Container from "@/components/Shared/Container";
import Icon from "@/components/Shared/Icon";
import { UserContext } from "@/context/user-context";
import { handleChatFeedbackRequest } from "@/lib/chat-helpers";
import { useSearchState } from "@/context/search-context";
import type { SearchContextStore } from "@/types/context/search-context";
type ChatFeedbackSentiment = "positive" | "negative" | "";
type OmitRenderedContent<T> = Omit<T, "renderedContent">;
type TurnWithoutRenderedContent = OmitRenderedContent<
  SearchContextStore["conversation"]["turns"][0]
>;
type ConversationWithoutRenderedContent = Omit<
  SearchContextStore["conversation"],
  "turns"
> & {
  turns: TurnWithoutRenderedContent[];
};
/**
 * @remarks
 *
 * Conforms to the schema defined in [dc-api](https://github.com/nulib/dc-api-v2/blob/main/node/src/handlers/post-chat-feedback.js)
 */
type ChatFeedbackFormPayload = {
  sentiment: ChatFeedbackSentiment;
  feedback: {
    options: string[];
    text: string;
    email: string;
  };
  timestamp: string;
  ref: SearchContextStore["conversation"]["ref"];
  refIndex: number;
  context: ConversationWithoutRenderedContent;
};
const defaultSubmittedState = {
  completed: false,
  sentiment: "",
};
const ChatFeedback = ({ conversationIndex }: { conversationIndex: number }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(defaultSubmittedState);
  const [isError, setIsError] = useState(false);
  const {
    searchState: { conversation },
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
    timestamp: new Date().toISOString(),
    ref: conversation.ref,
    refIndex: conversationIndex,
    context: {
      ref: conversation.ref,
      initialQuestion: conversation.initialQuestion,
      turns: conversation.turns.map((t) => {
        const { renderedContent, works = [], ...rest } = t;
        return { ...rest, works };
      }),
    },
  };
  async function handleSubmit() {
    if (!initialPayload.ref) {
      handleError();
      return;
    }
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
    if (!initialPayload.ref) {
      handleError();
      return;
    }
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
    <div
      data-is-submitted={isSubmitted.completed}
      className={styles.styledChatFeedback}
    >
      <Container>
        <div className={styles.styledChatFeedbackActivate}>
          <span>Was this answer helpful?</span>

          <button
            value="positive"
            onClick={handleSentimentSubmission}
            disabled={isExpanded}
            aria-label="Yes the answer was helpful"
            title="Yes"
            data-sentiment="positive"
            data-is-selected={isSubmitted.sentiment === "positive"}
            className={styles.styledSentimentButton}
          >
            <Icon>
              <IconThumbsUp />
            </Icon>
          </button>
          <button
            value="negative"
            onClick={handleSentimentSubmission}
            disabled={isExpanded}
            aria-label="No the answer was not helpful"
            title="No"
            data-sentiment="negative"
            data-is-selected={isSubmitted.sentiment === "negative"}
            className={styles.styledSentimentButton}
          >
            <Icon>
              <IconThumbsDown />
            </Icon>
          </button>
        </div>

        {isError && (
          <Announcement>
            There was an error submitting the feedback form
          </Announcement>
        )}

        {isSubmitted.completed ? (
          <div className={styles.styledChatFeedbackConfirmation}>
            Thank you for your submission.
          </div>
        ) : (
          <form
            data-is-expanded={isExpanded}
            ref={formRef}
            className={styles.styledChatFeedbackForm}
          >
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
            <Button textCase="normal" variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        )}
      </Container>
    </div>
  );
};
export default ChatFeedback;
