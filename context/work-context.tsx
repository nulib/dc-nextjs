import { Manifest } from "@iiif/presentation-3";
import React from "react";
import type { Work } from "@nulib/dcapi-types";
import { WorkContextStore } from "@/types/context/work-context";

type Action =
  | {
      type: "updateContentState";
      contentState: any;
    }
  | {
      type: "updateManifest";
      manifest: Manifest | undefined;
    }
  | {
      type: "updateWork";
      work: Work | undefined;
    };
type Dispatch = (action: Action) => void;
type State = WorkContextStore;
type WorkProviderProps = {
  children: React.ReactNode;
  initialState?: WorkContextStore;
};

const defaultState: WorkContextStore = {
  contentState: undefined,
  manifest: undefined,
  work: undefined,
};

const WorkStateContext = React.createContext<
  { workState: State; workDispatch: Dispatch } | undefined
>(undefined);

function workReducer(state: State, action: Action) {
  switch (action.type) {
    case "updateContentState": {
      return {
        ...state,
        contentState: action.contentState,
      };
    }
    case "updateManifest": {
      return {
        ...state,
        manifest: action.manifest,
      };
    }
    case "updateWork": {
      return {
        ...state,
        work: action.work,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function WorkProvider({
  initialState = defaultState,
  children,
}: WorkProviderProps) {
  const [state, dispatch] = React.useReducer(workReducer, initialState);
  const value = { workDispatch: dispatch, workState: state };
  return (
    <WorkStateContext.Provider value={value}>
      {children}
    </WorkStateContext.Provider>
  );
}

function useWorkState() {
  const context = React.useContext(WorkStateContext);
  if (context === undefined) {
    throw new Error("useWorkState must be used within a WorkProvider");
  }
  return context;
}

export { WorkProvider, useWorkState };
