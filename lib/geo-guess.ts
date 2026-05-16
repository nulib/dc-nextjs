import { DCAPI_PRODUCTION_ENDPOINT } from "@/lib/constants/endpoints";
import { apiGetRequest, apiPostRequest } from "@/lib/dc-api";

import { ApiSearchResponse } from "@/types/api/response";
import type { Work } from "@nulib/dcapi-types";

export type NavPlace = {
  coordinates?: [number, number];
  id?: string;
  label?: string;
  summary?: string;
};

export type GeoGuessWork = Work & {
  iiif_manifest?: string;
  nav_place?: NavPlace[] | null;
};

export type GeoGuessSvgSelector = {
  type: "SvgSelector";
  value: string;
};

export type GeoGuessImageRegion = {
  annotationId: string;
  bounds: {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
  };
  dimensions?: {
    height: number;
    width: number;
  };
  resourceCoords: [number, number];
  selector: GeoGuessSvgSelector;
  shapeType: "POLYGON" | "RECTANGLE";
};

export type GeoGuessGeoreferenceAnnotation = {
  "@context": string[];
  body: {
    features: Array<{
      geometry: {
        coordinates: [number, number];
        type: "Point";
      };
      properties: {
        confidence: GeoGuessSubmission["confidence"];
        note?: string;
        resourceCoords: [number, number];
      };
      type: "Feature";
    }>;
    type: "FeatureCollection";
  };
  id: string;
  motivation: "georeferencing";
  target: {
    selector?: GeoGuessSvgSelector;
    source: {
      height?: number;
      id: string;
      type: string;
      width?: number;
    };
    type: "SpecificResource";
  };
  type: "Annotation";
};

export type GeoGuessSubmission = {
  confidence: "low" | "medium" | "high";
  createdAt: string;
  distanceKm?: number;
  georeferenceAnnotation?: GeoGuessGeoreferenceAnnotation;
  guess: {
    coordinates: [number, number];
    latitude: number;
    longitude: number;
  };
  imageRegion?: GeoGuessImageRegion;
  navPlaceCandidate: NavPlace[];
  note: string;
  score?: number;
  title: string;
  workId: string;
};

export type GcpPair = {
  geoCoords: [number, number];
  id: string;
  resourceCoords: [number, number];
};

export type PlaceSearchResult = {
  addresstype?: string;
  boundingbox?: [string, string, string, string];
  category?: string;
  display_name: string;
  importance?: number;
  lat: string;
  lon: string;
  name?: string;
  osm_id?: number;
  osm_type?: string;
  place_id: number;
  type?: string;
};

const geoGuessSourceFields = [
  "accession_number",
  "collection",
  "date_created",
  "description",
  "genre",
  "id",
  "iiif_manifest",
  "location",
  "nav_place",
  "representative_file_set",
  "subject",
  "thumbnail",
  "title",
  "visibility",
  "work_type",
];

const georeferenceContext =
  "http://iiif.io/api/extension/georef/1/context.json";
const presentationContext = "http://iiif.io/api/presentation/3/context.json";
const communityCoordinateLabel = "Community supplied coordinate";

function getDcApiEndpoint() {
  return process.env.NEXT_PUBLIC_DCAPI_ENDPOINT || DCAPI_PRODUCTION_ENDPOINT;
}

