import styles from "@/components/Chat/Feedback/TextArea.module.css";
const ChatFeedbackTextArea = () => {
  return (
    <label className={styles.styledChatFeedbackTextArea}>
      <span>Add additional specific details (optional)</span>
      <textarea rows={5} draggable={false} />
    </label>
  );
};
export default ChatFeedbackTextArea;
