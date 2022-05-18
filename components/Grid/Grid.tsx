import { GridItem, GridStyled } from "@/components/Grid/Grid.styled";
import Container from "@/components/Container";
import Figure from "@/components/Figure/Figure";
import { SearchShape } from "@/types/api/response";
interface GridProps {
  data: SearchShape[];
  info: { total?: number };
}
const Grid: React.FC<GridProps> = ({ data = [] }) => {
  if (!data) return <span>Loading...</span>;

  return (
    <Container containerType="wide">
      <GridStyled
        breakpointCols={5}
        className="dc-grid"
        columnClassName="dc-grid-column"
      >
        {data.map((item: SearchShape) => (
          <GridItem key={item.accession_number}>
            <Figure
              data={{
                src: item.thumbnail,
                title: item.title,
                type: item.work_type_labels,
              }}
            />
          </GridItem>
        ))}
      </GridStyled>
    </Container>
  );
};

export default Grid;
