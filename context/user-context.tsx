import { User, UserContextStore } from "@/types/context/user";
import React from "react";

type Action = {
  type: "updateUser";
  user: User | null | undefined;
};

type Dispatch = (action: Action) => void;
type State = UserContextStore;
type UserProviderProps = {
  children: React.ReactNode;
  initialState?: UserContextStore;
};

const defaultState: UserContextStore = {
  user: null,
};

const UserStateContext = React.createContext<
  { searchState: State; searchDispatch: Dispatch } | undefined
>(undefined);

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case "updateUser": {
      return {
        ...state,
        user: action.user,
      };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function UserProvider({
  initialState = defaultState,
  children,
}: UserProviderProps) {
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  const value = { searchDispatch: dispatch, searchState: state };
  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState };
