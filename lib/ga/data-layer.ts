import type { Work } from "@nulib/dcapi-types";

interface DataLayer {
  adminset?: string;
  collections?: string | null;
  creatorsContributors?: Array<string> | string;
  isLoggedIn?: boolean;
  pageTitle: string;
  rightsStatement?: string | null;
  subjects?: Array<string> | string;
  visibility?: string | null;
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

export function buildWorkDataLayer(work: Work): DataLayer {
  if (!work) return defaultDataLayer;

  const creators = work?.creator.map((creator) => creator.label);
  const contributors = work?.contributor.map(
    (contributor) => contributor.label
  );
  const creatorsContributors: string[] = [];
  if (creators && creators.length > 0) {
    creatorsContributors.push(...creators);
  }
  if (contributors && contributors.length > 0) {
    creatorsContributors.push(...contributors);
  }
  const subjects =
    work?.subject && work?.subject.length > 0
      ? work?.subject.map((subject) => subject.label)
      : [];

  const dataLayer: DataLayer = buildDataLayer({
    adminset: work?.library_unit || "",
    collections: work?.collection?.title ? work.collection.title : null,
    creatorsContributors,
    pageTitle: work?.title || "",
    rightsStatement: work?.rights_statement?.label
      ? work.rights_statement.label
      : null,
    subjects,
    visibility: work?.visibility,
  });

  return dataLayer;
}
