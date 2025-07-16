import React from "react";
import { SearchContextStore } from "@/types/context/search-context";

type Action =
  | {
      type: "updateConversation";
      conversation: SearchContextStore["conversation"];
    }
  | {
      type: "updatePanel";
      panel: {
        interstitial?: string;
        open: boolean;
        query?: string;
      };
    }
  | { type: "updateSearch"; q: string }
  | { type: "updateSearchCollection"; searchCollection?: string }
  | { type: "updateSearchFixed"; searchFixed: boolean };

type Dispatch = (action: Action) => void;
type State = SearchContextStore;
type SearchProviderProps = {
  children: React.ReactNode;
  initialState?: SearchContextStore;
};

const defaultState: SearchContextStore = {
  conversation: {
    ref: undefined,
    initialQuestion: "",
    turns: [],
  },
  panel: {
    interstitial: undefined,
    open: false,
    query: undefined,
  },
  searchCollection: undefined,
  searchFixed: false,
};

const SearchStateContext = React.createContext<
  { searchState: State; searchDispatch: Dispatch } | undefined
>(undefined);

function searchReducer(state: State, action: Action) {
  switch (action.type) {
    case "updateConversation": {
      console.log("Updating conversation", action.conversation);
      return {
        ...state,
        conversation: action.conversation,
      };
    }
    case "updateSearch": {
      return {
        ...state,
        q: action.q,
      };
    }
    case "updateSearchCollection": {
      return {
        ...state,
        searchCollection: action.searchCollection,
      };
    }
    case "updateSearchFixed": {
      return {
        ...state,
        searchFixed: action.searchFixed,
      };
    }
    case "updatePanel": {
      return {
        ...state,
        panel: action.panel,
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
