import { PreviewItem, PreviewList, StyledPreview } from "./Preview.styled";
import Figure from "@/components/Figure/Figure";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";
import React from "react";
import { SearchShape } from "@/types/api/response";

interface PreviewProps {
  items: SearchShape[];
}

const Preview: React.FC<PreviewProps> = ({ items }) => {
  return (
    <StyledPreview>
      <Heading as="h3">Preview Results</Heading>
      <PreviewList>
        {items.map((item) => {
          return (
            <PreviewItem key={item.id} data-testid="facets-filter-preview-item">
              <Link href={`/items/${item.id}`}>
                <Figure
                  data={{
                    aspectRatio: 1,
                    src: item.thumbnail || "",
                    supplementalInfo: item.work_type,
                    title: item.title || "",
                  }}
                  orientation="horizontal"
                />
              </Link>
            </PreviewItem>
          );
        })}
      </PreviewList>
    </StyledPreview>
  );
};

export default Preview;
