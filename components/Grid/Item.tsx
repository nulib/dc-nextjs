import { useContext, useEffect, useState } from "react";

import Figure from "@/components/Figure/Figure";
import { GridItem as ItemStyled } from "@/components/Grid/Grid.styled";
import Link from "next/link";
import { SearchShape } from "@/types/api/response";
import { UserContext } from "@/context/user-context";

interface GridItemProps {
  item: SearchShape;
  isFeatured?: boolean;
}

const GridItem: React.FC<GridItemProps> = ({ item, isFeatured }) => {
  const [urlPath, setUrlPath] = useState<string>();
  const userContext = useContext(UserContext);

  const isRestricted = (item: SearchShape): boolean => {
    return !(
      userContext?.user?.scopes?.includes(`read:${item?.visibility}`) ?? false
    );
  };

  const noTitleString = "No title";

  useEffect(() => {
    switch (item.api_model) {
      case "Work":
        setUrlPath("/items");
        return;
      case "Collection":
        setUrlPath("/collections");
        return;
      default:
        setUrlPath("/items");
        return;
    }
  }, [item]);

  return (
    <ItemStyled key={item.id} data-item-id={item.id} data-testid="grid-item">
      <Link href={`${urlPath}/${item.id}`} data-testid="grid-item-link">
        <Figure
          data={{
            aspectRatio: item.representative_file_set?.aspect_ratio,
            isRestricted: isRestricted(item),
            src:
              isFeatured && item.representative_file_set?.url
                ? `${item.representative_file_set.url}/square/512,/0/default.jpg`
                : item.thumbnail || "",
            supplementalInfo: item.work_type,
            title: item.title || noTitleString,
          }}
        />
      </Link>
    </ItemStyled>
  );
};

export default GridItem;
