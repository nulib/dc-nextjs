import { GridItem, GridStyled } from "@/components/Grid/Grid.styled";
import Figure from "@/components/Figure/Figure";

interface GridProps {
  data: any[];
  info: { total?: number };
}
const Grid: React.FC<GridProps> = ({ data = [], info }) => {
  if (!data) return <span>Loading...</span>;

  return (
    <GridStyled
      breakpointCols={5}
      className="dc-grid"
      columnClassName="dc-grid-column"
    >
      {data.map((item: any) => (
        <GridItem key={item.accession_number}>
          <Figure
            data={{
              title: item.title,
              type: item.accession_number,
              src: item.thumbnail,
            }}
          />
        </GridItem>
      ))}
    </GridStyled>
  );
};

export default Grid;
