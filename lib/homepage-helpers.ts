import { CollectionShape } from "@/types/components/collections";
import { DCAPI_PRODUCTION_ENDPOINT } from "./constants/endpoints";
import { SearchShape } from "@/types/api/response";
import { WorkShape } from "@/types/components/works";
import { apiGetRequest } from "./dc-api";
import axios from "axios";

const getHomePageCollections = async (
  collectionIds: string[] = []
): Promise<SearchShape[]> => {
  try {
    /** Batch fetch all Collections */
    const collections = await axios.all(
      collectionIds.map((id) => {
        return apiGetRequest<CollectionShape>({
          url: `${DCAPI_PRODUCTION_ENDPOINT}/collections/${id}`,
        });
      })
    );

    /** Batch fetch all Works which are representative images of Collections returned above */
    const workIds = collections.map((c) => c?.representative_image.work_id);
    const works = await axios.all(
      workIds.map((id) =>
        apiGetRequest<WorkShape>({
          url: `${DCAPI_PRODUCTION_ENDPOINT}/works/${id}`,
        })
      )
    );

    const worksUpdated: WorkShape[] = [];
    works.forEach((work) => {
      if (!work) return;
      worksUpdated.push({
        ...work,
        representative_file_set: {
          ...work?.representative_file_set,
          /** Format for nice UI display on the home page */
          aspect_ratio: 1,
        },
      });
    });

    /** Build the shape of what the Collection Grid wants */
    const collectionGridItems: SearchShape[] = [];

    collections.forEach((collection, index) => {
      if (!collection) return;

      const { api_model, id, thumbnail, title, visibility } = collection;

      collectionGridItems.push({
        api_model,
        id,
        iiif_manifest: `${DCAPI_PRODUCTION_ENDPOINT}/collections/${id}?as=iiif`,
        representative_file_set: worksUpdated[index].representative_file_set,
        thumbnail,
        title,
        visibility,
        work_type: worksUpdated[index].work_type,
      });
    });

    return collectionGridItems;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export { getHomePageCollections };
