import {
  Description,
  ItemContent,
  ItemImageWrapper,
  ItemStyled,
} from "@/components/Collection/Item/Item.styled";

import type { CollectionListShape } from "@/lib/collection-helpers";
import Figure from "@/components/Figure/Figure";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";
import { LinkStyled } from "@/components/Shared/LinkStyled";
import ReadMore from "@/components/Shared/ReadMore";
import WorkCount from "@/components/Shared/WorkCount/WorkCount";

const CollectionItem: React.FC<CollectionListShape> = ({
  title,
  description,
  id,
  thumbnail,
  totalAudio,
  totalImage,
  totalVideo,
}) => {
  return (
    <ItemStyled data-collection={id}>
      <ItemImageWrapper>
        <Link href={`/collections/${id}`}>
          <Figure
            data={{
              src: `${thumbnail}?aspect=square`,
              title,
            }}
          />
        </Link>
      </ItemImageWrapper>
      <ItemContent>
        <Heading as="h4">
          <Link href={`/collections/${id}`} legacyBehavior>
            <LinkStyled>{title}</LinkStyled>
          </Link>
        </Heading>
        <WorkCount image={totalImage} audio={totalAudio} video={totalVideo} />
        {description && (
          <Description>
            <ReadMore text={description} words={55} />
          </Description>
        )}
      </ItemContent>
    </ItemStyled>
  );
};

export default CollectionItem;
