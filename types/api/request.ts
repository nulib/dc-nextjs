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

export interface FacetTerms {
  bool: {
    should: Array<{
      terms: {
        [key: string]: string[];
      };
    }>;
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
  "accession_number",
  "id",
  "iiif_manifest",
  "title",
  "thumbnail",
  "visibility",
  "work_type"
];
