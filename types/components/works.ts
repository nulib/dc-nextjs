import {
  ContentResource,
  ExternalWebResource,
  InternationalString,
  Manifest,
  ResourceProvider,
} from "@iiif/presentation-3";

export type LabeledContentResource = ContentResource & {
  label?: InternationalString;
};

export interface LabeledExternalResource extends ExternalWebResource {
  label: InternationalString;
}

export interface NULWorkManifest
  extends Omit<Manifest, "seeAlso" | "homepage" | "provider" | "rendering"> {
  homepage?: LabeledContentResource[];
  provider?: ProviderWithCustomHomepage[];
  rendering?: LabeledContentResource[];
  seeAlso?: LabeledContentResource[];
}

type ProviderWithCustomHomepage = Omit<ResourceProvider, "homepage"> & {
  homepage: LabeledExternalResource[];
};

export interface WorkMetadata {
  label: string;
  searchParam?: string;
}
