import { Manifest } from "@iiif/presentation-3";
import { WorkShape } from "@/types/components/works";

export interface WorkContextStore {
  work: WorkShape | undefined;
  manifest: Manifest | undefined;
}
