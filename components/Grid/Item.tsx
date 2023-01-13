import { useContext, useEffect, useState } from "react";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Figure from "@/components/Figure/Figure";
import { GridItem as ItemStyled } from "@/components/Grid/Grid.styled";
import Link from "next/link";
import { SearchShape } from "@/types/api/response";
import { UserContext } from "@/pages/_app";

interface GridItemProps {
  item: SearchShape;
}

const GridItem: React.FC<GridItemProps> = ({ item }) => {
  const [urlPath, setUrlPath] = useState<string>();
  const [endpointPath, setEndpointPath] = useState<string>();
  const [supplementalInfo, setSupplementalInfo] = useState<string>();
  const userContext = useContext(UserContext);

  const isRestricted = (item: SearchShape): boolean => {
    const { visibility } = item;
    if (!userContext?.user?.isLoggedIn && visibility !== "Public") return true;
    return false;
  };

  useEffect(() => {
    switch (item.api_model) {
      case "Work":
        setUrlPath("/items");
        setEndpointPath("/works");
        setSupplementalInfo(item.work_type);
        return;
      case "Collection":
        setUrlPath("/collections");
        setEndpointPath("/collections");
        return;
      default:
        setUrlPath("/items");
        setEndpointPath("/works");
        setSupplementalInfo(item.work_type);
        return;
    }
  }, [item]);

  if (!endpointPath) return <></>;

  return (
    <ItemStyled key={item.id} data-item-id={item.id}>
      <Link href={`${urlPath}/${item.id}`}>
        <a>
          <Figure
            data={{
              aspectRatio: item.representative_file_set.aspect_ratio,
              isRestricted: isRestricted(item),
              src: `${DCAPI_ENDPOINT}${endpointPath}/${item.id}/thumbnail`,
              supplementalInfo: supplementalInfo,
              title: item.title,
            }}
          />
        </a>
      </Link>
    </ItemStyled>
  );
};

export default GridItem;
