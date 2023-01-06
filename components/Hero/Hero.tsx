import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper";
import { HeroActions, HeroStyled } from "@/components/Hero/Hero.styled";
import { Label, Summary, Thumbnail } from "@samvera/nectar-iiif";
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
        preloadImages={false}
        slidesPerView={1}
        speed={1000}
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
                    <a>
                      <Label
                        label={item.label}
                        as="span"
                        className="slide-label"
                      />
                    </a>
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
                      {item.seeAlso.map((entry) => (
                        <Link href={entry.id} key={entry.id}>
                          <a>
                            {entry.label ? (
                              <Label label={entry.label} />
                            ) : (
                              <span>Search Collection</span>
                            )}
                          </a>
                        </Link>
                      ))}
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
