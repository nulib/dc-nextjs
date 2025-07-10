import axios, { AxiosError } from "axios";

import { ChatContext } from "@/types/context/search-context";
import { DCAPI_CHAT_FEEDBACK } from "./constants/endpoints";
import { Work } from "@nulib/dcapi-types";

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
  console.log(context?.facets, "context facets in prepareQuestion");

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

export { appendHybridSearchParams, handleChatFeedbackRequest, prepareQuestion };
