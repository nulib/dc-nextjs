import { Annotation, AnnotationBody, Canvas } from "@iiif/presentation-3";

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
