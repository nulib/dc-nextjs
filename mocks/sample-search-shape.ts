import { SearchShape } from "@/types/api/response";

export const sampleSearchShape: SearchShape[] = [
  {
    api_model: "Work",
    id: "4b0632df-07e4-4699-9510-1d96b715276e",
    representative_file_set: {
      aspect_ratio: 1,
      id: "f292521f-4114-4d89-b477-403a697df2f8",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/245eabab-7839-4e13-ab5a-e9d3243250fe/full/!300,300/0/default.jpg",
    },
    thumbnail:
      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/245eabab-7839-4e13-ab5a-e9d3243250fe/full/!300,300/0/default.jpg",
    title: "",
    visibility: "Public",
    work_type: "Image",
  },
  {
    api_model: "Work",
    id: "f292521f-4114-4d89-b477-403a697df2f8",
    representative_file_set: {
      aspect_ratio: 0.82343,
      id: "f292521f-4114-4d89-b477-403a697df2f8",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/4c1c9ab6-72ed-42fa-b273-6acd0cf946dc/full/!300,300/0/default.jpg",
    },
    thumbnail:
      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/4c1c9ab6-72ed-42fa-b273-6acd0cf946dc/full/!300,300/0/default.jpg",
    title: "Cakrasamvara Mandala",
    visibility: "Public",
    work_type: "Image",
  },
];
