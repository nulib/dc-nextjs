import AnswerCard from "./Card";
import React from "react";
import { SourceDocument } from "../../types/search-prototype";
import { styled } from "@/stitches.config";

interface SourceDocumentsProps {
  source_documents: SourceDocument[];
}

const SourceDocuments: React.FC<SourceDocumentsProps> = ({
  source_documents,
}) => {
  return (
    <Sources>
      {source_documents.map((document, idx) => (
        <AnswerCard {...document} key={idx} />
      ))}
    </Sources>
  );
};

const Sources = styled("div", {
  display: "flex",
  gap: "$gr4",
  overflowX: "scroll",
  padding: "$gr3 0 0",
});

export default SourceDocuments;
