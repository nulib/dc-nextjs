import GridItem from "@/components/Grid/Item";
import { GridStyled } from "@/components/Grid/Grid.styled";
import React from "react";
import { SearchShape } from "@/types/api/response";
import { width } from "@/styles/media";

interface GridProps {
  data: SearchShape[];
  info: { total?: number };
}

const Grid: React.FC<GridProps> = ({ data = [] }) => {
  const breakpointColumns = {
    default: 5,
    [width.xl]: 5,
    [width.lg]: 4,
    [width.md]: 3,
    [width.sm]: 2,
    [width.xs]: 2,
  };

  if (!data) return <></>;

  return (
    <GridStyled
      breakpointCols={breakpointColumns}
      className="grid"
      columnClassName="grid-column"
      data-testid="search-results-grid"
    >
      {data.map((item: SearchShape) => (
        <GridItem item={item} key={item.id} />
      ))}
    </GridStyled>
  );
};

export default Grid;
