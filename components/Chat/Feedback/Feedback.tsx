import { Button } from "@nulib/design-system";
import ChatFeedbackOptIn from "@/components/Chat/Feedback/OptIn";
import ChatFeedbackOption from "@/components/Chat/Feedback/Option";
import ChatFeedbackTextArea from "@/components/Chat/Feedback/TextArea";
import Container from "@/components/Shared/Container";
import { styled } from "@/stitches.config";
import { useState } from "react";

const ChatFeedback = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit() {
    console.log("submit feedback");
    setIsSubmitted(true);
  }

  return (
    <StyledChatFeedback isSubmitted={isSubmitted}>
      <Container>
        <StyledChatFeedbackActivate>
          <Button isLowercase isText onClick={() => setIsExpanded(true)}>
            <span>
              Uncertain about this response? Let us know why <strong>➜</strong>
            </span>
          </Button>
        </StyledChatFeedbackActivate>
        {isSubmitted ? (
          <StyledChatFeedbackConfirmation>
            Solid. Thanks for submitting!
          </StyledChatFeedbackConfirmation>
        ) : (
          <StyledChatFeedbackForm isExpanded={isExpanded}>
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

  button: {
    fontSize: "$gr3",
  },

  strong: {
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
    fontSize: "$gr3",
  },
});

const StyledChatFeedbackConfirmation = styled("div", {
  fontSize: "$gr3",
});

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

export default ChatFeedback;
