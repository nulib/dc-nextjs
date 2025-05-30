import Slider from "@samvera/clover-iiif/slider";
import { SwiperProps } from "swiper/react";
import { gr } from "@/styles/sizes";
import { rem } from "@/styles/global";
import { styled } from "@/stitches.config";
import { width } from "@/styles/media";

/* eslint sort-keys: 0 */

const StyledSliderIIIFWrapper = styled("div", {
  position: "relative",
  zIndex: "0",

  ".clover-slider-header-view-all": {
    color: "$white",
  },

  ".swiper-slide[data-type='collection']": {
    display: "none",
  },

  "@xs": {
    "& > div > div": {
      alignItems: "center",
      textAlign: "center",

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

const SliderIIIFWrapper = ({
  collectionId,
  customViewAll,
}: {
  collectionId: URL;
  customViewAll: string;
}) => {
  return (
    <StyledSliderIIIFWrapper>
      <Slider
        iiifContent={collectionId.toString()}
        options={{
          breakpoints: breakpoints,
          credentials: "include",
          customViewAll,
        }}
      />
    </StyledSliderIIIFWrapper>
  );
};

export default SliderIIIFWrapper;
