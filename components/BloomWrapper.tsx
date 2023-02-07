import { SwiperProps } from "swiper/react";
import dynamic from "next/dynamic";
import { gr } from "@/styles/sizes";
import { rem } from "@/styles/global";
import { styled } from "@/stitches.config";
import { width } from "@/styles/media";

/* eslint sort-keys: 0 */

const StyledBloomIIIFWrapper = styled("div", {
  position: "relative",
  zIndex: "0",

  ".swiper-slide[data-type='collection']": {
    display: "none",
  },

  "@sm": {
    "& > div > div": {
      alignItems: "center",

      "& > div": {
        "&:last-child": {
          paddingTop: "$gr2",
        },
      },
    },
  },
});

type SwiperBreakpoints = SwiperProps["breakpoints"];

const breakpoints: SwiperBreakpoints = {
  [width.xxs]: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: rem,
  },
  [width.xs]: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: rem,
  },
  [width.sm]: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: rem,
  },
  [width.md]: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: rem * gr(1),
  },
  [width.lg]: {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: rem * gr(1),
  },
  [width.xl]: {
    slidesPerView: 6,
    slidesPerGroup: 6,
    spaceBetween: rem * gr(2),
  },
};

const BloomIIIF: React.ComponentType<{
  collectionId: string;
  options: {
    breakpoints: SwiperBreakpoints;
    credentials: "include" | "omit" | "same-origin";
    enablePreview: boolean;
  };
}> = dynamic(() => import("@samvera/bloom-iiif"), {
  ssr: false,
});

const BloomIIIFWrapper = ({ collectionId }: { collectionId: string }) => (
  <StyledBloomIIIFWrapper>
    <BloomIIIF
      collectionId={collectionId}
      options={{
        enablePreview: false,
        breakpoints: breakpoints,
        credentials: "include",
      }}
    />
  </StyledBloomIIIFWrapper>
);

export default BloomIIIFWrapper;
