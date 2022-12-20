import React from "react";
import { UrlFacets } from "@/types/context/filter-context";
import { parseUrlFacets } from "@/lib/utils/facet-helpers";
import { useRouter } from "next/router";

export default function useQueryParams() {
  const router = useRouter();
  const [urlFacets, setUrlFacets] = React.useState<UrlFacets>({});

  React.useEffect(() => {
    const obj = parseUrlFacets(router.query);
    setUrlFacets(obj);
  }, [router.query]);

  return { urlFacets };
}
