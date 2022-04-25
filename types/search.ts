export type ModelName = "Collection" | "Work";

export interface SearchModelName {
  bool: {
    must: [
      {
        match: {
          "model.name": ModelName;
        };
      }
    ];
  };
}

export interface SearchSimpleQueryString {
  simple_query_string: {
    default_operator: string;
    fields: string[];
    query: string;
  };
}

export type SearchSource = [
  "accessionNumber",
  "id",
  "iiifManifest",
  "title",
  "thumbnail",
  "workType.label"
];

export interface DefaultSearchRequest {
  _source: SearchSource;
  query: {
    bool: {
      must: [SearchModelName, SearchSimpleQueryString?];
    };
  };
  size: number;
}

export interface ApiResponse {
  data: Array<any>;
  info: {
    total: number;
  };
}
