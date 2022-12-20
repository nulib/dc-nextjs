import {
  DCAPI_ENDPOINT,
  DC_API_SEARCH_URL,
  DC_URL,
} from "@/lib/constants/endpoints";
import { sample, shuffle } from "@/lib/utils/array-helpers";
import { CollectionShape } from "@/types/components/collections";
import { HeroCollection } from "@/lib/constants/homepage";
import { WorkShape } from "@/types/components/works";

export const getRelatedCollections = (work: WorkShape) => {
  if (!work) return;

  let related = [];

  /**
   * Append `2` subject based IIIF collections
   */
  if (work.subject.length > 0) {
    const subjects = shuffle([work?.subject.map((s) => s.label)]).filter(
      (label: string, index: number) => index < 2 && label
    )[0];

    subjects.forEach((subject: string) => {
      related.push(
        `${DC_API_SEARCH_URL}?query=subject.label:"${subject}"&collectionLabel=${subject}&collectionSummary=Subject&as=iiif`
      );
    });
  }

  /**
   * Append genre based IIIF collection
   */
  if (work.genre.length > 0) {
    const genre = sample(work?.genre);
    genre &&
      related.push(
        `${DC_API_SEARCH_URL}?query=genre.label:"${genre.label}"&collectionLabel=${genre.label}&collectionSummary=Genre&as=iiif`
      );
  }

  /**
   * Add some variance and shuffle the deck
   */
  related = shuffle(related);

  /**
   * Add named collection based IIIF collection to top of related array
   */
  const collection = work?.collection?.title;
  related.unshift(
    `${DC_API_SEARCH_URL}?query=collection.title.keyword:"${collection}"&collectionLabel=${collection}&collectionSummary=Collection&as=iiif`
  );

  /**
   * Add "More Like This" similar slider to top of related array
   */
  const similarLabel = `Similar to ${work.title}`;
  related.unshift(
    `${DCAPI_ENDPOINT}/works/${work.id}/similar?collectionLabel=More Like This&collectionSummary=${similarLabel}&as=iiif`
  );

  return related;
};

export const getHeroCollection = (collection: CollectionShape) => {
  const { id, finding_aid_url, representative_image, title } = collection;

  const thumbnailId = representative_image.url
    ? `${representative_image.url}/full/1200,/0/default.jpg`
    : "";

  const appendSeeAlso = (search: string, findingAid: string | null) => {
    const seeAlso = [
      {
        id: search,
        label: { none: ["View this Collection"] },
        type: "Text",
      },
    ];

    if (findingAid)
      seeAlso.push({
        id: findingAid,
        label: { none: ["View Finding Aid"] },
        type: "Text",
      });

    return seeAlso;
  };

  const searchUrl = `${DC_URL}/search?q=${id}`;

  return {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    id: "https://devbox.library.northwestern.edu:3000/collection.json",
    items: [
      {
        homepage: [
          {
            id: `${DC_URL}/collections/${id}`,
            type: "Text",
          },
        ],
        id: `${DCAPI_ENDPOINT}`,
        label: { none: [title] },
        seeAlso: appendSeeAlso(searchUrl, finding_aid_url),
        thumbnail: [
          {
            format: "image/jpeg",
            height: 1200,
            id: thumbnailId,
            type: "Image",
            width: 1200,
          },
        ],
        type: "Collection",
      },
    ],
    label: {
      none: [title],
    },
    type: "Collection",
  } as HeroCollection;
};
