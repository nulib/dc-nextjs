import { render, screen } from "@testing-library/react";

import React from "react";
import ResponseMarkdown from "@/components/Chat/Response/Markdown";
import useMarkdown from "@nulib/use-markdown";

jest.mock("@nulib/use-markdown");

describe("ResponseMarkdown component", () => {
  it("renders the markdown content", () => {
    const markdownContent = `# Heading`;

    (useMarkdown as jest.Mock).mockReturnValue({
      html: markdownContent,
    });

    render(<ResponseMarkdown content={markdownContent} />);
  });
});
