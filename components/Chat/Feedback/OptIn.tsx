import { UserContext } from "@/context/user-context";
import { styled } from "@/stitches.config";
import { useContext } from "react";

const ChatFeedbackOptIn = () => {
  const { user } = useContext(UserContext);

  return (
    <StyledChatFeedbackOptIn>
      <input name="email" type="checkbox" value={user?.email} /> Please follow
      up with me regarding this issue.
    </StyledChatFeedbackOptIn>
  );
};

/* eslint-disable sort-keys */
const StyledChatFeedbackOptIn = styled("label", {
  display: "block",
  margin: "$gr3 0",
  fontSize: "$gr2",
});

export default ChatFeedbackOptIn;
