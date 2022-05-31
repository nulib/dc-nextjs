import { Manifest } from "@iiif/presentation-3";
import { WorkShape } from "@/types/components/works";
import { getAPIData } from "@/lib/dc-api";
import { manifestPres3Template } from "@/lib/iiif/manifest-pres3-template";

interface MetadataInput {
  label: string;
  value: string[] | string;
}
export const buildMetadataValues = (metadata: MetadataInput[]) => {
  return metadata.map(({ label, value }) => ({
    label: {
      none: [label],
    },
    value: {
      none: Array.isArray(value) ? [...value] : [value],
    },
  }));
};

export const buildPres3Manifest = async (
  work: WorkShape
): Promise<Manifest | null> => {
  const manifest = { ...manifestPres3Template };
  try {
    manifest.id = work.iiif_manifest;
    manifest.label.none = [work.title];
    manifest.summary &&
      (manifest.summary.none = work.descriptions.map(
        (description) => description
      ));
    manifest.metadata = buildMetadataValues([
      {
        label: "Contributor",
        value: [...work.contributor_labels],
      },
      {
        label: "Date",
        value: [...work.dates_created],
      },
      {
        label: "Identifier",
        value: [...work.identifiers],
      },
      {
        label: "Library Unit",
        value: work.library_unit,
      },
      {
        label: "Subjects",
        value: [...work.subject_labels],
      },
      {
        label: "Accession Number",
        value: work.accession_number,
      },
      {
        label: "Terms of Use",
        value: work.terms_of_use,
      },
    ]);
  } catch (err) {
    console.error("Error building manifest locally");
    return null;
  }
  return manifest;
};

export const getManifest = async (id: string) => {
  const manifest = await getAPIData<Manifest>({ url: id });
  return manifest;
};
