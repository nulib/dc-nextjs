import ChatFeedback from "../Feedback/Feedback";

const ResponseOptions = ({
  conversationIndex,
}: {
  conversationIndex: number;
}) => {
  return (
    <footer
      data-testid="response-options"
      data-conversation-options-index={conversationIndex}
    >
      <ChatFeedback conversationIndex={conversationIndex} />
    </footer>
  );
};

export default ResponseOptions;
