import { sample, shuffle } from "@/lib/utils/array-helpers";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
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
    );
    related.push(
      ...subjects.map(
        (subject: string) =>
          `${DC_API_SEARCH_URL}?query=subject:"${subject}" AND NOT id:"${work.id}"&collectionLabel=${subject}&collectionSummary=Subject&as=iiif`
      )
    );
  }

  /**
   * Append genre based IIIF collection
   */
  if (work.genre.length > 0) {
    const genre = sample(work?.genre[0].label);
    genre &&
      related.push(
        `${DC_API_SEARCH_URL}?query=descriptiveMetadata.genre.term.label.keyword:"${genre}" AND NOT id:"${work.id}"&collectionLabel=${genre}&collectionSummary=Genre&as=iiif`
      );
  }

  /**
   * Append work type IIIF collection
   */
  const type = work?.work_type;
  type &&
    related.push(
      `${DC_API_SEARCH_URL}?query=workType.label.keyword:"${type}" AND NOT id:"${work.id}"&collectionLabel=${type}&collectionSummary=Work Type&as=iiif`
    );

  /**
   * Add some variance and shuffle the deck
   */
  related = shuffle(related);

  /**
   * Add named collection based IIIF collection to top of related array
   */
  const collection = work?.collection?.title;
  related.unshift(
    `${DC_API_SEARCH_URL}?query=collection.title.keyword:"${collection}" AND NOT id:"${work.id}"&collectionLabel=${collection}&collectionSummary=Collection&as=iiif`
  );

  return related;
};
