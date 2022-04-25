export type ModelName = "Collection" | "Work";
export type SearchSource = [
  "accessionNumber",
  "id",
  "iiifManifest",
  "title",
  "thumbnail",
  "workType.label"
];

export interface SearchSimpleQueryString {
  default_operator: string;
  fields: string[];
  query: string;
}

export interface DefaultSearchRequest {
  _source: SearchSource;
  query: {
    bool: {
      must: [
        {
          bool: {
            must: [
              {
                match: {
                  "model.name": ModelName;
                };
              }
            ];
          };
        },
        {
          simple_query_string?: SearchSimpleQueryString;
        }
      ];
    };
  };
  size: number;
}
