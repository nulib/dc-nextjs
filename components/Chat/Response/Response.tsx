import {
  StyledQuestion,
  StyledResponse,
  StyledResponseAside,
  StyledResponseContent,
  StyledResponseWrapper,
} from "./Response.styled";

import BouncingLoader from "@/components/Shared/BouncingLoader";
import Container from "@/components/Shared/Container";
import React from "react";
import ResponseImages from "@/components/Chat/Response/Images";
import ResponseStreamedAnswer from "@/components/Chat/Response/StreamedAnswer";
import { Work } from "@nulib/dcapi-types";

interface ChatResponseProps {
  isStreamingComplete: boolean;
  question: string;
  sourceDocuments: Work[];
  streamedAnswer?: string;
}

const ChatResponse: React.FC<ChatResponseProps> = ({
  isStreamingComplete,
  question,
  sourceDocuments,
  streamedAnswer,
}) => {
  return (
    <StyledResponseWrapper>
      <Container containerType="wide">
        <StyledResponse>
          <StyledResponseContent>
            <StyledQuestion>{question}</StyledQuestion>
            {streamedAnswer ? (
              <ResponseStreamedAnswer
                isStreamingComplete={isStreamingComplete}
                streamedAnswer={streamedAnswer}
              />
            ) : (
              <BouncingLoader />
            )}
          </StyledResponseContent>
          {sourceDocuments.length > 0 && (
            <StyledResponseAside>
              <ResponseImages sourceDocuments={sourceDocuments} />
            </StyledResponseAside>
          )}
        </StyledResponse>
      </Container>
    </StyledResponseWrapper>
  );
};

export default ChatResponse;
