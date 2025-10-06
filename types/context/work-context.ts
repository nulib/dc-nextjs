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

export interface SanitizedWork extends Work {
  title: NonNullable<Work["title"]>;
  thumbnail: NonNullable<Work["thumbnail"]>;
}