export function normalizeCoordinate(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

export function getPointFromMapClick(
  clientX: number,
  clientY: number,
  rect: Pick<DOMRect, "height" | "left" | "top" | "width">,
) {
  const x = normalizeCoordinate((clientX - rect.left) / rect.width, 0, 1);
  const y = normalizeCoordinate((clientY - rect.top) / rect.height, 0, 1);

  return {
    latitude: Number((90 - y * 180).toFixed(5)),
    longitude: Number((x * 360 - 180).toFixed(5)),
  };
}

export function getMapPosition(longitude: number, latitude: number) {
  return {
    x: `${((normalizeCoordinate(longitude, -180, 180) + 180) / 360) * 100}%`,
    y: `${((90 - normalizeCoordinate(latitude, -90, 90)) / 180) * 100}%`,
  };
}

export function formatCoordinate(value: number, axis: "lat" | "lng") {
  const direction =
    axis === "lat" ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";

  return `${Math.abs(value).toFixed(5)} ${direction}`;
}

export function getKnownPlaces(work?: GeoGuessWork | null) {
  if (!work?.nav_place || !Array.isArray(work.nav_place)) return [];

  return work.nav_place.filter((place) => {
    const coordinates = place.coordinates || [];
    return (
      coordinates.length >= 2 &&
      typeof coordinates[0] === "number" &&
      typeof coordinates[1] === "number"
    );
  });
}

export function getDistanceKm(
  pointA: { latitude: number; longitude: number },
  pointB: { latitude: number; longitude: number },
) {
  const earthRadiusKm = 6371;
  const degreesToRadians = (value: number) => (value * Math.PI) / 180;
  const latitudeDistance = degreesToRadians(pointB.latitude - pointA.latitude);
  const longitudeDistance = degreesToRadians(
    pointB.longitude - pointA.longitude,
  );
  const startLatitude = degreesToRadians(pointA.latitude);
  const endLatitude = degreesToRadians(pointB.latitude);

  const haversine =
    Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDistance / 2) *
      Math.sin(longitudeDistance / 2);

  return (
    earthRadiusKm *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

export function getClosestKnownPlace(
  guess: { latitude: number; longitude: number },
  knownPlaces: NavPlace[],
) {
  return knownPlaces.reduce<{
    distanceKm: number;
    place: NavPlace;
  } | null>((closest, place) => {
    const coordinates = place.coordinates || [];
    const distanceKm = getDistanceKm(guess, {
      longitude: Number(coordinates[0]),
      latitude: Number(coordinates[1]),
    });

    if (!closest || distanceKm < closest.distanceKm) {
      return { distanceKm, place };
    }

    return closest;
  }, null);
}

export function getGeoGuessScore(distanceKm: number) {
  if (distanceKm < 0.05) return 5000;
  return Math.max(0, Math.round(5000 * Math.exp(-distanceKm / 1800)));
}

type AnnotoriousShape = {
  geometry?: {
    bounds?: {
      maxX: number;
      maxY: number;
      minX: number;
      minY: number;
    };
    h?: number;
    points?: number[][];
    w?: number;
    x?: number;
    y?: number;
  };
  type?: string;
};

function formatSvgNumber(value: number) {
  return Number(value.toFixed(2)).toString();
}

function getSvgDimensionsAttributes(
  dimensions?: GeoGuessImageRegion["dimensions"],
) {
  if (!dimensions?.width || !dimensions?.height) return "";

  return ` width="${formatSvgNumber(dimensions.width)}" height="${formatSvgNumber(
    dimensions.height,
  )}"`;
}

function getBoundsCenter(bounds: GeoGuessImageRegion["bounds"]) {
  return [
    Number(((bounds.minX + bounds.maxX) / 2).toFixed(2)),
    Number(((bounds.minY + bounds.maxY) / 2).toFixed(2)),
  ] as [number, number];
}

export function buildGeoGuessImageRegion(
  annotationId: string,
  shape: AnnotoriousShape,
  dimensions?: GeoGuessImageRegion["dimensions"],
): GeoGuessImageRegion | undefined {
  const geometry = shape.geometry;
  const bounds = geometry?.bounds;

  if (!geometry || !bounds) return undefined;

  const normalizedBounds = {
    maxX: Number(bounds.maxX.toFixed(2)),
    maxY: Number(bounds.maxY.toFixed(2)),
    minX: Number(bounds.minX.toFixed(2)),
    minY: Number(bounds.minY.toFixed(2)),
  };
  const svgDimensions = getSvgDimensionsAttributes(dimensions);

  if (
    shape.type === "RECTANGLE" &&
    typeof geometry.x === "number" &&
    typeof geometry.y === "number" &&
    typeof geometry.w === "number" &&
    typeof geometry.h === "number"
  ) {
    return {
      annotationId,
      bounds: normalizedBounds,
      dimensions,
      resourceCoords: getBoundsCenter(normalizedBounds),
      selector: {
        type: "SvgSelector",
        value: `<svg${svgDimensions}><rect x="${formatSvgNumber(
          geometry.x,
        )}" y="${formatSvgNumber(geometry.y)}" width="${formatSvgNumber(
          geometry.w,
        )}" height="${formatSvgNumber(geometry.h)}" /></svg>`,
      },
      shapeType: "RECTANGLE",
    };
  }

  if (shape.type === "POLYGON" && Array.isArray(geometry.points)) {
    const points = geometry.points
      .filter(
        (point): point is [number, number] =>
          point.length >= 2 &&
          typeof point[0] === "number" &&
          typeof point[1] === "number",
      )
      .map(([x, y]) => `${formatSvgNumber(x)},${formatSvgNumber(y)}`)
      .join(" ");

    if (!points) return undefined;

    return {
      annotationId,
      bounds: normalizedBounds,
      dimensions,
      resourceCoords: getBoundsCenter(normalizedBounds),
      selector: {
        type: "SvgSelector",
        value: `<svg${svgDimensions}><polygon points="${points}" /></svg>`,
      },
      shapeType: "POLYGON",
    };
  }

  return undefined;
}

function getImageServiceType(imageServiceUrl?: string) {
  if (!imageServiceUrl) return "ImageService";
  if (imageServiceUrl.includes("/iiif/3/")) return "ImageService3";
  return "ImageService2";
}

export function getFileSetIdFromImageServiceUrl(url?: string) {
  if (!url) return undefined;
  const match = url.match(/\/iiif\/[23]\/([a-f0-9-]{36})/i);
  return match?.[1];
}

export function getFileSetCanvasUrl(fileSetId: string) {
  return `${getDcApiEndpoint()}/file-sets/${fileSetId}?as=iiif`;
}

function toIIIFv2ImageServiceUrl(imageServiceUrl?: string) {
  if (!imageServiceUrl) return imageServiceUrl;
  return imageServiceUrl.replace("/iiif/3/", "/iiif/2/");
}

function resolveAnnotationSource(
  work: GeoGuessWork,
  options: { forPreview?: boolean } = {},
) {
  const imageServiceUrl = work.representative_file_set?.url;

  // Allmaps' iiif-parser can't traverse Presentation Canvases and chokes on
  // NUL's v3 info.json (non-spec `profile` object). For the live preview only,
  // hand it a v2 Image Service URL so its renderer can work. Submitted
  // annotations keep the canonical canvas URL.
  if (options.forPreview) {
    const v2Url = toIIIFv2ImageServiceUrl(imageServiceUrl);
    if (!v2Url) return undefined;
    return { id: v2Url, type: "ImageService2" };
  }

  const fileSetId = getFileSetIdFromImageServiceUrl(imageServiceUrl);
  if (fileSetId) {
    return { id: getFileSetCanvasUrl(fileSetId), type: "Canvas" };
  }

  const fallbackId = imageServiceUrl || work.iiif_manifest || work.id;
  if (!fallbackId) return undefined;

  return { id: fallbackId, type: getImageServiceType(imageServiceUrl) };
}

function buildGeoreferenceAnnotation(
  work: GeoGuessWork,
  guess: { latitude: number; longitude: number },
  confidence: GeoGuessSubmission["confidence"],
  note: string,
  region: GeoGuessImageRegion,
  createdAt: string,
): GeoGuessGeoreferenceAnnotation | undefined {
  const source = resolveAnnotationSource(work);
  if (!source) return undefined;

  return {
    "@context": [georeferenceContext, presentationContext],
    id: `urn:dc-nextjs:geo-guess:${work.id}:${encodeURIComponent(createdAt)}`,
    type: "Annotation",
    motivation: "georeferencing",
    target: {
      type: "SpecificResource",
      source: {
        ...source,
        ...(region.dimensions && {
          height: region.dimensions.height,
          width: region.dimensions.width,
        }),
      },
      selector: region.selector,
    },
    body: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            confidence,
            ...(note && { note }),
            resourceCoords: region.resourceCoords,
          },
          geometry: {
            type: "Point",
            coordinates: [guess.longitude, guess.latitude],
          },
        },
      ],
    },
  };
}

