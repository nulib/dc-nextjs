import React from "react";
import { SearchAction, SearchContextStore } from "@/types/search-context";

const defaultState: SearchContextStore = {
  q: "",
};

const SearchStateContext =
  React.createContext<SearchContextStore>(defaultState);
const SearchDispatchContext =
  React.createContext<SearchContextStore>(defaultState);

function searchReducer(state: SearchContextStore, action: SearchAction) {
  switch (action.type) {
    case "updateSearch": {
      return {
        ...state,
        q: action.q,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

interface SearchProviderProps {
  initialState?: SearchContextStore;
  children: React.ReactNode;
}

const SearchProvider: React.FC<SearchProviderProps> = ({
  initialState = defaultState,
  children,
}) => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<SearchContextStore, SearchAction>
  >(searchReducer, initialState);

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider
        value={dispatch as unknown as SearchContextStore}
      >
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
};

function useSearchState() {
  const context = React.useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error("useSearchState must be used within a SearchProvider");
  }
  return context;
}

function useSearchDispatch() {
  const context = React.useContext(SearchDispatchContext);
  if (context === undefined) {
    throw new Error("useSearchDispatch must be used within a SearchProvider");
  }
  return context;
}

export { SearchProvider, useSearchState, useSearchDispatch };
