import { CollectionShape } from "@/types/components/collections";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { WorkShape } from "@/types/components/works";

const acquireLicensePage =
  "https://www.library.northwestern.edu/about/administration/policies/rights-permissions.html";

/**
 * Load default values for Google Structured Data
 */
export function loadDefaultStructuredData() {
  return {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    description:
      "Digital Collections contains thousands of items from Northwestern University Libraries. While only a fraction of materials from the Libraries' collections are represented, the site is representative of the distinction and diversity of collections from the Northwestern Government and Geographic Information collection, Herskovits Library of African Studies, Music Library, McCormick Library of Special Collections, Transportation Library, and University Archives.",
    name: "Northwestern University Libraries | Digital Collections",
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=search_term_string",
      target:
        "https://digitalcollections.library.northwestern.edu/search?q={search_term_string}",
    },
    url: "https://digitalcollections.library.northwestern.edu",
  };
}

export function loadCollectionStructuredData(
  collection: CollectionShape,
  pathname: string
) {
  const obj = {
    "@context": "https://schema.org/",
    "@type": "Collection",
    name: collection.title,
    url: `${PRODUCTION_URL}${pathname}`,
    ...(collection.description && { description: collection.description }),
    thumbnail: `${collection.representative_image?.url}/full/!300,300/0/default.jpg`,
  };

  return obj;
}

export function loadItemStructuredData(item: WorkShape, pathname: string) {
  const {
    abstract,
    contributor,
    creator,
    create_date,
    genre,
    keywords,
    modified_date,
    physical_description_material,
    rights_statement,
    thumbnail,
    subject,
    title,
    iiif_manifest,
  } = item;

  const obj = {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    contentUrl: iiif_manifest,
    image: item.representative_file_set?.url,
    ...(title && { name: title }),
    thumbnail,
    url: `${PRODUCTION_URL}${pathname}`,
    ...(subject.length > 0 && { about: subject?.map((x) => x.label) }),
    acquireLicensePage,
    ...(creator.length > 0 && {
      author: item.creator.map((x) => x.label),
    }),
    ...(subject.length > 0 && {
      contentLocation: subject
        ?.filter((x) => x.role === "GEOGRAPHICAL")
        .map((x) => accountForCommas(x.role))
        .join(", "),
    }),
    ...(contributor.length > 0 && {
      contributor: contributor.map((x) => accountForCommas(x.label)).join(", "),
    }),
    ...(create_date && {
      dateCreated: create_date,
    }),
    dateModified: modified_date,
    ...(abstract.length > 0 && {
      description: abstract?.join(" "),
    }),
    ...(genre.length > 0 && {
      genre: genre.map((x) => x.label),
    }),
    ...(keywords.length > 0 && {
      keywords: keywords?.map((x) => accountForCommas(x)).join(", "),
    }),
    ...(rights_statement && {
      license: rights_statement.id,
    }),
    ...(physical_description_material.length > 0 && {
      material: physical_description_material
        .map((x) => accountForCommas(x))
        .join(", "),
    }),
  };

  return obj;
}

/**
 * Helper function to wrap any values which include a comma, with double quotes to retain context
 * @param {string} label label value which could be something like "a label value", or "Smith, John"
 */
function accountForCommas(label: string) {
  if (!label) {
    return "";
  }
  return label.indexOf(",") > -1 ? `"${label}"` : label;
}
