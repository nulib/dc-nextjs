import styles from "@/components/Hero/Hero.module.css";
import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper";
import { Label, Summary, Thumbnail } from "@nulib/clover";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "@/components/Shared/Container";
import { HeroCollection, HeroCollectionItem } from "@/lib/constants/homepage";
import Link from "next/link";
import React from "react";
interface HeroProps {
  collection: HeroCollection;
}
// Clover 4's Thumbnail has no `region` prop, so build the cropped IIIF Image
// API URL the way Clover 3 did: {service}/{region}/{width},{height}/0/default.jpg
const heroRegionSrc = (item: HeroCollectionItem) => {
  const thumbnail = item.thumbnail?.[0];
  const service = Array.isArray(thumbnail?.service)
    ? (thumbnail.service[0] as { id?: string; "@id"?: string })
    : undefined;
  const serviceId = service?.id || service?.["@id"];
  if (!item.nul_hero_region || !thumbnail || !serviceId) return undefined;
  const { width = 200, height = 200 } = thumbnail;
  return `${serviceId}/${item.nul_hero_region}/${width},${height}/0/default.jpg`;
};
const Hero: React.FC<HeroProps> = ({ collection }) => {
  return (
    <div data-dc-slot="hero" className={styles.heroStyled}>
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
              {heroRegionSrc(item) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroRegionSrc(item)} alt="" />
              ) : (
                <Thumbnail value={item} />
              )}
              <Container isFlex className={"slide-inner"}>
                <figcaption>
                  <Link href={item.homepage[0].id}>
                    <Label
                      label={item.label}
                      as="span"
                      className={"slide-label"}
                    />
                  </Link>
                  {item.summary && (
                    <Summary
                      value={item.summary}
                      as="span"
                      className={"slide-summary"}
                    />
                  )}

                  {item.seeAlso && (
                    <div className={styles.heroActions}>
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
                    </div>
                  )}
                </figcaption>
              </Container>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Hero;
