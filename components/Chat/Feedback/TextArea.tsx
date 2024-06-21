import { styled } from "@/stitches.config";

const ChatFeedbackTextArea = () => {
  return (
    <StyledChatFeedbackTextArea>
      <span>Add additional specific details (optional)</span>
      <textarea rows={5} draggable={false} />
    </StyledChatFeedbackTextArea>
  );
};

const StyledChatFeedbackTextArea = styled("label", {
  display: "flex",
  flexDirection: "column",
  margin: "$gr3 0",

  span: {
    fontSize: "$gr2",
    marginBottom: "$gr1",
  },

  textarea: {
    resize: "none",
  },
});

export default ChatFeedbackTextArea;
