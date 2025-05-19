import { Annotation, Manifest } from "@iiif/presentation-3";

import type { Work } from "@nulib/dcapi-types";

export interface WorkContextStore {
  contentState?: {
    encoded: string;
    json: Annotation;
  };
  manifest: Manifest | undefined;
  work: Work | undefined;
}
