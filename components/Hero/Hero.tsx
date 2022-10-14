import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper";
import { Label, Summary, Thumbnail } from "@samvera/nectar-iiif";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@nulib/design-system";
import Container from "@/components/Shared/Container";
import { HeroCollection } from "@/lib/constants/homepage";
import { HeroStyled } from "@/components/Hero/Hero.styled";
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
                  {item.seeAlso &&
                    item.seeAlso.map((entry) => (
                      <Link href={entry.id} key={entry.id}>
                        <Button isPrimary as="a" className="slide-see-also">
                          {entry.label ? (
                            <Label label={entry.label} />
                          ) : (
                            <span>Search Collection</span>
                          )}
                        </Button>
                      </Link>
                    ))}
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
