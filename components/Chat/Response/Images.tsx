import { useEffect, useState } from "react";

import GridItem from "@/components/Grid/Item";
import { StyledImages } from "@/components/Chat/Response/Response.styled";
import { Work } from "@nulib/dcapi-types";

const INITIAL_MAX_ITEMS = 5;

const ResponseImages = ({
  isStreamingComplete,
  works,
}: {
  isStreamingComplete: boolean;
  works: Work[];
}) => {
  const [nextIndex, setNextIndex] = useState(0);

  useEffect(() => {
    if (isStreamingComplete) {
      setNextIndex(works.length);
      return;
    }

    if (nextIndex < works.length && nextIndex < INITIAL_MAX_ITEMS) {
      const timer = setTimeout(() => {
        setNextIndex(nextIndex + 1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isStreamingComplete, nextIndex, works.length]);

  return (
    <StyledImages>
      {works.slice(0, nextIndex).map((document: Work) => (
        <GridItem key={document.id} item={document} />
      ))}
    </StyledImages>
  );
};

export default ResponseImages;
