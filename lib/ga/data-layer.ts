interface DataLayer {
  adminset?: string;
  collections?: string | null;
  creatorsContributors?: Array<string>;
  isLoggedIn?: boolean;
  pageTitle: string;
  rightsStatement?: string | null;
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
