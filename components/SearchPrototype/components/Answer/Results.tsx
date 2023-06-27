import React, { useEffect, useRef, useState } from "react";
import AnswerCard from "./Card";
import Heading from "@/components/Heading/Heading";
import { SpinLoader } from "@/components/Shared/Loader.styled";
import Typed from "typed.js";
import axios from "axios";
import { styled } from "@/stitches.config";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const AnswerResults = ({ activeQuestion }: { activeQuestion: number }) => {
  const questionElement = useRef(null);
  const [response, setResponse] = useState<any>();
  const [questions] = useLocalStorage<any>("nul-chat-search", []);
  const entry = questions?.find((q: any) => q.id === activeQuestion);

  // type the question and get a response from the chat API
  useEffect(() => {
    if (entry?.question) {
      const typed = new Typed(questionElement.current, {
        strings: [entry?.question],
        typeSpeed: 5,
        onComplete: function (self) {
          self.cursor.remove();
          if (!entry?.response) {
            axios({
              data: entry?.question,
              headers: { "Content-Type": "text/plain" },
              method: "post",
              url: "https://dcapi-prototype.rdc-staging.library.northwestern.edu/api/v2/chat",
              withCredentials: true,
            }).then((response) => setResponse(response.data));
          }
        },
      });

      return () => typed.destroy();
    }
  }, [entry]);

  return (
    <StyledAnswerResults>
      <Header>
        <Heading as="h2">
          <span ref={questionElement} />
        </Heading>
      </Header>

      {response?.question === entry?.question ? (
        <>
          <Answer>{response?.answer}</Answer>
          <Sources>
            {response?.source_documents.map((document: any) => (
              <AnswerCard {...document} key={document.identifier} />
            ))}
          </Sources>
        </>
      ) : (
        <SpinLoader />
      )}
    </StyledAnswerResults>
  );
};

/* eslint sort-keys: 0 */

const Header = styled("header", {
  h2: {
    color: "$black !important",
    fontSize: "$gr5 !important",
    fontFamily: "$northwesternSansBold !important",
    padding: "$gr2 0 0 !important",
    margin: "0 !important",
  },
});

const Answer = styled("article", {
  fontSize: "$gr3",
  fontFamily: "$northwesternSerifRegular !important",
  lineHeight: "1.76em",
  padding: "$gr3 0",
});

const Sources = styled("div", {
  display: "flex",
  gap: "$gr4",
  overflowX: "scroll",
  padding: "$gr1 0",
});

const StyledAnswerResults = styled("div", {
  padding: "$gr4 0",
});

export default AnswerResults;
