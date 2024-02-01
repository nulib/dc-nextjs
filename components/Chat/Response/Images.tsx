import { useEffect, useState } from "react";

import GridItem from "@/components/Grid/Item";
import { StyledImages } from "@/components/Chat/Response/Response.styled";
import { Work } from "@nulib/dcapi-types";

const ResponseImages = ({
  isStreamingComplete,
  sourceDocuments,
}: {
  isStreamingComplete: boolean;
  sourceDocuments: Work[];
}) => {
  const [nextIndex, setNextIndex] = useState(0);

  useEffect(() => {
    if (isStreamingComplete) {
      setNextIndex(sourceDocuments.length);
      return;
    }

    if (nextIndex < sourceDocuments.length) {
      const timer = setTimeout(() => {
        setNextIndex(nextIndex + 1);
      }, 382);

      return () => clearTimeout(timer);
    }
  }, [isStreamingComplete, nextIndex, sourceDocuments.length]);

  return (
    <StyledImages>
      {sourceDocuments.slice(0, nextIndex).map((document: Work) => (
        <GridItem key={document.id} item={document} />
      ))}
    </StyledImages>
  );
};

export default ResponseImages;
