import { jsx } from "react/jsx-runtime";

export default function useMarkdown(content) {
  return {
    html: content,
    jsx: jsx("span", {
      children: content,
    }),
  };
}
