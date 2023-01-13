export interface Agg {
  terms: {
    field: string;
    exclude?: string[] | string;
    include?: string[] | string;
    order?: {
      _count: string;
    };
    size: number;
  };
}

export interface Aggs {
  [key: string]: Agg;
}

export interface ApiSearchRequest {
  _source: SearchSource;
  query: ApiSearchQuery;
  size: number;
  aggs?: Aggs;
}

export interface ApiSearchQuery {
  bool: {
    must: [FacetTerms?, SearchSimpleQueryString?];
  };
}

export type FacetTerm = {
  term: {
    [key: string]: string;
  };
};

export interface FacetTerms {
  bool: {
    filter: Array<FacetTerm>;
  };
}

export interface SearchSimpleQueryString {
  query_string: {
    default_operator?: string;
    fields: string[];
    query: string;
  };
}

export type SearchSource = [
  "id",
  "iiif_manifest",
  "representative_file_set",
  "title",
  "thumbnail",
  "visibility",
  "work_type"
];