function buildNavPlaceCandidate(
  guess: { latitude: number; longitude: number },
  note: string,
): NavPlace {
  return {
    label: communityCoordinateLabel,
    ...(note && { summary: note }),
    coordinates: [guess.longitude, guess.latitude],
  };
}

function normalizeNavPlace(place: NavPlace): NavPlace | null {
  const coordinates = place.coordinates || [];
  if (
    coordinates.length < 2 ||
    typeof coordinates[0] !== "number" ||
    typeof coordinates[1] !== "number"
  ) {
    return null;
  }

  return {
    ...(place.id && { id: place.id }),
    ...(place.label && { label: place.label }),
    ...(place.summary && { summary: place.summary }),
    coordinates: [coordinates[0], coordinates[1]],
  };
}

function navPlaceKey(place: NavPlace) {
  return [
    place.id || "",
    place.label || "",
    place.coordinates?.[0] ?? "",
    place.coordinates?.[1] ?? "",
  ].join("|");
}

function buildNavPlaceCandidates(
  work: GeoGuessWork,
  guess: { latitude: number; longitude: number },
  note: string,
): NavPlace[] {
  const places = [
    ...(work.nav_place || []).map(normalizeNavPlace).filter(Boolean),
    buildNavPlaceCandidate(guess, note),
  ] as NavPlace[];
  const seen = new Set<string>();

  return places.filter((place) => {
    const key = navPlaceKey(place);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildGeoGuessSubmission(
  work: GeoGuessWork,
  guess: { latitude: number; longitude: number },
  confidence: GeoGuessSubmission["confidence"],
  note: string,
  imageRegion?: GeoGuessImageRegion,
): GeoGuessSubmission {
  const knownPlaces = getKnownPlaces(work);
  const closest = getClosestKnownPlace(guess, knownPlaces);
  const distanceKm = closest
    ? Number(closest.distanceKm.toFixed(2))
    : undefined;
  const createdAt = new Date().toISOString();
  const georeferenceAnnotation = imageRegion
    ? buildGeoreferenceAnnotation(
        work,
        guess,
        confidence,
        note,
        imageRegion,
        createdAt,
      )
    : undefined;

  return {
    confidence,
    createdAt,
    ...(typeof distanceKm === "number" && {
      distanceKm,
      score: getGeoGuessScore(distanceKm),
    }),
    ...(georeferenceAnnotation && { georeferenceAnnotation }),
    guess: {
      coordinates: [guess.longitude, guess.latitude],
      latitude: guess.latitude,
      longitude: guess.longitude,
    },
    ...(imageRegion && { imageRegion }),
    navPlaceCandidate: buildNavPlaceCandidates(work, guess, note),
    note,
    title: work.title || work.accession_number || "Untitled work",
    workId: work.id,
  };
}

export function buildGeoGuessCsv(submissions: GeoGuessSubmission[]) {
  const headers = [
    "work_id",
    "title",
    "longitude",
    "latitude",
    "confidence",
    "note",
    "score",
    "distance_km",
    "created_at",
    "nav_place_candidate_json",
    "georeference_annotation_json",
  ];

  const rows = submissions.map((submission) => [
    submission.workId,
    submission.title,
    submission.guess.longitude,
    submission.guess.latitude,
    submission.confidence,
    submission.note,
    submission.score ?? "",
    submission.distanceKm ?? "",
    submission.createdAt,
    JSON.stringify(submission.navPlaceCandidate),
    submission.georeferenceAnnotation
      ? JSON.stringify(submission.georeferenceAnnotation)
      : "",
  ]);

  return [headers, ...rows]
    .map((row) =>
      row
        .map((value) => {
          const stringValue = String(value ?? "");
          return `"${stringValue.replace(/"/g, '""')}"`;
        })
        .join(","),
    )
    .join("\n");
}

export async function searchPlaces(query: string) {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", trimmedQuery);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("namedetails", "1");
  url.searchParams.set("limit", "8");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Place search failed.");
  }

  return (await response.json()) as PlaceSearchResult[];
}

export async function getGeoGuessWork(id: string) {
  return await apiGetRequest<GeoGuessWork>({
    url: `${getDcApiEndpoint()}/works/${id}`,
  });
}

function buildFullImageSelector(dimensions: {
  height: number;
  width: number;
}): GeoGuessSvgSelector {
  const w = formatSvgNumber(dimensions.width);
  const h = formatSvgNumber(dimensions.height);
  return {
    type: "SvgSelector",
    value: `<svg width="${w}" height="${h}"><polygon points="0,0 ${w},0 ${w},${h} 0,${h}" /></svg>`,
  };
}

export function buildGeoreferenceAnnotationFromGcps(
  work: GeoGuessWork,
  pairs: GcpPair[],
  confidence: GeoGuessSubmission["confidence"],
  note: string,
  createdAt: string,
  dimensions?: { height: number; width: number },
  options: { forPreview?: boolean } = {},
): GeoGuessGeoreferenceAnnotation | undefined {
  if (!pairs.length) return undefined;

  const source = resolveAnnotationSource(work, options);
  if (!source) return undefined;

  return {
    "@context": [georeferenceContext, presentationContext],
    body: {
      features: pairs.map((pair) => ({
        geometry: {
          coordinates: pair.geoCoords,
          type: "Point",
        },
        properties: {
          confidence,
          ...(note && { note }),
          resourceCoords: pair.resourceCoords,
        },
        type: "Feature",
      })),
      type: "FeatureCollection",
    },
    id: `urn:dc-nextjs:geo-guess:${work.id}:${encodeURIComponent(createdAt)}`,
    motivation: "georeferencing",
    target: {
      source: {
        ...source,
        ...(dimensions && {
          height: dimensions.height,
          width: dimensions.width,
        }),
      },
      type: "SpecificResource",
      ...(dimensions && { selector: buildFullImageSelector(dimensions) }),
    },
    type: "Annotation",
  };
}

export function buildGeoGuessSubmissionFromGcps(
  work: GeoGuessWork,
  pairs: GcpPair[],
  confidence: GeoGuessSubmission["confidence"],
  note: string,
  dimensions?: { height: number; width: number },
): GeoGuessSubmission {
  const longitude =
    pairs.reduce((sum, p) => sum + p.geoCoords[0], 0) / pairs.length;
  const latitude =
    pairs.reduce((sum, p) => sum + p.geoCoords[1], 0) / pairs.length;
  const guess = { latitude, longitude };

  const knownPlaces = getKnownPlaces(work);
  const closest = getClosestKnownPlace(guess, knownPlaces);
  const distanceKm = closest
    ? Number(closest.distanceKm.toFixed(2))
    : undefined;
  const createdAt = new Date().toISOString();
  const georeferenceAnnotation = buildGeoreferenceAnnotationFromGcps(
    work,
    pairs,
    confidence,
    note,
    createdAt,
    dimensions,
  );

  return {
    confidence,
    createdAt,
    ...(typeof distanceKm === "number" && {
      distanceKm,
      score: getGeoGuessScore(distanceKm),
    }),
    ...(georeferenceAnnotation && { georeferenceAnnotation }),
    guess: {
      coordinates: [longitude, latitude],
      latitude,
      longitude,
    },
    navPlaceCandidate: buildNavPlaceCandidates(work, guess, note),
    note,
    title: work.title || work.accession_number || "Untitled work",
    workId: work.id,
  };
}

export type AffineTransform = {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
};

function det3(m: number[][]) {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

function solve3x3(
  matrix: number[][],
  rhs: number[],
): [number, number, number] | null {
  const detM = det3(matrix);
  if (Math.abs(detM) < 1e-12) return null;

  const m0 = matrix.map((row, i) => [rhs[i], row[1], row[2]]);
  const m1 = matrix.map((row, i) => [row[0], rhs[i], row[2]]);
  const m2 = matrix.map((row, i) => [row[0], row[1], rhs[i]]);

  return [det3(m0) / detM, det3(m1) / detM, det3(m2) / detM];
}

export function computeAffineFromGcps(
  pairs: GcpPair[],
): AffineTransform | null {
  if (pairs.length < 2) return null;

  if (pairs.length === 2) {
    const [p1, p2] = pairs;
    const dx = p2.resourceCoords[0] - p1.resourceCoords[0];
    const dy = p2.resourceCoords[1] - p1.resourceCoords[1];
    if (Math.abs(dx) < 1e-9 || Math.abs(dy) < 1e-9) return null;

    const a = (p2.geoCoords[0] - p1.geoCoords[0]) / dx;
    const e = (p2.geoCoords[1] - p1.geoCoords[1]) / dy;
    const c = p1.geoCoords[0] - a * p1.resourceCoords[0];
    const f = p1.geoCoords[1] - e * p1.resourceCoords[1];
    return { a, b: 0, c, d: 0, e, f };
  }

  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  let sx = 0;
  let sy = 0;
  let sxlon = 0;
  let sylon = 0;
  let slon = 0;
  let sxlat = 0;
  let sylat = 0;
  let slat = 0;
  const n = pairs.length;

  for (const pair of pairs) {
    const [x, y] = pair.resourceCoords;
    const [lon, lat] = pair.geoCoords;
    sxx += x * x;
    sxy += x * y;
    syy += y * y;
    sx += x;
    sy += y;
    sxlon += x * lon;
    sylon += y * lon;
    slon += lon;
    sxlat += x * lat;
    sylat += y * lat;
    slat += lat;
  }

  const normalMatrix = [
    [sxx, sxy, sx],
    [sxy, syy, sy],
    [sx, sy, n],
  ];

  const lonParams = solve3x3(normalMatrix, [sxlon, sylon, slon]);
  const latParams = solve3x3(normalMatrix, [sxlat, sylat, slat]);

  if (!lonParams || !latParams) return null;

  return {
    a: lonParams[0],
    b: lonParams[1],
    c: lonParams[2],
    d: latParams[0],
    e: latParams[1],
    f: latParams[2],
  };
}

export function projectImagePoint(
  transform: AffineTransform,
  x: number,
  y: number,
): [number, number] {
  return [
    transform.a * x + transform.b * y + transform.c,
    transform.d * x + transform.e * y + transform.f,
  ];
}

export function getImageFootprint(
  pairs: GcpPair[],
  dimensions: { height: number; width: number },
): Array<[number, number]> | null {
  const transform = computeAffineFromGcps(pairs);
  if (!transform) return null;

  const corners: Array<[number, number]> = [
    [0, 0],
    [dimensions.width, 0],
    [dimensions.width, dimensions.height],
    [0, dimensions.height],
  ];

  return corners.map(([x, y]) => projectImagePoint(transform, x, y));
}

const georeferenceGenres = [
  "maps (documents)",
  "historical maps",
  "early maps",
  "city maps",
  "pictorial maps",
  "world maps",
  "topographic maps",
  "road maps",
  "tourist maps",
  "thematic maps",
  "geological maps",
];

const locateGenres = [
  "postcards",
  "photographs",
  "color photographs",
  "black-and-white photographs",
  "cabinet photographs",
  "photographic prints",
  "slides (photographs)",
  "color slides",
];

const geoGuessContextFields = [
  "title",
  "subject.label",
  "location.label",
  "collection.title",
  "description",
];

export type GeoGuessCandidateMode = "georeference" | "locate";

export function buildGeoGuessCandidateQuery(mode: GeoGuessCandidateMode) {
  const genres = mode === "locate" ? locateGenres : georeferenceGenres;

  return {
    bool: {
      filter: [
        { term: { work_type: "Image" } },
        { term: { visibility: "Public" } },
        { terms: { "genre.label": genres } },
      ],
      ...(mode === "georeference" && {
        must_not: [
          {
            multi_match: {
              query: "scrapbook",
              fields: geoGuessContextFields,
            },
          },
        ],
      }),
      ...(mode === "locate" && {
        must: [
          {
            multi_match: {
              query: "Northwestern University Evanston",
              fields: geoGuessContextFields,
            },
          },
        ],
      }),
    },
  };
}

export async function getGeoGuessWorkCandidates(
  seed: number,
  mode: GeoGuessCandidateMode = "georeference",
) {
  const response = await apiPostRequest<ApiSearchResponse>({
    url: `${getDcApiEndpoint()}/search`,
    body: {
      _source: geoGuessSourceFields,
      query: {
        function_score: {
          query: buildGeoGuessCandidateQuery(mode),
          functions: [{ random_score: { seed } }],
        },
      },
      size: 24,
    },
  });

  return (response?.data || []) as GeoGuessWork[];
}
