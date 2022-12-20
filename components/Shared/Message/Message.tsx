import {
  MessageContent,
  MessageStyled,
  MessageText,
  MessageTitle,
} from "@/components/Shared/Message/Message.styled";
import { useEffect, useState } from "react";
import { Button } from "@nulib/design-system";
import Container from "@/components/Shared/Container";
import useSessionStorage from "@/hooks/useSessionStorage";

const Message = () => {
  const current = Date.now() / 1000;
  const interval = 86400; // 24 hours

  const [isVisible, setIsVisible] = useState(false);

  const [status, setStatus] = useSessionStorage("message_status", true);
  const [timestamp, setTimestamp] = useSessionStorage(
    "message_timestamp",
    current
  );

  const handleDismiss = () => {
    setStatus(false);
    setTimestamp(current);
  };

  useEffect(() => {
    setIsVisible(status);
  }, [status]);

  useEffect(() => {
    if (current > timestamp + interval) {
      setStatus(true);
    }
  }, [setStatus, current, timestamp]);

  if (!isVisible) return <></>;

  return (
    <MessageStyled data-nosnippet status={isVisible}>
      <Container>
        <MessageContent>
          <div>
            <MessageTitle>Donec sollicitudin molestie massa</MessageTitle>
            <MessageText>
              Nulla fringilla elementum odio eget efficitur. Mauris placerat
              velit sapien, vitae gravida nibh feugiat at. Sed a congue turpis.
              Aliquam nibh nulla, ullamcorper non purus vel, cursus interdum
              augue. Suspendisse turpis ex, mollis non consequat quis, interdum
              vel diam.
            </MessageText>
          </div>
          <div>
            <Button isText isLowercase onClick={handleDismiss}>
              Dismiss
            </Button>
          </div>
        </MessageContent>
      </Container>
    </MessageStyled>
  );
};
export default Message;
