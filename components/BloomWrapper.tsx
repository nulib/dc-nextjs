import dynamic from "next/dynamic";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledBloomIIIFWrapper = styled("div", {
  position: "relative",
  zIndex: "0",

  ".swiper-slide[data-type='collection']": {
    display: "none",
  },
});

const BloomIIIF: React.ComponentType<{
  collectionId: string;
}> = dynamic(() => import("@samvera/bloom-iiif"), {
  ssr: false,
});

const BloomIIIFWrapper = ({ collectionId }: { collectionId: string }) => (
  <StyledBloomIIIFWrapper>
    <BloomIIIF collectionId={collectionId} />
  </StyledBloomIIIFWrapper>
);

export default BloomIIIFWrapper;
