import {
  FilterContextStore,
  UserFacetsUnsubmitted,
} from "@/types/filter-context";
import React from "react";

type Action = {
  type: "addUserFacet" | "removeUserFacet";
  userFacetsUnsubmitted: UserFacetsUnsubmitted;
};
type Dispatch = (action: Action) => void;
type State = FilterContextStore;
type FilterProviderProps = {
  children: React.ReactNode;
  initialState?: FilterContextStore;
};

const defaultState: FilterContextStore = {
  userFacetsUnsubmitted: {},
};

const FilterStateContext = React.createContext<
  { filterState: State; filterDispatch: Dispatch } | undefined
>(undefined);

function filterReducer(state: State, action: Action) {
  switch (action.type) {
    case "addUserFacet": {
      return {
        ...state,
        userFacetsUnsubmitted: action.userFacetsUnsubmitted,
      };
    }
    case "removeUserFacet": {
      return {
        ...state,
        userFacetsUnsubmitted: action.userFacetsUnsubmitted,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function FilterProvider({
  initialState = defaultState,
  children,
}: FilterProviderProps) {
  const [state, dispatch] = React.useReducer(filterReducer, initialState);
  const value = { filterDispatch: dispatch, filterState: state };
  return (
    <FilterStateContext.Provider value={value}>
      {children}
    </FilterStateContext.Provider>
  );
}

function useFilterState() {
  const context = React.useContext(FilterStateContext);
  if (context === undefined) {
    throw new Error("useFilterState must be used within a FilterProvider");
  }
  return context;
}

export { FilterProvider, useFilterState };
