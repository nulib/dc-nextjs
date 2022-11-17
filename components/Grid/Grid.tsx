import { GridItem, GridStyled } from "@/components/Grid/Grid.styled";
import Container from "@/components/Shared/Container";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Figure from "@/components/Figure/Figure";
import Link from "next/link";
import { SearchShape } from "@/types/api/response";
import { UserContext } from "@/pages/_app";
import { useContext } from "react";

interface GridProps {
  data: SearchShape[];
  info: { total?: number };
}
const Grid: React.FC<GridProps> = ({ data = [] }) => {
  const userContext = useContext(UserContext);

  if (!data) return <span>Loading...</span>;

  const isRestricted = (item: SearchShape): boolean => {
    const { visibility } = item;

    // If Reading room, false

    // User not logged in and visibility !== "Public"
    if (!userContext?.user && visibility !== "Public") return true;

    return false;
  };

  /* eslint sort-keys: 0 */
  const breakpointColumnsObj = {
    default: 5,
    1200: 4,
    992: 3,
    700: 2,
  };

  return (
    <Container containerType="wide">
      <GridStyled
        breakpointCols={breakpointColumnsObj}
        className="dc-grid"
        columnClassName="dc-grid-column"
      >
        {data.map((item: SearchShape) => (
          <GridItem key={item.accession_number} data-item-id={item.id}>
            <Link href={`/items/${item.id}`}>
              <a>
                <Figure
                  data={{
                    isRestricted: isRestricted(item),
                    src: `${DCAPI_ENDPOINT}/works/${item.id}/thumbnail`,
                    supplementalInfo: item.work_type,
                    title: item.title ? item.title : item.accession_number,
                  }}
                />
              </a>
            </Link>
          </GridItem>
        ))}
      </GridStyled>
    </Container>
  );
};

export default Grid;
