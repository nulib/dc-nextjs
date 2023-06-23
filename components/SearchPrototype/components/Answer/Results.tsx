import * as Accordion from "@radix-ui/react-accordion";
import AnswerInformation, { AnswerTooltip } from "./Information";
import React, { useEffect, useRef, useState } from "react";
import AnswerCard from "./Card";
import AnswerLoader from "./Loader";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Icon from "@/components/Shared/Icon";
import { IconClear } from "@/components/Shared/SVG/Icons";
import Typed from "typed.js";
import axios from "axios";
import { styled } from "@/stitches.config";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const AnswerResults = ({ questionId }: { questionId: number }) => {
  const questionElement = useRef(null);
  const [response, setResponse] = useState<any>();
  const [questions, saveQuestions] = useLocalStorage<any>(
    "nul-chat-search",
    []
  );
  const entry = questions?.find((q: any) => q.id === questionId);
  // type the question and get a response from the chat API
  useEffect(() => {
    if (entry?.question && !entry?.response) {
      const typed = new Typed(questionElement.current, {
        strings: [entry?.question],
        typeSpeed: 5,
        onComplete: function (self) {
          self.cursor.remove();
          axios({
            data: entry?.question,
            headers: { "Content-Type": "text/plain" },
            method: "post",
            url: `${DCAPI_ENDPOINT}/chat`,
            withCredentials: true,
          }).then((response) => {
            setResponse(response.data);
            saveQuestions(
              questions.map((q: any) => {
                if (q.id === questionId) {
                  q.response = response.data;
                }
                return q;
              })
            );
          });
        },
      });

      return () => typed.destroy();
    } else if (entry?.response) {
      // @ts-ignore
      questionElement.current.innerHTML = entry?.question;
      setResponse(entry?.response);
    }
  }, [entry]);

  const handleDelete = () => {
    saveQuestions(questions.filter((q: any) => q.id !== questionId));
  };

  return (
    <StyledAnswerResults value={`${questionId}`}>
      <Header>
        <Accordion.Trigger>
          <Question ref={questionElement} />
        </Accordion.Trigger>
        <Actions>
          {response?.answer && (
            <AnswerInformation timestamp={entry?.timestamp} />
          )}
          <RemoveButton onClick={handleDelete}>
            <Icon>
              <IconClear />
            </Icon>
          </RemoveButton>
        </Actions>
      </Header>

      {response?.question === entry?.question ? (
        <Accordion.Content>
          <Answer>{response?.answer}</Answer>
          <Sources>
            {response?.source_documents.map((document: any) => (
              <AnswerCard {...document} key={document.identifier} />
            ))}
          </Sources>
        </Accordion.Content>
      ) : (
        <AnswerLoader />
      )}
    </StyledAnswerResults>
  );
};

/* eslint sort-keys: 0 */

const Actions = styled("div", {
  display: "flex",
  paddingLeft: "$gr5",
});

const RemoveButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr2",
  padding: "0",

  svg: {
    fill: "$black20 !important",
    transition: "opacity 0.2s ease-in-out",
  },

  "&:active, &:hover": {
    svg: {
      opacity: "1 !important",
      fill: "$brightRed !important",
    },
  },
});

const Question = styled("span", {});

const Header = styled(Accordion.Header, {
  margin: "$gr2 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",

  button: {
    background: "transparent !important",
    border: "none",
    cursor: "pointer",
    margin: "0",
    padding: "0",
    color: "$black !important",
    fontSize: "$gr5 !important",
    fontFamily: "$northwesternSansBold !important",
    textAlign: "left",

    "&:hover": {
      color: "$brightBlueB !important",
    },
  },
});

const Answer = styled("article", {
  fontSize: "$gr3",
  fontFamily: "$northwesternSerifRegular !important",
  lineHeight: "1.76em",
  margin: "$gr3 0 $gr2",
});

const Sources = styled("div", {
  display: "flex",
  gap: "$gr4",
  overflowX: "scroll",
  padding: "$gr1 0",
});

const StyledAnswerResults = styled(Accordion.Item, {
  "&::after": {
    content: "",
    display: "block",
    height: "1px",
    margin: "$gr3 0",
    width: "100%",
    backgroundColor: "$gray6",
  },

  [`&[data-state=closed]  ${Header}`]: {
    [`button`]: {
      fontFamily: "$northwesternSansRegular !important",
      color: "$black50 !important",

      "&:hover": {
        color: "$brightBlueB !important",
      },
    },

    [`& ${AnswerTooltip}`]: {
      display: "none",
      cursor: "default",
    },
  },

  "&:hover button svg": {
    opacity: "1",
  },
});

export default AnswerResults;
