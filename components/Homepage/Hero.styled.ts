/* eslint sort-keys: 0 */

import { HeroStyled } from "@/components/Hero/Hero.styled";
import { styled } from "@/stitches.config";

const spacing = 206;

export const HomepageHeroStyled = styled("div", {
  height: `calc(100vh - ${spacing}px)`,
  maxHeight: `calc(800px - ${spacing}px)`,
  minHeight: `calc(500px - ${spacing}px)`,
  position: "relative",

  [`& ${HeroStyled}`]: {
    ".swiper": {
      ".slide-inner": {
        justifyContent: "flex-end",

        "@sm": {
          justifyContent: "center",
          margin: "0 auto",
        },
      },

      ".swiper-slide": {
        figure: {
          figcaption: {
            alignItems: "flex-end",
            bottom: "$gr6",
            marginRight: "$gr5",
            textAlign: "right",
          },

          "img, video": {
            opacity: "1 !important",
          },
        },
      },
    },
  },
});
