const buildFacetPart = (name: string, values: string[]) => {
  const obj = {
    bool: {
      should: [
        {
          terms: {
            [`descriptiveMetadata.${name}.displayFacet`]: [...values],
          },
        },
      ],
    },
  };
  return obj;
};

export { buildFacetPart };
