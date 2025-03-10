import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper";
import { HeroActions, HeroStyled } from "@/components/Hero/Hero.styled";
import { Label, Summary, Thumbnail } from "@samvera/clover-iiif/primitives";
import { Swiper, SwiperSlide } from "swiper/react";

import Container from "@/components/Shared/Container";
import { HeroCollection } from "@/lib/constants/homepage";
import Link from "next/link";
import React from "react";

interface HeroProps {
  collection: HeroCollection;
}

const Hero: React.FC<HeroProps> = ({ collection }) => {
  return (
    <HeroStyled>
      <Swiper
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        keyboard={{ enabled: true }}
        loop={true}
        modules={[Autoplay, EffectFade, Keyboard, Pagination, Navigation]}
        navigation={collection.items.length > 1}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        speed={300}
      >
        {collection.items.map((item) => (
          <SwiperSlide key={item.id}>
            <figure>
              <Thumbnail
                thumbnail={item.thumbnail}
                region={item?.nul_hero_region}
              />
              <Container className="slide-inner" isFlex>
                <figcaption>
                  <Link href={item.homepage[0].id}>
                    <Label
                      label={item.label}
                      as="span"
                      className="slide-label"
                    />
                  </Link>
                  {item.summary && (
                    <Summary
                      summary={item.summary}
                      as="span"
                      className="slide-summary"
                    />
                  )}

                  {item.seeAlso && (
                    <HeroActions>
                      {item.seeAlso.map((entry) => {
                        return (
                          <Link href={entry.id} key={entry.id}>
                            {entry.label ? (
                              <Label label={entry.label} />
                            ) : (
                              <span>Search Collection</span>
                            )}
                          </Link>
                        );
                      })}
                    </HeroActions>
                  )}
                </figcaption>
              </Container>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </HeroStyled>
  );
};

export default Hero;
