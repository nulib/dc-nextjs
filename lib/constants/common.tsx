export const AI_DISCLAIMER = `This is a preview of Digital Collection's semantic search tool. It uses generative AI to answer questions about the results of your natural-language search. The goal is to deliver results and rich context not possible with traditional search technologies. Occasionally search results may not be complete. Please use this as a starting point on your research journey.`;
export const AI_LOGIN_ALERT = `You must be logged in with a Northwestern NetID to use the Generative AI search feature.`;
export const AI_SEARCH_UNSUBMITTED = `What can I help you find? Try searching for "john cage scrapbooks" or "who played at the Berkeley Folk Music Festival in 1965?"`;
export const AI_TOGGLE_LABEL = "Use Generative AI";
export const AI_SYS_PROMPT_MSG = () => (
  <span className="ai-sys-prompt-msg">
    Curious how this works? Click{" "}
    <a
      href="https://github.com/nulib/dc-api-v2/blob/main/chat/src/agent/search_agent.py#:~:text=DEFAULT_SYSTEM_MESSAGE"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Learn more about the AI system prompt"
    >
      here
    </a>
    .
  </span>
);
export const AI_K_VALUE = 40;
export const SEARCH_RESULTS_PER_PAGE = 40;
