import React from "react";
import { StyledResponseMarkdown } from "@/components/Chat/Response/Response.styled";
import useMarkdown from "@nulib/use-markdown";

const ResponseMarkdown = ({ content }: { content: string }) => {
  const { html } = useMarkdown(content);

  let parsedHtml = html;

  const tableRegex = /<table>(.*?)<\/table>/gs;
  const tableMatch = html.match(tableRegex);

  if (tableMatch) {
    tableMatch.forEach((table) => {
      const tableWrapped = `<div class="table-wrapper">${table}</div>`;
      parsedHtml = html.replace(table, tableWrapped);
    });
  }

  return (
    <StyledResponseMarkdown dangerouslySetInnerHTML={{ __html: parsedHtml }} />
  );
};

export default ResponseMarkdown;
