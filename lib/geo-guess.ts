import { DCAPI_PRODUCTION_ENDPOINT } from "@/lib/constants/endpoints";
import { apiGetRequest, apiPostRequest } from "@/lib/dc-api";

import { ApiSearchResponse } from "@/types/api/response";
import type { Work } from "@nulib/dcapi-types";

type NavPlaceLabel = string | Record<string, string[]>;

export type NavPlace = {
  coordinates?: [number, number];
  id?: string;
  label?: NavPlaceLabel;
  summary?: NavPlaceLabel;
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

function getDisplayLabel(value?: NavPlaceLabel) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";

  const values = Object.values(value).find(
    (entry) => Array.isArray(entry) && entry.length,
  );
  return values?.[0] || "";
}

export function formatCoordinate(value: number, axis: "lat" | "lng") {
  const direction =
    axis === "lat" ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";

  return `${Math.abs(value).toFixed(5)} ${direction}`;
}

export function getKnownPlaces(work?: GeoGuessWork | null) {
  if (!work?.nav_place || !Array.isArray(work.nav_place)) return [];

  return work.nav_place
    .filter((place) => {
      const coordinates = place.coordinates || [];
      return (
        coordinates.length >= 2 &&
        typeof coordinates[0] === "number" &&
        typeof coordinates[1] === "number"
      );
    })
    .map((place) => ({
      ...place,
      label: getDisplayLabel(place.label),
      summary: getDisplayLabel(place.summary),
    }));
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
    ...(place.label && { label: getDisplayLabel(place.label) }),
    ...(place.summary && {
      summary: getDisplayLabel(place.summary),
    }),
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
