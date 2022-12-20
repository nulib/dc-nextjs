import { FacetsInstance } from "@/types/components/facets";
import GenericFacet from "@/components/Facets/Facet/GenericFacet";
import React from "react";

interface FacetsFacetProps {
  facet: FacetsInstance;
}

const FacetsFacet: React.FC<FacetsFacetProps> = ({ facet }) => {
  return <GenericFacet facet={facet} />;
};

export default FacetsFacet;
