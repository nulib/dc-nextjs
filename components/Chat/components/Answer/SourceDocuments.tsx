import React from "react";
import { Work } from "@nulib/dcapi-types";
import { styled } from "@/stitches.config";

interface SourceDocumentsProps {
  source_documents: Work[];
}

const SourceDocuments: React.FC<SourceDocumentsProps> = ({
  source_documents,
}) => {
  return (
    <Sources>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {source_documents.map((document, idx) => (
        <div key={document.id}>
          <strong>{document.title}</strong>
          <img src={document.thumbnail || ""} />
        </div>
        // <AnswerCard {...document} key={idx} />
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
