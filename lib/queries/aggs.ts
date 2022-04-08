import { FACETS, FacetsGroup } from "lib/facets";

export const buildAggs = (facets: FacetsGroup[]) => {
  const aggs: any = {};

  facets.forEach((groups) => {
    groups.facets.forEach((facet) => {
      const terms = Object.create({});
      terms.field = facet.field;
      terms.size = 20;
      terms.order = {
        _count: "desc",
      };

      aggs[facet.id] = Object.create({});
      aggs[facet.id].terms = terms;
    });
  });

  return aggs;
};

export const aggs = {
  aggs: buildAggs(FACETS),
};
