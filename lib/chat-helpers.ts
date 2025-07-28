import axios, { AxiosError } from "axios";

import { ChatContext } from "@/types/context/search-context";
import { DCAPI_CHAT_FEEDBACK } from "./constants/endpoints";
import { Work } from "@nulib/dcapi-types";
import { getFacetById } from "./utils/facet-helpers";
import { getFacetIdByField } from "./queries/facet";

function mapWorksToApiDocs(works: Work[]) {
  if (!works) {
    return [];
  }

  return works.map((d) => {
    return {
      id: d.id || "",
      title: d.title || "",
      visibility: d.visibility || "",
      work_type: d.work_type || "",
      thumbnail: d.thumbnail || "",
    };
  });
}

const prepareQuestion = (
  questionString: string,
  authToken: string,
  conversationRef: string,
  context?: ChatContext,
) => {
  return {
    auth: authToken,
    message: "chat",
    question: questionString,
    ref: conversationRef,
    docs: context?.works ? mapWorksToApiDocs(context?.works) : undefined,
    facets: context?.facets || undefined,
  };
};

async function handleChatFeedbackRequest(payload: any): Promise<{
  message?: string;
  err?: AxiosError;
}> {
  try {
    const response = await axios({
      data: payload,
      method: "post",
      url: DCAPI_CHAT_FEEDBACK,
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("Error submitting feedback", err);
    return { err: err as AxiosError };
  }
}

const appendHybridSearchParams = (url: URL, value: string) => {
  url.searchParams.append("q", value);
  url.searchParams.append("tab", "results");
  return url;
};

function createResultsMessageFromContext(context: ChatContext) {
  if (!context || !context.query) return;

  const facets = context.facets.map((facet) => {
    const facetId = Object.keys(facet)[0];
    if (facetId === "field") return facet;

    const facetField = getFacetIdByField(facetId);

    if (!facetField) return {};

    return { field: facetField, value: facet[facetId] };
  });

  let appendFilteredBy = "";

  if (facets.length > 0) {
    const facetMessages = facets.map((facet) => {
      if (!facet.field || !facet.value) return "";

      const facetLabel = getFacetById(facet.field)?.label || facet.field;
      return `'${facetLabel}: ${facet.value}'`;
    });
    appendFilteredBy = ` filtered by ${facetMessages.join(", ")}`;
  }

  return `Results for '${context.query}'${appendFilteredBy}`;
}

export {
  appendHybridSearchParams,
  createResultsMessageFromContext,
  handleChatFeedbackRequest,
  prepareQuestion,
};
