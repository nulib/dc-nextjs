import styles from "@/components/Clover/SliderWrapper.module.css";
import { CLOVER_REQUEST } from "@/components/Clover/clover-request";
import { Items } from "@nulib/clover";
import type { Collection } from "@iiif/presentation-3";
import { useEffect, useMemo, useState } from "react";

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
    // Fetch here (rather than handing Clover the URL) so a failed request
    // still reaches the page's error boundary and stale requests are aborted.
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

  const collection = resource?.url === url ? resource.collection : undefined;
  const iiifContent = useMemo(() => {
    if (!collection) return undefined;
    return {
      ...collection,
      // Clover 3.x rendered nested collections and DC hid them with CSS;
      // Clover 4 items carry no type attribute, so drop them here instead.
      items: collection.items.filter((item) => item.type !== "Collection"),
      // Clover 4's standalone Items links the resource's first homepage as
      // "View all" (Clover 3.x's options.customViewAll).
      homepage: [
        {
          id: customViewAll,
          type: "Text",
          format: "text/html",
          label: collection.label,
        },
      ],
    };
  }, [collection, customViewAll]);

  if (resource?.url !== url) return null;
  if (resource.error) throw resource.error;
  if (!iiifContent) return null;

  return (
    <div className={styles.styledSliderIIIFWrapper}>
      <Items
        layout="slider"
        iiifContent={iiifContent}
        request={CLOVER_REQUEST}
      />
    </div>
  );
};

export default SliderIIIFWrapper;
