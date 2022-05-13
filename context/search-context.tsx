import { SearchContextStore, UserFacets } from "@/types/search-context";
import { ApiResponseAggregation } from "@/types/api/response";
import React from "react";

type Action =
  | {
      type: "updateAggregations";
      aggregations: ApiResponseAggregation[] | undefined;
    }
  | { type: "updateSearch"; q: string }
  | { type: "updateUserFacets"; userFacets: UserFacets };

type Dispatch = (action: Action) => void;
type State = SearchContextStore;
type SearchProviderProps = {
  children: React.ReactNode;
  initialState?: SearchContextStore;
};

const defaultState: SearchContextStore = {
  aggregations: [],
  q: "",
  userFacets: {},
};

const SearchStateContext = React.createContext<
  { searchState: State; searchDispatch: Dispatch } | undefined
>(undefined);

function searchReducer(state: State, action: Action) {
  switch (action.type) {
    case "updateAggregations": {
      return {
        ...state,
        aggregations: action.aggregations,
      };
    }
    case "updateSearch": {
      return {
        ...state,
        q: action.q,
      };
    }
    case "updateUserFacets": {
      return {
        ...state,
        userFacets: action.userFacets,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function SearchProvider({
  initialState = defaultState,
  children,
}: SearchProviderProps) {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);
  const value = { searchDispatch: dispatch, searchState: state };
  return (
    <SearchStateContext.Provider value={value}>
      {children}
    </SearchStateContext.Provider>
  );
}

function useSearchState() {
  const context = React.useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error("useSearchState must be used within a SearchProvider");
  }
  return context;
}

export { SearchProvider, useSearchState };
