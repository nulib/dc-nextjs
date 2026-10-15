import styles from "@/components/Clover/SliderWrapper.module.css";
import Slider from "@samvera/clover-iiif/slider";
import type { SliderBreakpoints } from "@samvera/clover-iiif/slider";
import type { Collection } from "@iiif/presentation-3";
import { useEffect, useState } from "react";
import { gr, rem } from "@/styles/metrics";
import { width } from "@/styles/media";
const breakpoints: SliderBreakpoints = {
  [width.xxs]: {
    slidesPerGroup: 2,
    spaceBetween: rem,
  },
  [width.xs]: {
    slidesPerGroup: 2,
    spaceBetween: rem,
  },
  [width.sm]: {
    slidesPerGroup: 3,
    spaceBetween: rem,
  },
  [width.md]: {
    slidesPerGroup: 4,
    spaceBetween: rem * gr(1),
  },
  [width.lg]: {
    slidesPerGroup: 5,
    spaceBetween: rem * gr(1),
  },
  [width.xl]: {
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
  const url = collectionId.toString();
  const [resource, setResource] = useState<{
    url: string;
    collection?: Collection;
    error?: Error;
  }>();
  useEffect(() => {
    const controller = new AbortController();
    // RC.2 declares options.credentials but does not pass it to fetch.
    // Resolve the collection here to preserve authenticated cross-origin access.
    fetch(url, { credentials: "include", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok)
          throw new Error(`Unable to load slider (${response.status})`);
        const collection: Collection = await response.json();
        if (!controller.signal.aborted) setResource({ url, collection });
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setResource({ url, error });
      });
    return () => controller.abort();
  }, [url]);
  if (resource?.url !== url) return null;
  if (resource.error) throw resource.error;
  if (!resource.collection) return null;
  const collection = resource.collection;
  return (
    <div className={styles.styledSliderIIIFWrapper}>
      <Slider
        items={collection.items}
        label={collection.label}
        summary={collection.summary}
        align="start"
        options={{
          breakpoints: breakpoints,
          credentials: "include",
          customViewAll,
        }}
      />
    </div>
  );
};
export default SliderIIIFWrapper;
