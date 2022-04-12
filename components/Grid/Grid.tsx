import { GridItem, GridStyled } from "@/components/Grid/Grid.styled";
import Figure from "@/components/Figure/Figure";
import { HitsResponse, Hit } from "@/types/elasticsearch";

interface GridProps {
  hits: HitsResponse;
}
const Grid: React.FC<GridProps> = ({ hits }) => {
  if (!hits) return <span>Loading...</span>;

  return (
    <GridStyled
      breakpointCols={4}
      className="dc-grid"
      columnClassName="dc-grid-column"
    >
      {hits.hits.map((hit: Hit) => (
        <GridItem key={hit._source.accessionNumber}>
          <Figure
            data={{
              title: hit._source.title,
              type: hit._source.accessionNumber,
              src: hit._source.thumbnail,
            }}
          />
        </GridItem>
      ))}
    </GridStyled>
  );
};

export default Grid;
