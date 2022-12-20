import PhotoFeature, {
  PhotoFeatureProps,
} from "@/components/Shared/PhotoFeature/PhotoFeature";
import { CollectionGridStyled } from "components/About/CollectionGridStyled";

interface Props {
  items: PhotoFeatureProps[];
}

const AboutCollectionGrid: React.FC<Props> = ({ items = [] }) => {
  return (
    <CollectionGridStyled>
      {items.map(({ callToAction, href, imgAlt, imgSrc, title }) => (
        <PhotoFeature
          key={imgSrc}
          callToAction={callToAction}
          href={href}
          imgAlt={imgAlt}
          imgSrc={imgSrc}
          title={title}
        />
      ))}
    </CollectionGridStyled>
  );
};

export default AboutCollectionGrid;
