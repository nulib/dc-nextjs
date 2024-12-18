import axios, { AxiosError } from "axios";

import { DCAPI_CHAT_FEEDBACK } from "./constants/endpoints";

const prepareQuestion = (
  questionString: string,
  authToken: string,
  conversationRef: string,
) => {
  return {
    auth: authToken,
    message: "chat",
    question: questionString,
    ref: conversationRef,
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
