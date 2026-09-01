import type { Collection, Work } from "@nulib/dcapi-types";
import type { Manifest } from "@iiif/presentation-3";
import type {
  CollectionListShape,
  WorkTypeCountMap,
} from "@/lib/collection-helpers";
import type { SearchResultsState } from "@/types/components/search";
import type { ToolDefinition } from "@/hooks/useWebMcpTool";
import type { UrlFacets } from "@/types/context/filter-context";
import { CONTENT_SEARCH_PARAM } from "@/lib/constants/works";
import useWebMcpTool from "@/hooks/useWebMcpTool";
import { useRouter } from "next/router";
import { useWorkState } from "@/context/work-context";

const NO_INPUT_SCHEMA = {
  type: "object",
  properties: {},
  additionalProperties: false,
};

const SEARCH_INPUT_SCHEMA = {
  type: "object",
  properties: {
    query: {
      type: "string",
      minLength: 1,
      maxLength: 300,
      description: "Keywords or a natural-language description to search for.",
    },
  },
  required: ["query"],
  additionalProperties: false,
};

const FILTER_INPUT_SCHEMA = {
  type: "object",
  properties: {
    query: {
      type: "string",
      maxLength: 200,
      description:
        "Text that collection titles must contain. Use an empty string to clear the filter.",
    },
  },
  required: ["query"],
  additionalProperties: false,
};

const SEARCH_WORKS_TOOL: ToolDefinition = {
  name: "search_works",
  title: "Search works",
  description:
    "Open Digital Collections search results for the requested keywords. This changes the page the user is viewing.",
  inputSchema: SEARCH_INPUT_SCHEMA,
  annotations: { readOnlyHint: false, untrustedContentHint: false },
};

const GET_SEARCH_RESULTS_TOOL: ToolDefinition = {
  name: "get_search_results",
  title: "Get current search results",
  description:
    "Read the query, filters, pagination, and first results currently shown on the Digital Collections search page.",
  inputSchema: NO_INPUT_SCHEMA,
  annotations: { readOnlyHint: true, untrustedContentHint: true },
};

const GET_COLLECTIONS_TOOL: ToolDefinition = {
  name: "get_collections",
  title: "Get visible collections",
  description:
    "Read the collection titles currently matching the filter on the All Collections page.",
  inputSchema: NO_INPUT_SCHEMA,
  annotations: { readOnlyHint: true, untrustedContentHint: true },
};

const FILTER_COLLECTIONS_TOOL: ToolDefinition = {
  name: "filter_collections",
  title: "Filter collections",
  description:
    "Filter the All Collections page by collection title so the user can inspect the matching collections.",
  inputSchema: FILTER_INPUT_SCHEMA,
  annotations: { readOnlyHint: false, untrustedContentHint: false },
};

const GET_CURRENT_COLLECTION_TOOL: ToolDefinition = {
  name: "get_current_collection",
  title: "Get current collection",
  description:
    "Read the metadata, subjects, and work counts for the collection currently open on the page.",
  inputSchema: NO_INPUT_SCHEMA,
  annotations: { readOnlyHint: true, untrustedContentHint: true },
};

const SEARCH_CURRENT_COLLECTION_TOOL: ToolDefinition = {
  name: "search_current_collection",
  title: "Search current collection",
  description:
    "Open search results limited to the collection currently on the page. This changes the page the user is viewing.",
  inputSchema: SEARCH_INPUT_SCHEMA,
  annotations: { readOnlyHint: false, untrustedContentHint: false },
};

const GET_CURRENT_WORK_TOOL: ToolDefinition = {
  name: "get_current_work",
  title: "Get current work",
  description:
    "Read authorized metadata and the selected canvas for the work currently open in the viewer.",
  inputSchema: NO_INPUT_SCHEMA,
  annotations: { readOnlyHint: true, untrustedContentHint: true },
};

const SEARCH_WITHIN_WORK_TOOL: ToolDefinition = {
  name: "search_within_work",
  title: "Search within current work",
  description:
    "Search transcripts, captions, or OCR within the work currently open in the viewer and report how many annotations matched. This updates the viewer.",
  inputSchema: SEARCH_INPUT_SCHEMA,
  annotations: { readOnlyHint: false, untrustedContentHint: false },
};

const SHOW_SIMILAR_WORKS_TOOL: ToolDefinition = {
  name: "show_similar_works",
  title: "Show similar works",
  description:
    "Open search results containing works similar to the work currently on the page. This changes the page.",
  inputSchema: NO_INPUT_SCHEMA,
  annotations: { readOnlyHint: false, untrustedContentHint: false },
};

interface SearchInput extends Record<string, unknown> {
  query: string;
}

const clip = (value: unknown, maxLength = 240) => {
  if (typeof value !== "string") return undefined;
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized) return undefined;
  return normalized.length <= maxLength
    ? normalized
    : `${normalized.slice(0, maxLength - 1)}…`;
};

