import { ObjectLiteral, OpenGraphData } from "@/types/index";
import { isImageType, isPublicWork } from "@/lib/work-helpers";

import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { Work } from "dcapi-types";
import { overviewThumbnails } from "@/lib/constants/homepage";

export const defaultOpenGraphImage = overviewThumbnails[0][0].id;

export const defaultOpenGraphData: OpenGraphData = {
  "og:description":
    "Enrich your research with primary sources. Explore millions of high-quality primary sources and images from around the world, including artworks, maps, photographs, and more.",
  "og:image": defaultOpenGraphImage,
  "og:image:secure_url": defaultOpenGraphImage,
  "og:site_name": "Digital Collections - Libraries - Northwestern University",
  "og:title": "Digital Collections - Libraries - Northwestern University",
  "og:type": "website",
  "og:url": PRODUCTION_URL,
};

export function buildWorkOpenGraphData(
  work: Work | null
): ObjectLiteral | OpenGraphData {
  if (!work) return {};

  const ogTitle = work?.title ? work.title : work?.accession_number;
  const isPublic = isPublicWork(work?.visibility);
  const imageUrl =
    isPublic && isImageType(work?.work_type)
      ? `${work?.representative_file_set.url}/full/1200,630/0/default.jpg`
      : work?.thumbnail;

  let ogDescription = "";
  if (work?.description && work.description.length > 0) {
    ogDescription = `${work.description.join(" ")} - `;
  }
  if (work?.terms_of_use) {
    ogDescription += work?.terms_of_use;
  }

  const openGraphData = !work
    ? {}
    : {
      "og:description": ogDescription,
      "og:image": imageUrl,
      ...(isPublic && { "og:image:height": "630" }),
      "og:image:secure_url": imageUrl,
      ...(isPublic && { "og:image:width": "1200" }),
      "og:site_name": `${ogTitle} - Digital Collections - Libraries - Northwestern University`,
      "og:title": `${ogTitle} - Digital Collections - Libraries - Northwestern University`,
      "og:type": "website",
      "og:url": `${PRODUCTION_URL}/items/${work.id}`,
    };

  return openGraphData;
}
