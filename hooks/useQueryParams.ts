import React from "react";
import { UrlFacets } from "@/types/context/filter-context";
import { parseUrlFacets } from "@/lib/utils/facet-helpers";
import { useRouter } from "next/router";

export default function useQueryParams() {
  const { isReady, query } = useRouter();
  const [urlFacets, setUrlFacets] = React.useState<UrlFacets>({});
  const [searchTerm, setSearchTerm] = React.useState<string>();

  React.useEffect(() => {
    if (!isReady) return;

    const obj = parseUrlFacets(query);
    const q = (query.q ? query.q : "") as string;

    setUrlFacets(obj);
    setSearchTerm(q);
  }, [isReady, query]);

  return {
    searchTerm,
    urlFacets,
  };
}
