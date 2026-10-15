import styles from "@/components/About/CollectionGrid.module.css";
import PhotoFeature, {
  PhotoFeatureProps,
} from "@/components/Shared/PhotoFeature/PhotoFeature";
interface Props {
  items: PhotoFeatureProps[];
}
const AboutCollectionGrid: React.FC<Props> = ({ items = [] }) => {
  return (
    <div className={styles.collectionGridStyled}>
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
    </div>
  );
};
export default AboutCollectionGrid;
