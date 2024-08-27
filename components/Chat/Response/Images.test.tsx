import { render, screen, waitFor } from "@testing-library/react";

import ResponseImages from "@/components/Chat/Response/Images";
import { sampleWork1 } from "@/mocks/sample-work1";
import { sampleWork2 } from "@/mocks/sample-work2";

describe("ResponseImages", () => {
  it.skip("renders the component", async () => {
    const sourceDocuments = [sampleWork1, sampleWork2];

    render(
      <ResponseImages
        sourceDocuments={sourceDocuments}
        isStreamingComplete={true}
      />,
    );

    sourceDocuments.forEach(async (doc) => {
      // check that the item is not in the document on initial render
      expect(screen.queryByText(`${doc?.title}`)).not.toBeInTheDocument();

      // check that the items are in the document after 1 second
      await waitFor(
        () => {
          expect(screen.getByText(`${doc?.title}`)).toBeInTheDocument();
        },
        { timeout: 1000 },
      );
    });
  });
});
