import {
  Annotation,
  AnnotationBody,
  Canvas,
  Manifest,
} from "@iiif/presentation-3";
import { WorkShape } from "@/types/components/works";
import axios from "axios";
import { convertPresentation2 } from "@iiif/parser/presentation-2";
import { getAPIData } from "@/lib/dc-api";
import { manifestPres3Template } from "@/lib/iiif/manifest-pres3-template";

interface MetadataInput {
  label: string;
  value: string[] | string;
}
export const buildMetadataValues = (metadata: MetadataInput[]) => {
  return metadata.map(({ label, value = "" }) => ({
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
  const items = (await getCanvases(work.iiif_manifest)) as Canvas[];

  try {
    manifest.id = work.iiif_manifest;
    manifest.label.none = [work.title];
    manifest.summary && (manifest.summary.none = work.abstract);
    manifest.metadata = buildMetadataValues([
      {
        label: "Contributor",
        value: work.contributor?.map((item) => item.label).join(", "),
      },
      {
        label: "Date",
        value: [work.create_date],
      },
      {
        label: "Identifier",
        value: [...work.identifier],
      },
      {
        label: "Library Unit",
        value: work.library_unit,
      },
      {
        label: "Subjects",
        value: work.subject?.map((item) => item.label).join(", "),
      },
      {
        label: "Genre",
        value: work.genre?.map((item) => item.label).join(", "),
      },
    ]);
    manifest.requiredStatement?.value.none?.push(work.terms_of_use);
    manifest.items = items;
  } catch (err) {
    console.error("Error building manifest locally", err);
    return null;
  }
  return manifest;
};

export const getManifest = async (id: string) => {
  const manifest = await getAPIData<Manifest>({ url: id });
  return manifest;
};

export const getThumbnails = async (id: string) => {
  return axios(id).then(
    (manifest) => convertPresentation2(manifest.data).items
  );
};

/**
 * temporary functionality to build presentation 3 manifest items with thumbnails
 */
export const getCanvases = async (id: string) => {
  return axios(id).then((manifest) =>
    convertPresentation2(manifest.data).items.map((item) => {
      if (!item?.thumbnail || Array.isArray(item?.thumbnail.length === 0)) {
        const infoResponse = getInfoResponse(item as Canvas);
        if (infoResponse)
          item.thumbnail = [
            {
              format: "image/jpeg",
              height: 200,
              id: `${infoResponse}/full/!200,200/0/default.jpg`,
              type: "Image",
              width: 200,
            },
          ];
      }

      return item;
    })
  );
};

export const getInfoResponse = (canvas: Canvas) => {
  let infoResponse;

  if (
    canvas.items &&
    canvas.items[0] &&
    canvas.items[0].items &&
    canvas.items[0].items[0]
  ) {
    const annotation = canvas.items[0].items[0] as Annotation;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = annotation.body as AnnotationBody as any;
    if (body && body.service && body.service[0])
      infoResponse = body.service[0]["@id"] as string;
  }

  return infoResponse;
};
