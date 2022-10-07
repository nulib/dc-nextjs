interface DataLayer {
  adminset?: string;
  collections?: string;
  creatorsContributors?: Array<string>;
  isLoggedIn?: boolean;
  pageTitle: string;
  rightsStatement?: string;
  subjects?: Array<string>;
  visibility?: string;
}

const defaultDataLayer = {
  adminset: "",
  collections: "",
  creatorsContributors: "",
  isLoggedIn: false,
  pageTitle: "",
  rightsStatement: "",
  subjects: "",
  visibility: "",
};

export function buildDataLayer(obj: DataLayer) {
  return {
    ...defaultDataLayer,
    ...obj,
  };
}
