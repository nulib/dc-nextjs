import {
  ItemContent,
  ItemImage,
  ItemImageWrapper,
  ItemStyled,
} from "@/components/Collection/Item/Item.styled";
import { CollectionShape } from "@/types/components/collections";
import ContentLoader from "react-content-loader";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Heading from "@/components/Heading/Heading";
import ReadMore from "@/components/Shared/ReadMore";

const CollectionItem: React.FC<CollectionShape> = (props) => {
  const { title, description, id, representative_image } = props;

  const src = representative_image?.work_id
    ? `${DCAPI_ENDPOINT}/works/${representative_image.work_id}/thumbnail?aspect=square`
    : null;

  return (
    <ItemStyled data-collection={id}>
      <ItemImageWrapper>
        <a href={`/collections/${id}`}>
          {src ? (
            <ItemImage alt={title} src={src} width="300" height="300" />
          ) : (
            <ContentLoader
              speed={0}
              width={150}
              height={150}
              viewBox="0 0 150 150"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              title={title}
            >
              <rect x="0" y="0" width="150" height="150" />
            </ContentLoader>
          )}
        </a>
      </ItemImageWrapper>
      <ItemContent>
        <a href={`/collections/${id}`}>
          <Heading as="h2">{title}</Heading>
        </a>
        {description && (
          <p>
            <ReadMore text={description} words={55} />
          </p>
        )}
      </ItemContent>
    </ItemStyled>
  );
};

export default CollectionItem;
