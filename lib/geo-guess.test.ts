import {
  buildGeoGuessCandidateQuery,
  buildGeoGuessImageRegion,
  buildGeoGuessCsv,
  buildGeoGuessSubmission,
  buildGeoGuessSubmissionFromGcps,
  buildGeoreferenceAnnotationFromGcps,
  computeAffineFromGcps,
  getDistanceKm,
  getFileSetIdFromImageServiceUrl,
  getGeoGuessScore,
  getImageFootprint,
  getPointFromMapClick,
  searchPlaces,
} from "@/lib/geo-guess";

import { GcpPair, GeoGuessWork } from "@/lib/geo-guess";

describe("geo guess helpers", () => {
  it("converts a map click to longitude and latitude", () => {
    const point = getPointFromMapClick(50, 25, {
      height: 50,
      left: 0,
      top: 0,
      width: 100,
    });

    expect(point).toEqual({ latitude: 0, longitude: 0 });
  });

  it("calculates distance and score for a known nav place", () => {
    const work = {
      id: "abc123",
      title: "Chicago image",
      nav_place: [
        {
          id: "https://sws.geonames.org/4887398/",
          label: "Chicago",
          summary: "Illinois, United States",
          coordinates: [-87.65005, 41.85003],
        },
      ],
    } as GeoGuessWork;

    const submission = buildGeoGuessSubmission(
      work,
      { latitude: 41.8781, longitude: -87.6298 },
      "high",
      "Looks like downtown Chicago",
    );

    expect(submission.distanceKm).toBeLessThan(4);
    expect(submission.score).toBeGreaterThan(4900);
    expect(submission.navPlaceCandidate).toHaveLength(2);
    expect(submission.navPlaceCandidate[0].label).toEqual("Chicago");
    expect(submission.navPlaceCandidate[1]).toEqual({
      label: "Community supplied coordinate",
      summary: "Looks like downtown Chicago",
      coordinates: [-87.6298, 41.8781],
    });
    expect(submission.navPlaceCandidate[1].coordinates).toEqual([
      -87.6298, 41.8781,
    ]);
  });

  it("preserves existing nav places when adding a community candidate", () => {
    const work = {
      id: "multi-place",
      title: "Itinerary image",
      nav_place: [
        {
          id: "https://sws.geonames.org/4887398/",
          label: "Chicago",
          summary: "Illinois, United States",
          coordinates: [-87.65005, 41.85003],
        },
        {
          id: "https://sws.geonames.org/4891382/",
          label: "Evanston",
          summary: "Illinois, United States",
          coordinates: [-87.69006, 42.04114],
        },
      ],
    } as GeoGuessWork;

    const submission = buildGeoGuessSubmission(
      work,
      { latitude: 42.05118, longitude: -87.67722 },
      "medium",
      "Second campus location",
    );

    expect(submission.navPlaceCandidate).toEqual([
      {
        id: "https://sws.geonames.org/4887398/",
        label: "Chicago",
        summary: "Illinois, United States",
        coordinates: [-87.65005, 41.85003],
      },
      {
        id: "https://sws.geonames.org/4891382/",
        label: "Evanston",
        summary: "Illinois, United States",
        coordinates: [-87.69006, 42.04114],
      },
      {
        label: "Community supplied coordinate",
        summary: "Second campus location",
        coordinates: [-87.67722, 42.05118],
      },
    ]);
  });

  it("exports submissions as quoted CSV", () => {
    const csv = buildGeoGuessCsv([
      {
        confidence: "medium",
        createdAt: "2026-01-01T00:00:00.000Z",
        guess: {
          coordinates: [-87.65, 41.85],
          latitude: 41.85,
          longitude: -87.65,
        },
        navPlaceCandidate: [
          {
            label: "Community supplied coordinate",
            coordinates: [-87.65, 41.85],
          },
        ],
        note: "near Chicago",
        title: "A title",
        workId: "abc123",
      },
    ]);

    expect(csv).toContain('"work_id","title","longitude"');
    expect(csv).toContain('"abc123","A title","-87.65","41.85"');
    expect(csv).toContain('"georeference_annotation_json"');
  });

  it("excludes scrapbook records from georeference candidates", () => {
    expect(buildGeoGuessCandidateQuery("georeference")).toMatchObject({
      bool: {
        must_not: [
          {
            multi_match: {
              query: "scrapbook",
              fields: [
                "title",
                "subject.label",
                "location.label",
                "collection.title",
                "description",
              ],
            },
          },
        ],
      },
    });
  });

  it("converts annotorious rectangle selectors to IIIF SVG selectors", () => {
    const region = buildGeoGuessImageRegion(
      "annotation-1",
      {
        type: "RECTANGLE",
        geometry: {
          x: 10,
          y: 20,
          w: 100,
          h: 50,
          bounds: { minX: 10, minY: 20, maxX: 110, maxY: 70 },
        },
      },
      { width: 1000, height: 800 },
    );

    expect(region?.resourceCoords).toEqual([60, 45]);
    expect(region?.selector).toEqual({
      type: "SvgSelector",
      value:
        '<svg width="1000" height="800"><rect x="10" y="20" width="100" height="50" /></svg>',
    });
  });

  it("adds a georeference annotation when the submission has an image region", () => {
    const work = {
      id: "abc123",
      title: "Map",
      representative_file_set: {
        url: "https://iiif.example.org/iiif/2/image-id",
      },
    } as GeoGuessWork;
    const region = buildGeoGuessImageRegion("annotation-1", {
      type: "POLYGON",
      geometry: {
        points: [
          [10, 20],
          [110, 25],
          [100, 80],
        ],
        bounds: { minX: 10, minY: 20, maxX: 110, maxY: 80 },
      },
    });

    const submission = buildGeoGuessSubmission(
      work,
      { latitude: 41.8781, longitude: -87.6298 },
      "medium",
      "Map center",
      region,
    );

    expect(submission.georeferenceAnnotation?.motivation).toEqual(
      "georeferencing",
    );
    expect(submission.georeferenceAnnotation?.["@context"]).toEqual([
      "http://iiif.io/api/extension/georef/1/context.json",
      "http://iiif.io/api/presentation/3/context.json",
    ]);
    expect(submission.georeferenceAnnotation?.target.selector?.value).toContain(
      "<polygon",
    );
    expect(
      submission.georeferenceAnnotation?.body.features[0].properties
        .resourceCoords,
    ).toEqual([60, 50]);
    expect(
      submission.georeferenceAnnotation?.body.features[0].geometry.coordinates,
    ).toEqual([-87.6298, 41.8781]);
  });

  it("keeps a nearby answer near the maximum score", () => {
    const distance = getDistanceKm(
      { latitude: 41.85, longitude: -87.65 },
      { latitude: 41.85003, longitude: -87.65005 },
    );

    expect(getGeoGuessScore(distance)).toBeGreaterThan(4990);
  });

  it("returns null when fewer than two control points are provided", () => {
    expect(computeAffineFromGcps([])).toBeNull();
    expect(
      computeAffineFromGcps([
        { id: "a", resourceCoords: [0, 0], geoCoords: [0, 0] },
      ]),
    ).toBeNull();
  });

  it("projects image corners through a least-squares affine fit", () => {
    const pairs: GcpPair[] = [
      { id: "a", resourceCoords: [0, 0], geoCoords: [-90, 45] },
      { id: "b", resourceCoords: [100, 0], geoCoords: [-89, 45] },
      { id: "c", resourceCoords: [100, 100], geoCoords: [-89, 44] },
      { id: "d", resourceCoords: [0, 100], geoCoords: [-90, 44] },
    ];

    const footprint = getImageFootprint(pairs, { height: 100, width: 100 });

    expect(footprint).not.toBeNull();
    expect(footprint).toHaveLength(4);
    const [topLeft, topRight, bottomRight, bottomLeft] = footprint!;
    expect(topLeft[0]).toBeCloseTo(-90, 4);
    expect(topLeft[1]).toBeCloseTo(45, 4);
    expect(topRight[0]).toBeCloseTo(-89, 4);
    expect(bottomRight[1]).toBeCloseTo(44, 4);
    expect(bottomLeft[0]).toBeCloseTo(-90, 4);
  });

  it("handles two-point fits as axis-aligned scale and translation", () => {
    const transform = computeAffineFromGcps([
      { id: "a", resourceCoords: [0, 0], geoCoords: [-90, 45] },
      { id: "b", resourceCoords: [200, 100], geoCoords: [-88, 43] },
    ]);

    expect(transform).not.toBeNull();
    expect(transform!.b).toBe(0);
    expect(transform!.d).toBe(0);
    expect(transform!.a).toBeCloseTo(0.01, 6);
    expect(transform!.e).toBeCloseTo(-0.02, 6);
  });

  it("extracts file set id from a IIIF image service URL", () => {
    expect(
      getFileSetIdFromImageServiceUrl(
        "https://iiif.dc.library.northwestern.edu/iiif/3/e7ffc4d9-700c-4fac-95bd-843649540198",
      ),
    ).toEqual("e7ffc4d9-700c-4fac-95bd-843649540198");
    expect(
      getFileSetIdFromImageServiceUrl(
        "https://iiif.dc.library.northwestern.edu/iiif/2/440bcf10-a7ee-4824-a1fb-e505cad222df/full/200,/0/default.jpg",
      ),
    ).toEqual("440bcf10-a7ee-4824-a1fb-e505cad222df");
    expect(
      getFileSetIdFromImageServiceUrl("https://example.org/nothing"),
    ).toBeUndefined();
  });

  it("points GCP submissions at the file set canvas with mask and dimensions", () => {
    const work = {
      id: "work-abc",
      representative_file_set: {
        url: "https://iiif.dc.library.northwestern.edu/iiif/3/e7ffc4d9-700c-4fac-95bd-843649540198",
      },
    } as GeoGuessWork;

    const pairs: GcpPair[] = [
      { id: "a", resourceCoords: [0, 0], geoCoords: [-90, 45] },
      { id: "b", resourceCoords: [100, 0], geoCoords: [-89, 45] },
      { id: "c", resourceCoords: [100, 100], geoCoords: [-89, 44] },
    ];

    const submission = buildGeoGuessSubmissionFromGcps(
      work,
      pairs,
      "high",
      "evidence",
      { height: 2289, width: 3208 },
    );

    const annotation = submission.georeferenceAnnotation;
    expect(annotation?.["@context"]).toEqual([
      "http://iiif.io/api/extension/georef/1/context.json",
      "http://iiif.io/api/presentation/3/context.json",
    ]);
    expect(annotation?.target.source.id).toContain(
      "/file-sets/e7ffc4d9-700c-4fac-95bd-843649540198?as=iiif",
    );
    expect(annotation?.target.source.type).toEqual("Canvas");
    expect(annotation?.target.source.width).toEqual(3208);
    expect(annotation?.target.source.height).toEqual(2289);
    expect(annotation?.target.selector?.value).toContain("<polygon");
    expect(annotation?.target.selector?.value).toContain('width="3208"');
  });

  it("rewrites v3 image service URLs to v2 in preview annotations", () => {
    const work = {
      id: "work-abc",
      representative_file_set: {
        url: "https://iiif.dc.library.northwestern.edu/iiif/3/e7ffc4d9-700c-4fac-95bd-843649540198",
      },
    } as GeoGuessWork;

    const pairs: GcpPair[] = [
      { id: "a", resourceCoords: [0, 0], geoCoords: [-90, 45] },
      { id: "b", resourceCoords: [100, 0], geoCoords: [-89, 45] },
      { id: "c", resourceCoords: [100, 100], geoCoords: [-89, 44] },
    ];

    const annotation = buildGeoreferenceAnnotationFromGcps(
      work,
      pairs,
      "medium",
      "",
      "preview",
      { height: 100, width: 100 },
      { forPreview: true },
    );

    expect(annotation?.target.source.id).toEqual(
      "https://iiif.dc.library.northwestern.edu/iiif/2/e7ffc4d9-700c-4fac-95bd-843649540198",
    );
    expect(annotation?.target.source.type).toEqual("ImageService2");
    expect(annotation?.target.selector?.value).toContain("<polygon");
  });

  it("falls back to image service URL when no file set id is detectable", () => {
    const work = {
      id: "work-abc",
      representative_file_set: {
        url: "https://iiif.example.org/iiif/2/legacy-image",
      },
    } as GeoGuessWork;

    const submission = buildGeoGuessSubmissionFromGcps(
      work,
      [
        { id: "a", resourceCoords: [0, 0], geoCoords: [-90, 45] },
        { id: "b", resourceCoords: [100, 100], geoCoords: [-89, 44] },
      ],
      "medium",
      "",
    );

    expect(submission.georeferenceAnnotation?.target.source.id).toEqual(
      "https://iiif.example.org/iiif/2/legacy-image",
    );
    expect(submission.georeferenceAnnotation?.target.source.type).toEqual(
      "ImageService2",
    );
  });

  it("searches places with Nominatim parameters", async () => {
    const originalFetch = global.fetch;
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          display_name: "Deering Library, Evanston, Illinois",
          lat: "42.05395",
          lon: "-87.67381",
          place_id: 1,
        },
      ],
    } as Response);
    global.fetch = fetchMock;

    const results = await searchPlaces("Deering Library Northwestern");
    const url = new URL(fetchMock.mock.calls[0][0] as string);

    expect(url.hostname).toEqual("nominatim.openstreetmap.org");
    expect(url.searchParams.get("q")).toEqual("Deering Library Northwestern");
    expect(url.searchParams.get("format")).toEqual("jsonv2");
    expect(results[0].display_name).toContain("Deering Library");

    global.fetch = originalFetch;
  });
});
