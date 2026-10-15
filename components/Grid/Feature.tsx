import styles from "@/components/Grid/Feature.module.css";
import React, { useEffect, useState } from "react";
import GridItem from "@/components/Grid/Item";
import { SearchShape } from "@/types/api/response";
interface GridFeatureProps {
  data: SearchShape[];
}
const GridFeature: React.FC<GridFeatureProps> = ({ data = [] }) => {
  const [primary, setPrimary] = useState<SearchShape>();
  const [secondary, setSecondary] = useState<SearchShape[]>([]);
  useEffect(() => {
    setPrimary(data[0]);
    setSecondary(data.slice(1, 5));
  }, [data]);
  return (
    <div className={styles.gridFeatureStyled}>
      <div className={styles.gridFeatureItems}>
        <div className={styles.gridFeaturePrimary}>
          {primary && <GridItem item={primary} isFeatured={true} />}
        </div>
        <div className={styles.gridFeatureSecondary}>
          {secondary.map((item: SearchShape) => (
            <GridItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default GridFeature;
