import styles from "@/components/Shared/RelatedItems.module.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import Heading from "@/components/Heading/Heading";
import SliderWrapper from "@/components/Clover/SliderWrapper";
import { WorkSliders } from "@/lib/work-helpers";
export interface RelatedItemsProps {
  collections?: WorkSliders[];
  title?: string;
}
const RelatedItems: React.FC<RelatedItemsProps> = ({ collections, title }) => {
  if (collections?.length === 0) return <></>;
  return (
    <section data-testid="related-items" className={styles.relatedItemsStyled}>
      {title && (
        <Heading as="h2" className={styles.override0}>
          {title}
        </Heading>
      )}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {collections?.map((workSlider) => {
          const collectionId = new URL(workSlider.iiifCollectionId);
          return (
            <SliderWrapper
              collectionId={collectionId}
              customViewAll={workSlider.customViewAll}
              key={workSlider.iiifCollectionId}
            />
          );
        })}
      </ErrorBoundary>
    </section>
  );
};
export default RelatedItems;
