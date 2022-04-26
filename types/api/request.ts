import { ModelName } from "@/types/api/generic";

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

export interface ApiSearchRequest {
  _source: SearchSource;
  query: {
    bool: {
      must: [SearchModelName, SearchSimpleQueryString?];
    };
  };
  size: number;
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
