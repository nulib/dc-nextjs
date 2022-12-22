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
            <MessageTitle>Potentially harmful content</MessageTitle>
            <MessageText>
              Northwestern University Libraries Digital Collections contain
              materials that reflect the beliefs and norms of the era and
              culture in which they were created or collected. The site contains
              offensive imagery, language, or opinions related to a white
              supremist, exploitative, and/or discriminatory culture.
              Additionally, this site contains sexual content or violence that
              may not be appropriate for all audiences. The Libraries are
              committed to the ethical digitization and description of materials
              that offer alternative histories and center voices from
              marginalized cultures. If you have questions or concerns about the
              materials, please refer to our “Retention of Challenged Materials”
              policy with more information about how to contact us.
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
