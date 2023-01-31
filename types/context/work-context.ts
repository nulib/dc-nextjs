import { Manifest } from "@iiif/presentation-3";
import { Work } from "dcapi-types";

export interface WorkContextStore {
  work: Work | undefined;
  manifest: Manifest | undefined;
}
