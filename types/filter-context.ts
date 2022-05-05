export interface FilterContextStore {
  userFacetsUnsubmitted: UserFacetsUnsubmitted;
}

export interface UserFacetsUnsubmitted {
  [key: string]: string[];
}
