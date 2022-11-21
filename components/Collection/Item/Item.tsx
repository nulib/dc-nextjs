import {
  Description,
  ItemContent,
  ItemImageWrapper,
  ItemStyled,
  MetadataIcons,
} from "@/components/Collection/Item/Item.styled";
import { IconAudio, IconImage, IconVideo } from "@/components/Shared/SVG/Icons";
import { type CollectionListShape } from "@/pages/collections";
import Figure from "@/components/Figure/Figure";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";
import { LinkStyled } from "@/components/Shared/LinkStyled";
import ReadMore from "@/components/Shared/ReadMore";

const CollectionItem: React.FC<CollectionListShape> = ({
  title,
  description,
  id,
  thumbnail,
  totalAudio,
  totalImage,
  totalVideo,
  totalWorks,
}) => {
  return (
    <ItemStyled data-collection={id}>
      <ItemImageWrapper>
        <Link href={`/collections/${id}`}>
          <a>
            <Figure
              data={{
                src: `${thumbnail}?aspect=square`,
                title,
              }}
            />
          </a>
        </Link>
      </ItemImageWrapper>
      <ItemContent>
        <Link href={`/collections/${id}`}>
          <Heading as="h4">
            <LinkStyled>{title}</LinkStyled>
          </Heading>
        </Link>

        {totalWorks && totalWorks > 0 ? (
          <MetadataIcons>
            {totalWorks && totalWorks > 0 ? (
              <span>{totalWorks} Works</span>
            ) : null}
            {totalImage && totalImage > 0 ? (
              <span title={`${totalImage} images`}>
                {totalImage} <IconImage />
              </span>
            ) : null}
            {totalAudio && totalAudio > 0 ? (
              <span title={`${totalAudio} audio files`}>
                {totalAudio} <IconAudio />
              </span>
            ) : null}

            {totalVideo && totalVideo > 0 ? (
              <span title={`${totalVideo} videos`}>
                {totalVideo} <IconVideo />
              </span>
            ) : null}
          </MetadataIcons>
        ) : null}

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
