export interface SearchAction {
  q: string;
  type: string;
}

export interface SearchContextStore {
  q: string;
}

export interface SearchReducer {
  action: SearchAction;
  state: SearchContextStore;
}
