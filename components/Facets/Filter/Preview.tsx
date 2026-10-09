import styles from "@/components/Facets/Filter/Preview.module.css";
import Figure from "@/components/Figure/Figure";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";
import React from "react";
import { SearchShape } from "@/types/api/response";
interface PreviewProps {
  items: SearchShape[];
}
const Preview: React.FC<PreviewProps> = ({ items }) => {
  return (
    <div className={styles.styledPreview}>
      <Heading as="h3">Preview Results</Heading>
      <ul className={styles.previewList}>
        {items.map((item) => {
          return (
            <li
              key={item.id}
              data-testid="facets-filter-preview-item"
              className={styles.previewItem}
            >
              <Link href={`/items/${item.id}`}>
                <Figure
                  data={{
                    aspectRatio: 1,
                    src: item.thumbnail || "",
                    supplementalInfo: item.work_type,
                    title: item.title || "",
                  }}
                  orientation="horizontal"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Preview;
