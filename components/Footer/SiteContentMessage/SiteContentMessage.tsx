import {
  MessageContent,
  MessageStyled,
  MessageText,
} from "@/components/Footer/SiteContentMessage/SiteContentMessage.styled";
import { useEffect, useState } from "react";

import { Button } from "@nulib/design-system";
import Container from "@/components/Shared/Container";
import useSessionStorage from "@/hooks/useSessionStorage";

const SiteContentMessage = () => {
  const current = Date.now() / 1000;
  const interval = 86400; // 24 hours

  const [isVisible, setIsVisible] = useState(false);

  const [status, setStatus] = useSessionStorage("message_status", true);
  const [timestamp, setTimestamp] = useSessionStorage(
    "message_timestamp",
    current,
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
            <MessageText>
              Northwestern University Libraries&apos; Digital Collections
              contain materials that reflect the beliefs and norms of their eras
              and culture in which they were created or collected. The site may
              contain imagery, language, or opinions that are offensive and may
              not be appropriate for all audiences. Please direct questions to{" "}
              <a href="mailto:library@northwestern.edu">
                library@northwestern.edu
              </a>
              .
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
export default SiteContentMessage;
