import {
  Annotation,
  AnnotationBody,
  Canvas,
  ContentResource,
  Manifest,
} from "@iiif/presentation-3";

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
    if (body && body.service && body.service[0]) {
      const service = body.service[0];
      infoResponse = service?.id ?? service?.["@id"] ?? "";
    }
  }

  return infoResponse;
};

export const findCanvasIdByFileSetId = (
  manifest: Manifest,
  fileSetId: string,
): string | undefined => {
  for (const canvas of manifest.items ?? []) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = (canvas.items?.[0]?.items?.[0] as any)?.body;
    const services = Array.isArray(body?.service)
      ? body.service
      : body?.service
        ? [body.service]
        : [];
    const serviceId: string = services[0]?.id ?? services[0]?.["@id"] ?? "";
    if (serviceId.includes(fileSetId)) return canvas.id;
  }
  return undefined;
};

export const getAnnotationBodyType = (canvas: Canvas) => {
  let annotationBodyType;

  if (
    canvas.items &&
    canvas.items[0] &&
    canvas.items[0].items &&
    canvas.items[0].items[0]
  ) {
    const annotation: Annotation = canvas.items[0].items[0];
    const body = annotation.body as ContentResource;
    if (body && body.type) annotationBodyType = body.type;
  }

  return annotationBodyType;
};
