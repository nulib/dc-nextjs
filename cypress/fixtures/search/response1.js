/**
 * This must be a IIFE when using a .js file for a Cypress fixture.
 * Or something that Cypress will process via eval()
 */

/* eslint sort-keys: 0 */
// prettier-ignore
(() => {
  
  const numRecordsToCreate = 20;
  const data = [];

  /**
   * This is a static image in DC Production that we assume will always be available
   */
  const thumbnailUrl =
    "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/76c26a0a-0454-48d8-a225-9fc26735315b/full/pct:10/0/default.jpg";
  
    const awsMockManifestUrl =
    "https://yt8thudrak.execute-api.us-east-1.amazonaws.com/manifests";



  /**
   * Dynamically build up JSON response data from our testing API endpoint
   */
  for (let i = 1; i < numRecordsToCreate; i++) {
    const id = i;
    let workType = "Image";
    if (id % 5 === 0) {
      workType = "Audio";
    } else if (id % 6 === 0) {
      workType = "Video";
    }

    data.push({
      accession_number: `accessionNum_${i}`,
      thumbnail: thumbnailUrl,
      
      // This will bypass a staging manifest route, but do we need to mock it? 
      iiif_manifest: `${awsMockManifestUrl}/${id}`,
      
      work_type: workType,
      id,
      title: `${workType} ${i}`,
    });
  }

  const response = {
    data,
    pagination: {
      query_url:
        "https://pylxu5f2l2.execute-api.us-east-1.amazonaws.com/v2/search?searchToken=N4IgRg9gJgniBcoDOBLAXgUwQFgAwBoQB9JCAVwCcBjLeAbRAEMqalUIA7IjsgWzAwUQhFFGEgUkgGZFejDiikYkAF3EqUKgDZZCKgBZ8wHRii3iA7hAoBrIipgAHLAF1CARzKC4icBAjmvrxkqgh0yCi8jjpEnt4kKhQoHADmCKBQGFKMZFoqRBDOFIwq1gggZYRSKBhaUEhhIBraGAB6AKzijFpa9hgAHmqE3b1UnIkBOlBEWowCWg3DPUSiDW4gcRQ%2BIFL%2BAH4AjAAEAD5HuxAAVCAAvjcudzeEvNC1DfQgVrZrVdZyavAQJlsrkhhVHBpOO9gHcgA",
      current_page: 1,
      limit: 40,
      offset: 0,
      total_hits: numRecordsToCreate,
      total_pages: 1,
    },
    info: {},
  };

  return response;
})()
