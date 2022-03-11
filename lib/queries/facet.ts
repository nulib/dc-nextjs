const buildFacetPart = (name: string, values: [string]) => {
  const obj = {
    bool: {
      should: [
        {
          terms: {
            // TODO: Pull from a global mapper object which ties convenience key labels to Elasticsearch defined key values
            [`descriptiveMetadata.${name}.displayFacet`]: [...values],
          },
        },
      ],
    },
  };
  return obj;
};

export { buildFacetPart };
