import { ApiResponseDataShape } from "@/types/api/response";
import { GridItem, GridStyled } from "@/components/Grid/Grid.styled";
import Figure from "@/components/Figure/Figure";

interface GridProps {
  data: ApiResponseDataShape[];
  info: { total?: number };
}
const Grid: React.FC<GridProps> = ({ data = [] }) => {
  if (!data) return <span>Loading...</span>;

  return (
    <GridStyled
      breakpointCols={5}
      className="dc-grid"
      columnClassName="dc-grid-column"
    >
      {data.map((item: ApiResponseDataShape) => (
        <GridItem key={item.accession_number}>
          <Figure
            data={{
              src: item.thumbnail,
              title: item.title,
              type: item.accession_number,
            }}
          />
        </GridItem>
      ))}
    </GridStyled>
  );
};

export default Grid;
