import { LabeledContentResource } from "@/types/components/works";
import { workManifest1 } from "./work-manifest1";

const rendering: LabeledContentResource[] = [
  {
    format: "application/pdf",
    id: "https://clickdimensions.com/links/TestPDFfile.pdf",
    label: { en: ["Test PDF"] },
    type: "Text",
  },

  {
    format: "text/plain",
    id: "https://clickdimensions.com/links/TestPDFfile2.pdf",
    label: { en: ["Transcript XYZ"] },
    type: "Text",
  },
];

export const manifest = {
  ...workManifest1,
  rendering,
};
