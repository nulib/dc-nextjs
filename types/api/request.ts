import { ModelName } from "@/types/api/generic";

export interface ApiSearchRequest {
  _source: SearchSource;
  query: ApiSearchQuery;
  size: number;
}

export interface ApiSearchQuery {
  bool: {
    must: [SearchModelName, FacetTerms?, SearchSimpleQueryString?];
  };
}

export interface FacetTerms {
  bool: {
    should: Array<{
      terms: {
        [key: string]: string[];
      };
    }>;
  };
}
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
