export interface SearchContextStore {
  q: string;
  userFacets: UserFacets;
}

export interface UserFacets {
  [key: string]: string[];
}