const labelsFrom = (value: unknown, limit = 5) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return clip(item, 100);
      if (item && typeof item === "object" && "label" in item) {
        return clip(item.label, 100);
      }
      return undefined;
    })
    .filter((item): item is string => Boolean(item))
    .slice(0, limit);
};

const requireQuery = (input: SearchInput, allowEmpty = false) => {
  if (typeof input.query !== "string") {
    throw new TypeError("query must be a string");
  }
  const query = input.query.trim();
  if (!allowEmpty && !query) throw new TypeError("query cannot be empty");
  return query;
};

const throwIfAborted = (signal: AbortSignal) => {
  if (signal.aborted)
    throw new DOMException("Tool call canceled", "AbortError");
};

interface ContentSearchService {
  id?: string;
  type?: string;
}

const contentSearchServiceUrl = (manifest: Manifest | undefined) => {
  const service = (
    manifest as unknown as {
      service?: ContentSearchService | ContentSearchService[];
    }
  )?.service;
  const services = Array.isArray(service) ? service : service ? [service] : [];
  return services.find(({ id, type }) => id && type === "SearchService2")?.id;
};

const contentSearchMatchCount = async (
  manifest: Manifest | undefined,
  query: string,
  signal: AbortSignal,
) => {
  const serviceId = contentSearchServiceUrl(manifest);
  if (!serviceId) return undefined;

  const url = new URL(serviceId);
  url.searchParams.set("q", query);
  const response = await fetch(url, { credentials: "include", signal });
  if (!response.ok) {
    throw new Error(`Content search failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    items?: unknown[];
    resources?: unknown[];
  };
  return (data.items || data.resources || []).length;
};

const itemUrl = (id: unknown) =>
  typeof id === "string" ? `${window.location.origin}/items/${id}` : undefined;

const compactFilters = (filters: UrlFacets) =>
  Object.fromEntries(
    Object.entries(filters)
      .slice(0, 8)
      .map(([name, values]) => [
        name,
        (Array.isArray(values) ? values : [values])
          .filter((value): value is string => typeof value === "string")
          .slice(0, 3)
          .map((value) => clip(value, 80)),
      ]),
  );

export function SiteWebMcpTools() {
  const router = useRouter();

  useWebMcpTool<SearchInput>(SEARCH_WORKS_TOOL, async (input, { signal }) => {
    const query = requireQuery(input);
    throwIfAborted(signal);
    await router.push({ pathname: "/search", query: { q: query } });
    return {
      query,
      page: "/search",
      status: "Search results are now visible.",
    };
  });

  return null;
}

interface SearchPageWebMcpToolsProps {
  filters: UrlFacets;
  query?: string;
  results: SearchResultsState;
}

export function SearchPageWebMcpTools({
  filters,
  query,
  results,
}: SearchPageWebMcpToolsProps) {
  useWebMcpTool(GET_SEARCH_RESULTS_TOOL, (_input, { signal }) => {
    throwIfAborted(signal);
    const response = results.data;

    return {
      query: query || "",
      filters: compactFilters(filters),
      status: results.loading ? "loading" : results.error ? "error" : "ready",
      error: clip(results.error, 200),
      page: response?.pagination.current_page,
      totalPages: response?.pagination.total_pages,
      totalResults: response?.pagination.total_hits ?? 0,
      results: (response?.data || []).slice(0, 5).map((work) => ({
        id: work.id,
        title: clip(work.title || work.accession_number, 120),
        collection: clip(work.collection?.title, 100),
        type: work.work_type,
        url: itemUrl(work.id),
      })),
    };
  });

  return null;
}

interface CollectionListWebMcpToolsProps {
  collections: CollectionListShape[];
  filter: string;
  onFilter: (query: string) => void;
}

export function CollectionListWebMcpTools({
  collections,
  filter,
  onFilter,
}: CollectionListWebMcpToolsProps) {
  useWebMcpTool(GET_COLLECTIONS_TOOL, (_input, { signal }) => {
    throwIfAborted(signal);
    return {
      filter,
      matchCount: collections.length,
      collections: collections.slice(0, 6).map((collection) => ({
        id: collection.id,
        title: clip(collection.title, 120),
        totalWorks: collection.totalWorks ?? 0,
        url: `${window.location.origin}/collections/${collection.id}`,
      })),
    };
  });

  useWebMcpTool<SearchInput>(FILTER_COLLECTIONS_TOOL, (input, { signal }) => {
    const query = requireQuery(input, true);
    throwIfAborted(signal);
    onFilter(query);
    return {
      filter: query,
      status: query
        ? "The visible collection list is filtered."
        : "The collection filter is cleared.",
    };
  });

  return null;
}

interface CollectionPageWebMcpToolsProps {
  collection: Collection;
  subjects: Array<{ key: string; doc_count: number }>;
  workTypeCounts: WorkTypeCountMap | null;
}

export function CollectionPageWebMcpTools({
  collection,
  subjects,
  workTypeCounts,
}: CollectionPageWebMcpToolsProps) {
  const router = useRouter();

  useWebMcpTool(GET_CURRENT_COLLECTION_TOOL, (_input, { signal }) => {
    throwIfAborted(signal);
    return {
      id: collection.id,
      title: clip(collection.title, 160),
      description: clip(collection.description, 420),
      visibility: collection.visibility,
      totalWorks: workTypeCounts?.totalWorks ?? 0,
      workTypes: {
        image: workTypeCounts?.totalImage ?? 0,
        audio: workTypeCounts?.totalAudio ?? 0,
        video: workTypeCounts?.totalVideo ?? 0,
      },
      topSubjects: subjects.slice(0, 6).map(({ key, doc_count }) => ({
        subject: clip(key, 100),
        works: doc_count,
      })),
      url: window.location.href,
    };
  });

  useWebMcpTool<SearchInput>(
    SEARCH_CURRENT_COLLECTION_TOOL,
    async (input, { signal }) => {
      const query = requireQuery(input);
      throwIfAborted(signal);
      await router.push({
        pathname: "/search",
        query: { q: query, collection: collection.title },
      });
      return {
        query,
        collection: collection.title,
        status: "Scoped search results are now visible.",
      };
    },
  );

  return null;
}

const selectedCanvasId = (
  contentState: ReturnType<typeof useWorkState>["workState"]["contentState"],
) => {
  const target = contentState?.json?.target as
    | { source?: string | { id?: string } }
    | undefined;
  return typeof target?.source === "string"
    ? target.source
    : target?.source?.id;
};

const summarizeWork = (work: Work, canvasId?: string) => ({
  id: work.id,
  title: clip(work.title || work.accession_number, 160),
  collection: work.collection
    ? { id: work.collection.id, title: clip(work.collection.title, 120) }
    : undefined,
  type: work.work_type,
  dateCreated: labelsFrom(work.date_created),
  creators: labelsFrom(work.creator),
  subjects: labelsFrom(work.subject, 6),
  description: clip(work.description?.join(" "), 360),
  rights: clip(work.rights_statement?.label, 160),
  selectedCanvas: canvasId,
  url: window.location.href,
});

interface WorkPageWebMcpToolsProps {
  enabled: boolean;
}

export function WorkPageWebMcpTools({ enabled }: WorkPageWebMcpToolsProps) {
  const router = useRouter();
  const { workState } = useWorkState();
  const { contentState, manifest, work } = workState;
  const toolsEnabled = enabled && Boolean(work);

  useWebMcpTool(
    GET_CURRENT_WORK_TOOL,
    (_input, { signal }) => {
      throwIfAborted(signal);
      if (!work) throw new Error("The current work is not loaded.");
      return summarizeWork(work, selectedCanvasId(contentState));
    },
    toolsEnabled,
  );

  useWebMcpTool<SearchInput>(
    SEARCH_WITHIN_WORK_TOOL,
    async (input, { signal }) => {
      const query = requireQuery(input);
      throwIfAborted(signal);
      const matchCount = await contentSearchMatchCount(manifest, query, signal);
      if (matchCount === undefined) {
        return {
          query,
          matchCount: 0,
          searchAvailable: false,
          status: "This work does not provide a content-search service.",
        };
      }

      const nextQuery = { ...router.query };
      delete nextQuery.q;
      nextQuery[CONTENT_SEARCH_PARAM] = query;
      await router.replace({ query: nextQuery }, undefined, { shallow: true });
      return {
        query,
        matchCount,
        searchAvailable: true,
        status:
          matchCount === 0
            ? "The viewer Search panel is open; no transcript, caption, or OCR matches were found in this work."
            : `The viewer Search panel is open with ${matchCount} matching annotation${matchCount === 1 ? "" : "s"}.`,
      };
    },
    toolsEnabled,
  );

  useWebMcpTool(
    SHOW_SIMILAR_WORKS_TOOL,
    async (_input, { signal }) => {
      if (!work) throw new Error("The current work is not loaded.");
      throwIfAborted(signal);
      await router.push({ pathname: "/search", query: { similar: work.id } });
      return {
        workId: work.id,
        status: "Similar works are now visible on the search page.",
      };
    },
    toolsEnabled,
  );

  return null;
}

export {
  FILTER_COLLECTIONS_TOOL,
  GET_COLLECTIONS_TOOL,
  GET_CURRENT_COLLECTION_TOOL,
  GET_CURRENT_WORK_TOOL,
  GET_SEARCH_RESULTS_TOOL,
  SEARCH_CURRENT_COLLECTION_TOOL,
  SEARCH_WITHIN_WORK_TOOL,
  SEARCH_WORKS_TOOL,
  SHOW_SIMILAR_WORKS_TOOL,
};
