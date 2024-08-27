import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import Heading from "@/components/Heading/Heading";
import { RelatedItemsStyled } from "@/components/Shared/RelatedItems.styled";
import SliderWrapper from "@/components/Clover/SliderWrapper";
import { WorkSliders } from "@/lib/work-helpers";

export interface RelatedItemsProps {
  collections?: WorkSliders[];
  title?: string;
}

const RelatedItems: React.FC<RelatedItemsProps> = ({ collections, title }) => {
  if (collections?.length === 0) return <></>;
  return (
    <RelatedItemsStyled data-testid="related-items">
      {title && (
        <Heading
          as="h2"
          css={{
            "@sm": {
              textAlign: "center",
            },
          }}
        >
          {title}
        </Heading>
      )}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {collections?.map((workSlider) => (
          <SliderWrapper
            collectionId={workSlider.iiifCollectionId}
            customViewAll={workSlider.customViewAll}
            key={workSlider.iiifCollectionId}
          />
        ))}
      </ErrorBoundary>
    </RelatedItemsStyled>
  );
};
export default RelatedItems;
