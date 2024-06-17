import { ObjectLiteral, OpenGraphData } from "@/types/index";
import { isImageType, isPublicWork } from "@/lib/work-helpers";

import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import type { Work } from "@nulib/dcapi-types";
import { overviewThumbnails } from "@/lib/constants/homepage";

export const defaultOpenGraphImage = overviewThumbnails[0][0].id;

export const defaultOpenGraphData: OpenGraphData = {
  "og:description":
    "Explore digital resources from the Northwestern University Library collections – including letters, photographs, diaries, maps, and audiovisual materials - as well as licensed art historical images for teaching and reference.",
  "og:image": defaultOpenGraphImage,
  "og:image:secure_url": defaultOpenGraphImage,
  "og:site_name": "Digital Collections - Northwestern University Libraries",
  "og:title": "Digital Collections - Northwestern University Libraries",
  "og:type": "website",
  "og:url": PRODUCTION_URL,
};

export function buildWorkDescription(work: Work | null) {
  let ogDescription = "";
  if (work?.description && work.description.length > 0) {
    ogDescription = `${work.description.join(" ")}`;
  }
  return ogDescription;
}

export function buildWorkOpenGraphData(
  work: Work | null,
): ObjectLiteral | OpenGraphData {
  if (!work) return {};

  const ogTitle = work?.title ? work.title : work?.accession_number;
  const isPublic = isPublicWork(work?.visibility);
  const imageUrl =
    isPublic && isImageType(work?.work_type)
      ? work?.representative_file_set?.url
        ? `${work?.representative_file_set.url}/full/1200,630/0/default.jpg`
        : ""
      : work?.thumbnail;

  let ogDescription = buildWorkDescription(work);
  if (work?.terms_of_use) {
    ogDescription += ` - ${work?.terms_of_use}`;
  }

  const openGraphData = !work
    ? {}
    : {
        "og:description": ogDescription,
        "og:image": imageUrl,
        ...(isPublic && { "og:image:height": "630" }),
        "og:image:secure_url": imageUrl,
        ...(isPublic && { "og:image:width": "1200" }),
        "og:title": `${ogTitle}`,
        "og:type": "website",
        "og:url": `${PRODUCTION_URL}/items/${work.id}`,
      };

  return openGraphData;
}
