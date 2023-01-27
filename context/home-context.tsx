import React, { createContext, useEffect, useState } from "react";
import { type SearchShape } from "@/types/api/response";
import { featuredCollections } from "@/lib/constants/homepage";
import { getHomePageCollections } from "@/lib/homepage-helpers";
import { shuffle } from "@/lib/utils/array-helpers";

type HomePageContextShape = {
  featuredCollections: SearchShape[];
};

const HomePageContext = createContext<HomePageContextShape>({
  featuredCollections: [],
});

function HomeContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SearchShape[]>([]);

  useEffect(() => {
    async function getCollections() {
      const collections = await getHomePageCollections(featuredCollections);

      setData(shuffle(collections));
    }
    getCollections();
  }, []);

  return (
    <HomePageContext.Provider value={{ featuredCollections: data }}>
      {children}
    </HomePageContext.Provider>
  );
}

export { HomeContextProvider, HomePageContext };
