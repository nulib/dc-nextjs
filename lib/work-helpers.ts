import {
  DCAPI_ENDPOINT,
  DC_API_SEARCH_URL,
  DC_URL,
} from "@/lib/constants/endpoints";

import type { Work } from "@nulib/dcapi-types";
import { apiGetRequest } from "@/lib/dc-api";
import { appendHybridSearchParams } from "./chat-helpers";
import { shuffle } from "@/lib/utils/array-helpers";

export async function getWork(id: string) {
  try {
    const response = await apiGetRequest<Work>({
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/works/${id}`,
    });
    return response;
  } catch (err) {
    console.error("Error getting the work", id);
    return null;
  }
}

export async function getWorkManifest(id: string) {
  try {
    const response = await apiGetRequest({
      url: `${DC_API_SEARCH_URL}/works/${id}?as=iiif`,
    });
    return response;
  } catch (err) {
    console.error("Error getting the work", id);
    return null;
  }
}

export interface WorkSliders {
  iiifCollectionId: string;
  customViewAll: string;
}

export function getWorkSliders(work: Work, isAI: boolean | undefined) {
  if (!work) return;

  const workSliders: WorkSliders[] = [];

  /** Collection slider */
  if (work.collection) {
    const collectionSummary = `Collection`;

    const collectionUrl = new URL(DC_API_SEARCH_URL);
    collectionUrl.searchParams.append(
      "query",
      `collection.id:"${work.collection.id}"`,
    );
    collectionUrl.searchParams.append("collectionLabel", work.collection.title);
    collectionUrl.searchParams.append("collectionSummary", collectionSummary);
    collectionUrl.searchParams.append("as", "iiif");

    const searchUrl = new URL("/search", DC_URL);
    searchUrl.searchParams.append("collection", work.collection.title);

    if (isAI) appendHybridSearchParams(searchUrl, work.collection.title);

    workSliders.push({
      iiifCollectionId: collectionUrl.toString(),
      customViewAll: searchUrl.toString(),
    });
  }

  /** More Like This */
  if (!isAI) {
    const similarUrl = new URL(`${DCAPI_ENDPOINT}/works/${work.id}/similar`);
    const searchUrl = new URL("/search", DC_URL);
    searchUrl.searchParams.append("similar", work.id);
    similarUrl.searchParams.append("collectionLabel", "More Like This");
    similarUrl.searchParams.append(
      "collectionSummary",
      `Similar to ${work.title}`,
    );
    similarUrl.searchParams.append("as", "iiif");

    workSliders.push({
      iiifCollectionId: similarUrl.toString(),
      customViewAll: searchUrl.toString(),
    });
  }

  /**
   * Metadata (Subject for now)
   * Append `2` subject-based IIIF collections
   */
  if (work.subject.length > 0) {
    const subjects = shuffle(work.subject.map((s) => s.label)).slice(0, 2);

    subjects.forEach((subject: string) => {
      const subjectUrl = new URL(DC_API_SEARCH_URL);
      subjectUrl.searchParams.append("query", `subject.label:"${subject}"`);
      subjectUrl.searchParams.append("collectionLabel", subject);
      subjectUrl.searchParams.append("collectionSummary", "Subject");
      subjectUrl.searchParams.append("as", "iiif");

      const searchUrl = new URL("/search", DC_URL);
      searchUrl.searchParams.append("subject", subject);

      if (isAI) appendHybridSearchParams(searchUrl, subject);

      workSliders.push({
        iiifCollectionId: subjectUrl.toString(),
        customViewAll: searchUrl.toString(),
      });
    });
  }

  return workSliders;
}

export function isImageType(work_type: string | null | undefined) {
  return work_type === "Image";
}

export function isPublicWork(visibility: Work["visibility"]) {
  return visibility === "Public";
}
