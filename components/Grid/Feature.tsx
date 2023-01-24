import {
  GridFeatureItems,
  GridFeaturePrimary,
  GridFeatureSecondary,
  GridFeatureStyled,
} from "@/components/Grid/Feature.styled";
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
    <GridFeatureStyled>
      <GridFeatureItems>
        <GridFeaturePrimary>
          {primary && <GridItem item={primary} isFeatured={true} />}
        </GridFeaturePrimary>
        <GridFeatureSecondary>
          {secondary.map((item: SearchShape) => (
            <GridItem item={item} key={item.id} />
          ))}
        </GridFeatureSecondary>
      </GridFeatureItems>
    </GridFeatureStyled>
  );
};

export default GridFeature;
