import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper";
import { Label, Summary, Thumbnail } from "@samvera/nectar-iiif";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "@/components/Shared/Container";
import { HeroCollection } from "@/lib/constants/homepage-hero";
import { HeroStyled } from "@/components/Header/Hero.styled";
import React from "react";

interface HeaderHeroProps {
  collection: HeroCollection;
}

const HeaderHero: React.FC<HeaderHeroProps> = ({ collection }) => {
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
        navigation={true}
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
                  <Label label={item.label} as="span" className="slide-label" />
                  <Summary
                    summary={item.summary}
                    as="span"
                    className="slide-summary"
                  />
                </figcaption>
              </Container>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </HeroStyled>
  );
};

export default HeaderHero;
