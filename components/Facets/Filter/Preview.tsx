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
      <Heading as="h3">Top Results</Heading>
      <PreviewList>
        {items.map((item) => {
          return (
            <PreviewItem key={item.id} data-testid="facets-filter-preview-item">
              <Link href={`/works/${item.id}`}>
                <a>
                  <Figure
                    data={{
                      src: item.thumbnail,
                      supplementalInfo: item.work_type,
                      title: item.title ? item.title : item.accession_number,
                    }}
                    orientation="horizontal"
                  />
                </a>
              </Link>
            </PreviewItem>
          );
        })}
      </PreviewList>
    </StyledPreview>
  );
};

export default Preview;
