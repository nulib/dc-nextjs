import { useEffect, useState } from "react";

import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

function useMarkdown({
  markdown,
  hasCursor,
}: {
  markdown: string;
  hasCursor: boolean;
}): {
  html: string;
  jsx: JSX.Element;
} {
  const [html, setHtml] = useState<string>("");

  const cursor = "<!--PLACEHOLDER_CURSOR-->";
  const preparedMarkdown = hasCursor ? markdown + cursor : markdown;

  useEffect(() => {
    (async () => {
      const processor = unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify);

      const result = await processor.process(preparedMarkdown);
      const htmlContent = String(result);

      const cursorRegex = new RegExp(cursor, "g");
      const updatedHtml = hasCursor
        ? htmlContent.replace(
            cursorRegex,
            `<span class="markdown-cursor"></span>`
          )
        : htmlContent;

      setHtml(updatedHtml);
    })();
  }, [hasCursor, preparedMarkdown]);

  return {
    html,
    jsx: <div dangerouslySetInnerHTML={{ __html: html }} />,
  };
}

export default useMarkdown;
