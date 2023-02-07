import BloomIIIFWrapper from "@/components/BloomWrapper";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import Heading from "@/components/Heading/Heading";
import { RelatedItemsStyled } from "@/components/Shared/RelatedItems.styled";

export interface RelatedItemsProps {
  collectionUris?: string[];
  title?: string;
}

const RelatedItems: React.FC<RelatedItemsProps> = ({
  collectionUris,
  title,
}) => {
  if (collectionUris?.length === 0) return <></>;
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
        {collectionUris?.map((collectionId) => (
          <BloomIIIFWrapper collectionId={collectionId} key={collectionId} />
        ))}
      </ErrorBoundary>
    </RelatedItemsStyled>
  );
};
export default RelatedItems;
