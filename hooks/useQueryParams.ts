import { parseUrlFacets } from "@/lib/utils/facet-helpers";
import { useRouter } from "next/router";

export default function useQueryParams() {
  const { query } = useRouter();

  const { q = "" } = query;
  const searchTerm = Array.isArray(q) ? q.join(" ") : q;
  const urlFacets = parseUrlFacets(query);

  return {
    searchTerm,
    urlFacets,
  };
}
