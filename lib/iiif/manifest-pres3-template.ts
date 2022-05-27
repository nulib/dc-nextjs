import { Manifest } from "@iiif/presentation-3";

/* eslint sort-keys: 0 */

export const manifestPres3Template: Manifest = {
  "@context": "http://iiif.io/api/presentation/3/context.json",
  id: "",
  type: "Manifest",
  label: {
    none: [],
  },
  summary: {
    none: [],
  },
  metadata: [],
  requiredStatement: {
    label: {
      none: ["Attribution"],
    },
    value: {
      none: ["Courtesy of Northwestern University Libraries"],
    },
  },
  rights: "http://rightsstatements.org/vocab/NoC-NC/1.0/",
  thumbnail: [],
  items: [],
};
