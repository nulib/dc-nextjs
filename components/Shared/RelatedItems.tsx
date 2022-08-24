import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import { RelatedItemsStyled } from "@/components/Shared/RelatedItems.styled";
import dynamic from "next/dynamic";

export interface RelatedItemsProps {
  collections?: string[];
  title: string;
}

export const BloomIIIF: React.ComponentType<{
  collectionId: string;
}> = dynamic(() => import("@samvera/bloom-iiif"), {
  ssr: false,
});

const RelatedItems: React.FC<RelatedItemsProps> = ({ collections, title }) => {
  if (collections && collections.length === 0) return <></>;

  return (
    <RelatedItemsStyled data-testid="related-items">
      <h2>{title}</h2>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {collections &&
          collections.map((collectionId) => (
            <BloomIIIF collectionId={collectionId} key={collectionId} />
          ))}
      </ErrorBoundary>
    </RelatedItemsStyled>
  );
};
export default RelatedItems;
