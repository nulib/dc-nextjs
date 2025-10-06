// create layout-context to update layout state

import React from "react";

interface LayoutContextStore {
  searchFixed: boolean;
}

type Action = {
  type: "updateSearchFixed";
  searchFixed: boolean;
};
type Dispatch = (action: Action) => void;
type State = LayoutContextStore;
type LayoutProviderProps = {
  children: React.ReactNode;
  initialState?: LayoutContextStore;
};

const defaultState: LayoutContextStore = {
  searchFixed: false,
};

const LayoutStateContext = React.createContext<
  { layoutState: State; layoutDispatch: Dispatch } | undefined
>(undefined);

function layoutReducer(state: State, action: Action) {
  switch (action.type) {
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

function LayoutProvider({
  initialState = defaultState,
  children,
}: LayoutProviderProps) {
  const [state, dispatch] = React.useReducer(layoutReducer, initialState);
  const value = { layoutDispatch: dispatch, layoutState: state };
  return (
    <LayoutStateContext.Provider value={value}>
      {children}
    </LayoutStateContext.Provider>
  );
}

function useLayoutState() {
  const context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

export { LayoutProvider, useLayoutState };
