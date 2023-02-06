import { Manifest } from "@iiif/presentation-3";
import { type Work } from "@nulib/dcapi-types";

export interface WorkContextStore {
  work: Work | undefined;
  manifest: Manifest | undefined;
}
