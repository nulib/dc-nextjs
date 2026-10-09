import Masonry from "react-masonry-css";
import styles from "@/components/Grid/Grid.module.css";
import GridItem from "@/components/Grid/Item";
import React from "react";
import { SearchShape } from "@/types/api/response";
import { width } from "@/styles/media";
interface GridProps {
  data: SearchShape[];
  info: {
    total?: number;
  };
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
    <Masonry
      breakpointCols={breakpointColumns}
      columnClassName="grid-column"
      data-testid="search-results-grid"
      className={[styles.gridStyled, "grid"].filter(Boolean).join(" ")}
    >
      {data.map((item: SearchShape) => (
        <GridItem item={item} key={item.id} />
      ))}
    </Masonry>
  );
};
export default Grid;
