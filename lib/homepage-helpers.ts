import { DCAPI_PRODUCTION_ENDPOINT } from "./constants/endpoints";
import { SearchShape } from "@/types/api/response";
import { WorkShape } from "@/types/components/works";
import axios from "axios";

const getHomePageCollections = async (
  collectionIds: string[] = []
): Promise<SearchShape[]> => {
  try {
    /** Batch fetch all Collections */
    const collectionsResponse = await axios.all(
      collectionIds.map((id) => {
        return axios.get(`${DCAPI_PRODUCTION_ENDPOINT}/collections/${id}`);
      })
    );
    const collections = collectionsResponse.map((cr) => cr.data.data);

    /** Batch fetch all Works which are representative images of Collections returned above */
    const workIds = collections.map((c) => c.representative_image.work_id);
    const worksResponse = await axios.all(
      workIds.map((id) => axios.get(`${DCAPI_PRODUCTION_ENDPOINT}/works/${id}`))
    );
    const works: WorkShape[] = worksResponse.map(({ data: { data } }) => ({
      ...data,
      representative_file_set: {
        ...data.representative_file_set,
        /** Format for nice UI display on the home page */
        aspect_ratio: 1,
      },
    }));

    /** Build the shape of what the Collection Grid wants */
    const collectionGridItems = collections.map((collection, index) => {
      const { api_model, id, thumbnail, title, visibility } = collection;

      return {
        api_model,
        id,
        iiif_manifest: `${DCAPI_PRODUCTION_ENDPOINT}/collections/${id}?as=iiif`,
        representative_file_set: works[index].representative_file_set,
        thumbnail,
        title,
        visibility,
        work_type: works[index].work_type,
      };
    });

    return collectionGridItems;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export { getHomePageCollections };
