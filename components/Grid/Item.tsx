import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Figure from "@/components/Figure/Figure";
import { GridItem as ItemStyled } from "@/components/Grid/Grid.styled";
import Link from "next/link";
import { SearchShape } from "@/types/api/response";
import { UserContext } from "@/pages/_app";
import { useContext } from "react";

interface GridItemProps {
  item: SearchShape;
}

const GridItem: React.FC<GridItemProps> = ({ item }) => {
  const userContext = useContext(UserContext);

  const isRestricted = (item: SearchShape): boolean => {
    const { visibility } = item;
    if (!userContext?.user && visibility !== "Public") return true;
    return false;
  };

  return (
    <ItemStyled key={item.id} data-item-id={item.id}>
      <Link href={`/items/${item.id}`}>
        <a>
          <Figure
            data={{
              aspectRatio: item.representative_file_set.aspect_ratio,
              isRestricted: isRestricted(item),
              src: `${DCAPI_ENDPOINT}/works/${item.id}/thumbnail`,
              supplementalInfo: item.work_type,
              title: item.title,
            }}
          />
        </a>
      </Link>
    </ItemStyled>
  );
};

export default GridItem;
