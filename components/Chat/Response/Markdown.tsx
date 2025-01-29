import React from "react";
import { StyledResponseMarkdown } from "@/components/Chat/Response/Response.styled";
import useMarkdown from "@nulib/use-markdown";

/**
 * Add a wrapper around HTML table elements to allow
 * for horizontal scrolling in responsive viewports
 */
function addTableWrapper(html: string) {
  let parsedHtml = html;

  const tableRegex = /<table>([\s\S]*?)<\/table>/g;
  const tableMatch = html.match(tableRegex);

  if (tableMatch) {
    tableMatch.forEach((table) => {
      const tableWrapped = `<div class="table-wrapper">${table}</div>`;
      parsedHtml = html.replace(table, tableWrapped);
    });
  }

  return parsedHtml;
}

const ResponseMarkdown = ({ content }: { content: string }) => {
  const { html } = useMarkdown(content);

  const parsedHtml = addTableWrapper(html);

  return (
    <StyledResponseMarkdown dangerouslySetInnerHTML={{ __html: parsedHtml }} />
  );
};

export default ResponseMarkdown;
