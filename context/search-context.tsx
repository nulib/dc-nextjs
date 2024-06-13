import { ActiveTab, SearchContextStore } from "@/types/context/search-context";

import { ApiResponseAggregation } from "@/types/api/response";
import React from "react";
import { Work } from "@nulib/dcapi-types";

type Action =
  | { type: "updateActiveTab"; activeTab: ActiveTab }
  | {
      type: "updateAggregations";
      aggregations: ApiResponseAggregation | undefined;
    }
  | {
      type: "updateChat";
      chat: {
        answer: string;
        documents: Work[];
        question: string;
      };
    }
  | { type: "updateSearch"; q: string }
  | { type: "updateSearchFixed"; searchFixed: boolean };

type Dispatch = (action: Action) => void;
type State = SearchContextStore;
type SearchProviderProps = {
  children: React.ReactNode;
  initialState?: SearchContextStore;
};

const defaultState: SearchContextStore = {
  activeTab: "results",
  aggregations: {},
  chat: {
    answer: "",
    documents: [],
    question: "",
  },
  searchFixed: false,
};

const SearchStateContext = React.createContext<
  { searchState: State; searchDispatch: Dispatch } | undefined
>(undefined);

function searchReducer(state: State, action: Action) {
  switch (action.type) {
    case "updateActiveTab": {
      return {
        ...state,
        activeTab: action.activeTab,
      };
    }
    case "updateAggregations": {
      return {
        ...state,
        aggregations: action.aggregations,
      };
    }
    case "updateChat": {
      return {
        ...state,
        chat: action.chat,
      };
    }
    case "updateSearch": {
      return {
        ...state,
        q: action.q,
      };
    }
    case "updateSearchFixed": {
      return {
        ...state,
        searchFixed: action.searchFixed,
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

export { SearchProvider, defaultState, useSearchState };
