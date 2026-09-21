export const AI_DISCLAIMER = `This is a preview of Digital Collection's semantic search tool. It uses generative AI to answer questions about the results of your natural-language search. The goal is to deliver results and rich context not possible with traditional search technologies. Occasionally search results may not be complete. Please use this as a starting point on your research journey.`;
export const AI_LOGIN_ALERT = `You must be logged in with a Northwestern NetID to use the Generative AI search feature.`;
export const AI_SEARCH_UNSUBMITTED = `What can I help you find? Try searching for "john cage scrapbooks" or "who played at the Berkeley Folk Music Festival in 1965?"`;
export const AI_TOGGLE_LABEL = "AI Mode";
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
/**
 * AI provenance indicator on the work page, driven by a work's `ai_involved` /
 * `ai_provenance` keys.
 *
 * Wording note: "AI-assisted" is a deliberate umbrella covering both
 * `ai_generated` and `ai_assisted_human_modified` origins. None of this copy
 * may claim staff review — review is reported per field, from the entry's own
 * `human_oversight_level`, by `getAIStatusLabel` in `lib/ai-provenance.ts`.
 */
export const AI_PROVENANCE_LABEL_METADATA = "AI-assisted metadata";
export const AI_PROVENANCE_LABEL_TRANSCRIPTIONS = "AI-assisted transcriptions";
export const AI_PROVENANCE_LABEL_BOTH =
  "AI-assisted metadata and transcriptions";

export const AI_PROVENANCE_TOOLTIP_TRIGGER_LABEL =
  "More information about AI involvement in this item";

export const AI_PROVENANCE_TOOLTIP_INTRO = `Some information about this item was created or edited with the help of generative AI. This applies to the item's descriptive metadata and transcriptions, not to the digitized object itself.`;

export const AI_PROVENANCE_TOOLTIP_FIELDS_INTRO =
  "Descriptive Metadata fields with AI involvement:";

export const AI_PROVENANCE_TOOLTIP_CAVEAT =
  "AI-assisted content may contain errors or omissions.";

/**
 * `hasList` controls the final punctuation: the sentence introduces a list of
 * file sets when one follows, and stands alone when the lookup returned none.
 */
export const aiProvenanceTranscriptionCopy = (count: number, hasList = false) =>
  `This item includes ${count} AI-assisted ${
    count === 1 ? "transcription" : "transcriptions"
  }${hasList ? ":" : "."}`;

export const AI_K_VALUE = 40;
export const SEARCH_RESULTS_PER_PAGE = 40;
