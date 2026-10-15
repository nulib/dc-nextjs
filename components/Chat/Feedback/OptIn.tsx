import styles from "@/components/Chat/Feedback/OptIn.module.css";
import { UserContext } from "@/context/user-context";
import { useContext } from "react";
const ChatFeedbackOptIn = () => {
  const { user } = useContext(UserContext);
  return (
    <label className={styles.styledChatFeedbackOptIn}>
      <input name="email" type="checkbox" value={user?.email} /> Please follow
      up with me regarding this issue.
    </label>
  );
};
export default ChatFeedbackOptIn;
