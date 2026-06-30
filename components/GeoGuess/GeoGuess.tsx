import {
  CameraIcon,
  ClipboardCopyIcon,
  Cross1Icon,
  Crosshair2Icon,
  DownloadIcon,
  EnterFullScreenIcon,
  ExternalLinkIcon,
  GlobeIcon,
  Half2Icon,
  LayersIcon,
  MagnifyingGlassIcon,
  ShuffleIcon,
  TargetIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@radix-ui/react-icons";
import {
  GcpPair,
  GeoGuessGeoreferenceAnnotation,
  GeoGuessSubmission,
  GeoGuessWork,
  PlaceSearchResult,
  buildGeoGuessCsv,
  buildGeoGuessSubmission,
  buildGeoGuessSubmissionFromGcps,
  buildGeoreferenceAnnotationFromGcps,
  formatCoordinate,
  getGeoGuessWork,
  getGeoGuessWorkCandidates,
  getKnownPlaces,
  searchPlaces,
} from "@/lib/geo-guess";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { CloverImageProps } from "@samvera/clover-iiif/image";
import type { CloverMapProps, MapMarker } from "@samvera/clover-iiif/map";
import Link from "next/link";
import dynamic from "next/dynamic";
import { styled } from "@/stitches.config";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";

const CloverImage = dynamic<CloverImageProps>(
  () => import("@samvera/clover-iiif/image"),
  {
    ssr: false,
  },
);

const CloverMap = dynamic<CloverMapProps>(
  () => import("@samvera/clover-iiif/map"),
  {
    ssr: false,
  },
);

const storageKey = "dc-nextjs:geo-guess-submissions";

type GuessPoint = {
  latitude: number;
  longitude: number;
};

type MapFocus = GuessPoint & {
  label?: string;
  nonce: number;
  zoom: number;
};

type LoadState = "idle" | "loading" | "error";

type GeoGuessMode = "georeference" | "locate";

type ImageDimensions = { height: number; width: number };

function getWorkImage(work?: GeoGuessWork | null) {
  if (!work) return "";

  if (work.representative_file_set?.url) {
    return `${work.representative_file_set.url}/full/1200,/0/default.jpg`;
  }

  return work.thumbnail || "";
}

function getWorkImageService(work?: GeoGuessWork | null) {
  return work?.representative_file_set?.url || "";
}

function getControlledLabels(
  values: Array<{ label?: string | null } | string> | undefined,
) {
  if (!values?.length) return [];

  return values
    .map((value) => (typeof value === "string" ? value : value.label))
    .filter(Boolean)
    .slice(0, 4);
}

function buildWorkContext(work?: GeoGuessWork | null) {
  if (!work) return [];

  return [
    work.collection?.title,
    ...(work.date_created || []).slice(0, 2),
    ...getControlledLabels(work.genre),
    ...getControlledLabels(work.subject),
    ...getControlledLabels(work.location),
  ].filter(Boolean);
}

const GeoGuess: React.FC = () => {
  const router = useRouter();
  const [submissions, setSubmissions] = useLocalStorage(storageKey, []);
  const typedSubmissions = (submissions || []) as GeoGuessSubmission[];
  const [work, setWork] = useState<GeoGuessWork | null>(null);
  const [candidates, setCandidates] = useState<GeoGuessWork[]>([]);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<GeoGuessMode>("georeference");
  const [gcpPairs, setGcpPairs] = useState<GcpPair[]>([]);
  const [pendingImageCoords, setPendingImageCoords] = useState<
    [number, number] | null
  >(null);
  const pendingImageCoordsRef = useRef<[number, number] | null>(null);
  const [locateGuess, setLocateGuess] = useState<GuessPoint | null>(null);
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [note, setNote] = useState("");
  const [confidence, setConfidence] =
    useState<GeoGuessSubmission["confidence"]>("medium");
  const [lastSubmission, setLastSubmission] =
    useState<GeoGuessSubmission | null>(null);
  const [copied, setCopied] = useState(false);
  const [mapFocus, setMapFocus] = useState<MapFocus | null>(null);
  const requestedWorkId =
    typeof router.query.work === "string" ? router.query.work : undefined;

  const knownPlaces = useMemo(() => getKnownPlaces(work), [work]);

  const workContext = useMemo(() => buildWorkContext(work), [work]);
  const imageUrl = getWorkImage(work);
  const imageServiceUrl = getWorkImageService(work);

  useEffect(() => {
    pendingImageCoordsRef.current = pendingImageCoords;
  }, [pendingImageCoords]);

  const resetRound = useCallback(() => {
    setGcpPairs([]);
    setPendingImageCoords(null);
    setLocateGuess(null);
    setImageDimensions(null);
    setNote("");
    setConfidence("medium");
    setLastSubmission(null);
    setCopied(false);
  }, []);

  const handleModeChange = useCallback((nextMode: GeoGuessMode) => {
    setMode(nextMode);
    setPendingImageCoords(null);
    setLocateGuess(null);
    setLastSubmission(null);
    setCopied(false);
  }, []);

  const liveAnnotation = useMemo<GeoGuessGeoreferenceAnnotation | null>(() => {
    if (mode !== "georeference") return null;
    if (!work || gcpPairs.length < 3) return null;
    if (!work.representative_file_set?.url) return null;
    if (!imageDimensions) return null;
    return (
      buildGeoreferenceAnnotationFromGcps(
        work,
        gcpPairs,
        "medium",
        "",
        "preview",
        imageDimensions,
        { forPreview: true },
      ) || null
    );
  }, [gcpPairs, imageDimensions, mode, work]);

  const canWarp = Boolean(liveAnnotation);
  const previewActive = mode === "georeference" && showPreview;

  const loadRandomCandidates = useCallback(
    async (forMode: GeoGuessMode) => {
      setLoadState("loading");
      setError("");
      resetRound();

      try {
        const nextCandidates = await getGeoGuessWorkCandidates(
          Date.now(),
          forMode,
        );
        const playableCandidates = nextCandidates.filter(
          (candidate) => candidate.id && getWorkImage(candidate),
        );

        setCandidates(playableCandidates);
        setCandidateIndex(0);
        setWork(playableCandidates[0] || null);
        setLoadState("idle");
      } catch (err) {
        setLoadState("error");
        setError(err instanceof Error ? err.message : "Could not load works.");
      }
    },
    [resetRound],
  );

  useEffect(() => {
    if (!router.isReady) return;

    if (!requestedWorkId) {
      loadRandomCandidates(mode);
      return;
    }

    (async () => {
      setLoadState("loading");
      setError("");
      resetRound();

      try {
        const requestedWork = await getGeoGuessWork(requestedWorkId);
        setWork(requestedWork || null);
        setCandidates([]);
        setCandidateIndex(0);
        setLoadState("idle");
      } catch (err) {
        setLoadState("error");
        setError(err instanceof Error ? err.message : "Could not load work.");
      }
    })();
    // mode is intentionally a dep — switching modes refetches candidates
    // suited to that mode.
  }, [loadRandomCandidates, mode, requestedWorkId, resetRound, router.isReady]);

  const handleNextWork = () => {
    resetRound();

    if (requestedWorkId) {
      router.push("/geo-guess");
      return;
    }

    const nextIndex = candidateIndex + 1;

    if (nextIndex < candidates.length) {
      setCandidateIndex(nextIndex);
      setWork(candidates[nextIndex]);
      return;
    }

    loadRandomCandidates(mode);
  };

  const handleImagePointClick = useCallback(
    (resourceCoords: [number, number]) => {
      setPendingImageCoords(resourceCoords);
      setLastSubmission(null);
    },
    [],
  );

  const handlePairComplete = useCallback((geo: GuessPoint) => {
    const coords = pendingImageCoordsRef.current;
    if (!coords) return;

    setGcpPairs((prev) => [
      ...prev,
      {
        geoCoords: [geo.longitude, geo.latitude] as [number, number],
        id: `gcp-${Date.now()}`,
        resourceCoords: coords,
      },
    ]);
    setPendingImageCoords(null);
    setLastSubmission(null);
  }, []);

  const handleLocateGuess = useCallback((geo: GuessPoint) => {
    setLocateGuess(geo);
    setLastSubmission(null);
  }, []);

  const handleImageDimensions = useCallback((dimensions: ImageDimensions) => {
    setImageDimensions(dimensions);
  }, []);

  const handleRemovePair = useCallback((id: string) => {
    setGcpPairs((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handlePlaceSelect = useCallback((result: PlaceSearchResult) => {
    setMapFocus({
      latitude: Number(Number(result.lat).toFixed(5)),
      longitude: Number(Number(result.lon).toFixed(5)),
      label: result.name || result.display_name,
      nonce: Date.now(),
      zoom: result.category === "place" ? 10 : 16,
    });
    setLastSubmission(null);
  }, []);

  const handleSubmit = () => {
    if (!work) return;

    let submission: GeoGuessSubmission | null = null;

    if (mode === "georeference" && gcpPairs.length) {
      submission = buildGeoGuessSubmissionFromGcps(
        work,
        gcpPairs,
        confidence,
        note,
        imageDimensions || undefined,
      );
    } else if (mode === "locate" && locateGuess) {
      submission = buildGeoGuessSubmission(work, locateGuess, confidence, note);
    }

    if (!submission) return;
    setSubmissions([submission, ...typedSubmissions].slice(0, 250));
    setLastSubmission(submission);
  };

  const canSubmit =
    mode === "georeference" ? gcpPairs.length > 0 : Boolean(locateGuess);

  const handleCopy = async (content: unknown) => {
    if (!lastSubmission || !navigator.clipboard) return;

    await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopied(true);
  };

  const handleCsvExport = () => {
    const csv = buildGeoGuessCsv(typedSubmissions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "dc-geo-guess-submissions.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <GeoGuessStyled>
      <header>
        <div>
          <p>
            <GlobeIcon /> Community georeferencing
          </p>
          <h1>GeoGuess DC</h1>
        </div>
        <div>
          <button type="button" onClick={handleNextWork}>
            <ShuffleIcon /> Next
          </button>
          <button
            type="button"
            onClick={handleCsvExport}
            disabled={!typedSubmissions.length}
          >
            <DownloadIcon /> CSV
          </button>
        </div>
      </header>

      {loadState === "error" && (
        <StatusBanner data-status="error">{error}</StatusBanner>
      )}

      <GameSurface>
        <WorkspaceControls>
          <ModeSwitch role="tablist" aria-label="GeoGuess mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "georeference"}
              data-active={mode === "georeference"}
              onClick={() => handleModeChange("georeference")}
            >
              <LayersIcon />
              <span>
                <strong>Georeference</strong>
                <em>Maps & aerials — link image features to map points</em>
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "locate"}
              data-active={mode === "locate"}
              onClick={() => handleModeChange("locate")}
            >
              <CameraIcon />
              <span>
                <strong>Locate</strong>
                <em>Ground-level photos — drop one pin where it was taken</em>
              </span>
            </button>
          </ModeSwitch>

          <PanelHeader>
            <div>
              <p>
                {mode === "georeference" ? (
                  <>
                    <Crosshair2Icon /> Place control points
                  </>
                ) : (
                  <>
                    <TargetIcon /> Drop a single guess pin
                  </>
                )}
              </p>
              <h2>
                {mode === "georeference"
                  ? "Where on the map does this image lie?"
                  : "Where was this photo taken?"}
              </h2>
            </div>
            <KnownBadge data-known={knownPlaces.length > 0}>
              {knownPlaces.length > 0 ? "Known answer" : "Needs location"}
            </KnownBadge>
          </PanelHeader>
        </WorkspaceControls>

        <ImagePanel>
          {loadState === "loading" && (
            <LoadingBlock>Loading work...</LoadingBlock>
          )}
          {loadState !== "loading" && work && (
            <>
              <ImageStage>
                {imageUrl ? (
                  <GeoGuessImageAnnotator
                    gcpPairs={gcpPairs}
                    imageServiceUrl={imageServiceUrl}
                    imageUrl={imageUrl}
                    interactive={mode === "georeference"}
                    label={work.title || "Digital collections item"}
                    onDimensions={handleImageDimensions}
                    onPointClick={handleImagePointClick}
                    pendingImageCoords={pendingImageCoords}
                  />
                ) : (
                  <LoadingBlock>No image preview available.</LoadingBlock>
                )}
              </ImageStage>
              <WorkDetails>
                <div>
                  <h2>
                    {work.title || work.accession_number || "Untitled work"}
                  </h2>
                  {work.collection?.title && <p>{work.collection.title}</p>}
                </div>
                <Link href={`/items/${work.id}`}>
                  <ExternalLinkIcon /> Item
                </Link>
              </WorkDetails>
              {workContext.length > 0 && (
                <ContextList aria-label="Clues from the item record">
                  {workContext.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ContextList>
              )}
            </>
          )}
        </ImagePanel>

        <GuessPanel>
          <MapFrame>
            <CloverGuessMap
              gcpPairs={mode === "georeference" ? gcpPairs : []}
              isPendingPair={
                mode === "georeference" && Boolean(pendingImageCoords)
              }
              knownPlaces={knownPlaces}
              locateGuess={mode === "locate" ? locateGuess : null}
              mapFocus={mapFocus}
              mode={mode}
              onLocateGuess={handleLocateGuess}
              onPairComplete={handlePairComplete}
              revealKnown={Boolean(lastSubmission)}
              warpAnnotation={previewActive ? liveAnnotation : null}
            />

            {mode === "georeference" && gcpPairs.length >= 2 && (
              <FootprintToggle>
                <label>
                  <input
                    type="checkbox"
                    checked={showPreview}
                    disabled={!canWarp}
                    onChange={(event) => setShowPreview(event.target.checked)}
                  />
                  <Half2Icon /> Preview rectified image on map
                </label>
              </FootprintToggle>
            )}
          </MapFrame>

          <PlaceSearch onSelect={handlePlaceSelect} />

          {mode === "georeference" && pendingImageCoords && (
            <PendingBanner>
              <Crosshair2Icon /> Point {gcpPairs.length + 1} placed on image —
              now click the map to link it
            </PendingBanner>
          )}

          {mode === "georeference" && gcpPairs.length > 0 && (
            <GcpPairList>
              {gcpPairs.map((pair, i) => (
                <li key={pair.id}>
                  <span>#{i + 1}</span>
                  <span>
                    {formatCoordinate(pair.geoCoords[1], "lat")},{" "}
                    {formatCoordinate(pair.geoCoords[0], "lng")}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove control point ${i + 1}`}
                    onClick={() => handleRemovePair(pair.id)}
                  >
                    <Cross1Icon />
                  </button>
                </li>
              ))}
            </GcpPairList>
          )}

          {mode === "locate" && locateGuess && (
            <LocateGuessSummary>
              <span>Your guess</span>
              <strong>
                {formatCoordinate(locateGuess.latitude, "lat")},{" "}
                {formatCoordinate(locateGuess.longitude, "lng")}
              </strong>
              <button
                type="button"
                aria-label="Clear guess"
                onClick={() => setLocateGuess(null)}
              >
                <Cross1Icon /> Clear
              </button>
            </LocateGuessSummary>
          )}

          <ContributionForm>
            <label>
              Confidence
              <select
                value={confidence}
                onChange={(event) =>
                  setConfidence(
                    event.target.value as GeoGuessSubmission["confidence"],
                  )
                }
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>
            <label>
              Evidence or note
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Street sign, skyline, collection context..."
              />
            </label>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || !work}
            >
              <TargetIcon />{" "}
              {mode === "georeference"
                ? `Submit ${
                    gcpPairs.length > 0
                      ? `(${gcpPairs.length} point${gcpPairs.length > 1 ? "s" : ""})`
                      : "guess"
                  }`
                : "Submit guess"}
            </button>
          </ContributionForm>

          {lastSubmission && (
            <ResultPanel>
              {typeof lastSubmission.score === "number" ? (
                <>
                  <strong>
                    {lastSubmission.score.toLocaleString()} points
                  </strong>
                  <span>
                    {lastSubmission.distanceKm} km from known location
                  </span>
                </>
              ) : (
                <>
                  <strong>Candidate saved</strong>
                  <span>Ready for curator review and Meadow update.</span>
                </>
              )}
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    lastSubmission.georeferenceAnnotation ||
                      lastSubmission.navPlaceCandidate,
                  )
                }
              >
                <ClipboardCopyIcon />{" "}
                {copied
                  ? "Copied"
                  : lastSubmission.georeferenceAnnotation
                    ? "Copy georef JSON"
                    : "Copy Meadow nav_place JSON"}
              </button>
            </ResultPanel>
          )}
        </GuessPanel>
      </GameSurface>
    </GeoGuessStyled>
  );
};

type CloverGuessMapProps = {
  gcpPairs: GcpPair[];
  isPendingPair: boolean;
  knownPlaces: ReturnType<typeof getKnownPlaces>;
  locateGuess: GuessPoint | null;
  mapFocus: MapFocus | null;
  mode: GeoGuessMode;
  onLocateGuess: (guess: GuessPoint) => void;
  onPairComplete: (guess: GuessPoint) => void;
  revealKnown: boolean;
  warpAnnotation: GeoGuessGeoreferenceAnnotation | null;
};

type GeoGuessImageAnnotatorProps = {
  gcpPairs: GcpPair[];
  imageServiceUrl?: string;
  imageUrl: string;
  interactive: boolean;
  label: string;
  onDimensions: (dimensions: ImageDimensions) => void;
  onPointClick: (resourceCoords: [number, number]) => void;
  pendingImageCoords: [number, number] | null;
};

const GeoGuessImageAnnotator: React.FC<GeoGuessImageAnnotatorProps> = ({
  gcpPairs,
  imageServiceUrl,
  imageUrl,
  interactive,
  label,
  onDimensions,
  onPointClick,
  pendingImageCoords,
}) => {
  const shellRef = useRef<HTMLDivElement>(null);
  // CloverImage hands back OpenSeadragon's Viewer instance, but its callback is
  // typed as `any` by Clover.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);
  const viewerCleanupRef = useRef<(() => void) | null>(null);
  const markerFrameRef = useRef<number | null>(null);
  const imagePointsRef = useRef<
    Array<{
      coords: [number, number];
      isPending?: boolean;
      label: number;
    }>
  >([]);
  const interactiveRef = useRef(interactive);
  const onDimensionsRef = useRef(onDimensions);
  const onPointClickRef = useRef(onPointClick);
  const hasInitializedViewRef = useRef(false);
  const hasRefreshedInitialTileRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [imagePointMarkers, setImagePointMarkers] = useState<
    Array<{
      key: string;
      isPending: boolean;
      label: number;
      left: number;
      top: number;
    }>
  >([]);

  useEffect(() => {
    interactiveRef.current = interactive;
  }, [interactive]);

  useEffect(() => {
    onDimensionsRef.current = onDimensions;
  }, [onDimensions]);

  useEffect(() => {
    onPointClickRef.current = onPointClick;
  }, [onPointClick]);

  useEffect(() => {
    imagePointsRef.current = [
      ...gcpPairs.map((p, i) => ({
        coords: p.resourceCoords,
        label: i + 1,
      })),
      ...(pendingImageCoords
        ? [
            {
              coords: pendingImageCoords,
              isPending: true,
              label: gcpPairs.length + 1,
            },
          ]
        : []),
    ];
  }, [gcpPairs, pendingImageCoords]);

  const updateImagePointMarkers = useCallback(() => {
    const viewer = viewerRef.current;
    const viewerElement = viewer?.element as HTMLElement | undefined;
    if (!viewer || !viewerElement || !viewer.viewport) return;

    const item = viewer.world?.getItemAt?.(0);
    if (!item) {
      setImagePointMarkers([]);
      return;
    }

    const viewerRect = viewerElement.getBoundingClientRect();
    const shellRect = shellRef.current?.getBoundingClientRect();
    const offsetLeft = shellRect ? viewerRect.left - shellRect.left : 0;
    const offsetTop = shellRect ? viewerRect.top - shellRect.top : 0;

    const nextMarkers = imagePointsRef.current
      .map((point, index) => {
        if (!point.coords?.length) return null;

        const viewportPoint = item.imageToViewportCoordinates
          ? item.imageToViewportCoordinates(
              point.coords[0],
              point.coords[1],
              true,
            )
          : viewer.viewport.imageToViewportCoordinates(
              point.coords[0],
              point.coords[1],
            );
        const pixelPoint = viewer.viewport.pixelFromPoint(viewportPoint, true);

        return {
          key: `${point.label || index + 1}-${point.coords[0]}-${point.coords[1]}-${point.isPending ? "pending" : "saved"}`,
          isPending: Boolean(point.isPending),
          label: point.label || index + 1,
          left: pixelPoint.x + offsetLeft,
          top: pixelPoint.y + offsetTop,
        };
      })
      .filter(Boolean) as typeof imagePointMarkers;

    setImagePointMarkers((currentMarkers) => {
      const hasChanged =
        currentMarkers.length !== nextMarkers.length ||
        currentMarkers.some((marker, index) => {
          const nextMarker = nextMarkers[index];
          return (
            marker.key !== nextMarker.key ||
            marker.label !== nextMarker.label ||
            marker.isPending !== nextMarker.isPending ||
            Math.abs(marker.left - nextMarker.left) > 0.5 ||
            Math.abs(marker.top - nextMarker.top) > 0.5
          );
        });

      return hasChanged ? nextMarkers : currentMarkers;
    });
  }, []);

  const scheduleImagePointMarkerUpdate = useCallback(() => {
    if (markerFrameRef.current) return;

    markerFrameRef.current = window.requestAnimationFrame(() => {
      markerFrameRef.current = null;
      updateImagePointMarkers();
    });
  }, [updateImagePointMarkers]);

  const refreshViewer = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.forceResize?.();
    viewer.viewport?.applyConstraints?.();
    viewer.forceRedraw?.();
  }, []);

  const queueViewerRefresh = useCallback(() => {
    window.requestAnimationFrame(() => {
      refreshViewer();
      window.requestAnimationFrame(refreshViewer);
    });
    window.setTimeout(refreshViewer, 0);
    window.setTimeout(refreshViewer, 100);
    window.setTimeout(refreshViewer, 300);
  }, [refreshViewer]);

  const handleViewerReady = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    setIsReady(true);
    scheduleImagePointMarkerUpdate();

    if (hasInitializedViewRef.current) return;
    if (!viewer.world?.getItemCount?.()) return;
    hasInitializedViewRef.current = true;

    viewer.viewport?.goHome?.(true);
    queueViewerRefresh();

    const item = viewer.world?.getItemAt?.(0);
    const size = item?.getContentSize?.();
    if (size?.x && size?.y) {
      onDimensionsRef.current({
        height: Math.round(size.y),
        width: Math.round(size.x),
      });
    }
  }, [queueViewerRefresh, scheduleImagePointMarkerUpdate]);

  const handleOpenSeadragonCallback = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (viewer: any) => {
      if (!viewer || viewerRef.current === viewer) return;

      viewerCleanupRef.current?.();
      viewerRef.current = viewer;
      hasInitializedViewRef.current = false;
      hasRefreshedInitialTileRef.current = false;
      setIsReady(false);
      setIsPanning(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleCanvasClick = (event: any) => {
        if (!interactiveRef.current) return;
        if (event.quick === false) return;

        event.preventDefaultAction = true;
        const viewportPoint = viewer.viewport.pointFromPixel(event.position);
        const imagePoint =
          viewer.viewport.viewportToImageCoordinates(viewportPoint);

        onPointClickRef.current([
          Number(imagePoint.x.toFixed(2)),
          Number(imagePoint.y.toFixed(2)),
        ]);
      };

      const handlePanning = () => setIsPanning(true);
      const handlePanningEnd = () => setIsPanning(false);
      const handleInitialTileLoaded = () => {
        handleViewerReady();
        if (hasRefreshedInitialTileRef.current) return;
        hasRefreshedInitialTileRef.current = true;
        queueViewerRefresh();
        scheduleImagePointMarkerUpdate();
      };
      const handleViewportUpdate = () => scheduleImagePointMarkerUpdate();

      viewer.addHandler("canvas-click", handleCanvasClick);
      viewer.addHandler("canvas-drag", handlePanning);
      viewer.addHandler("canvas-drag-end", handlePanningEnd);
      viewer.addHandler("canvas-release", handlePanningEnd);
      viewer.addHandler("canvas-exit", handlePanningEnd);
      viewer.addHandler("open", handleViewerReady);
      viewer.addHandler("tile-loaded", handleInitialTileLoaded);
      viewer.addHandler("animation", handleViewportUpdate);
      viewer.addHandler("animation-finish", handleViewportUpdate);
      viewer.addHandler("resize", handleViewportUpdate);
      viewer.addHandler("update-viewport", handleViewportUpdate);
      viewer.world?.addHandler("add-item", handleViewerReady);

      viewerCleanupRef.current = () => {
        viewer.removeHandler("canvas-click", handleCanvasClick);
        viewer.removeHandler("canvas-drag", handlePanning);
        viewer.removeHandler("canvas-drag-end", handlePanningEnd);
        viewer.removeHandler("canvas-release", handlePanningEnd);
        viewer.removeHandler("canvas-exit", handlePanningEnd);
        viewer.removeHandler("open", handleViewerReady);
        viewer.removeHandler("tile-loaded", handleInitialTileLoaded);
        viewer.removeHandler("animation", handleViewportUpdate);
        viewer.removeHandler("animation-finish", handleViewportUpdate);
        viewer.removeHandler("resize", handleViewportUpdate);
        viewer.removeHandler("update-viewport", handleViewportUpdate);
        viewer.world?.removeHandler("add-item", handleViewerReady);
      };

      if (viewer.world?.getItemCount?.() > 0) handleViewerReady();
      queueViewerRefresh();
      scheduleImagePointMarkerUpdate();
    },
    [handleViewerReady, queueViewerRefresh, scheduleImagePointMarkerUpdate],
  );

  useEffect(() => {
    setIsReady(false);
    setIsPanning(false);
    setImagePointMarkers([]);
    hasInitializedViewRef.current = false;
    hasRefreshedInitialTileRef.current = false;
    viewerRef.current?.clearOverlays?.();
  }, [imageServiceUrl, imageUrl]);

  useEffect(() => {
    scheduleImagePointMarkerUpdate();
  }, [gcpPairs, pendingImageCoords, scheduleImagePointMarkerUpdate]);

  useEffect(
    () => () => {
      viewerCleanupRef.current?.();
      if (markerFrameRef.current) {
        window.cancelAnimationFrame(markerFrameRef.current);
      }
      viewerCleanupRef.current = null;
      markerFrameRef.current = null;
      viewerRef.current = null;
    },
    [],
  );

  const cloverImageConfig = useMemo(
    () => ({
      gestureSettingsMouse: {
        clickToZoom: false,
        dblClickToZoom: true,
        dragToPan: true,
        scrollToZoom: true,
      },
      gestureSettingsPen: {
        clickToZoom: false,
        dragToPan: true,
      },
      gestureSettingsTouch: {
        clickToZoom: false,
        dblClickToZoom: true,
        dragToPan: true,
      },
      immediateRender: true,
      maxZoomPixelRatio: 4,
      showNavigationControl: false,
      showNavigator: true,
      showRotationControl: false,
    }),
    [],
  );

  const zoomBy = (factor: number) => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.viewport?.zoomBy?.(factor);
    viewer.viewport?.applyConstraints?.();
    scheduleImagePointMarkerUpdate();
  };

  const goHome = () => {
    viewerRef.current?.viewport?.goHome?.();
    scheduleImagePointMarkerUpdate();
  };

  const src = imageServiceUrl?.replace(/\/$/, "") || imageUrl;

  return (
    <ImageAnnotatorShell ref={shellRef}>
      <ImageAnnotatorStatus data-interactive={interactive}>
        <span>
          {interactive ? <Crosshair2Icon /> : <CameraIcon />}{" "}
          {isReady
            ? interactive
              ? "Click image to place a control point"
              : "Inspect the photo — drop your guess on the map"
            : "Loading image…"}
        </span>
        <ZoomControls>
          <button
            type="button"
            aria-label="Zoom in"
            disabled={!isReady}
            onClick={() => zoomBy(1.4)}
          >
            <ZoomInIcon />
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            disabled={!isReady}
            onClick={() => zoomBy(1 / 1.4)}
          >
            <ZoomOutIcon />
          </button>
          <button
            type="button"
            aria-label="Reset view"
            disabled={!isReady}
            onClick={goHome}
          >
            <EnterFullScreenIcon />
          </button>
        </ZoomControls>
      </ImageAnnotatorStatus>
      <ImageAnnotatorCanvas
        data-panning={isPanning}
        data-interactive={interactive}
      >
        <CloverImage
          instanceId="geo-guess-image-coordinate-picker"
          isTiledImage={Boolean(imageServiceUrl)}
          label={label}
          openSeadragonCallback={handleOpenSeadragonCallback}
          openSeadragonConfig={cloverImageConfig}
          src={src}
        />
        <ImagePointLayer aria-hidden="true">
          {isReady &&
            imagePointMarkers.map((marker) => (
              <ImagePointMarker
                key={marker.key}
                data-pending={marker.isPending}
                style={{
                  left: `${marker.left}px`,
                  top: `${marker.top}px`,
                }}
              >
                {marker.label}
              </ImagePointMarker>
            ))}
        </ImagePointLayer>
      </ImageAnnotatorCanvas>
    </ImageAnnotatorShell>
  );
};

const CloverGuessMap: React.FC<CloverGuessMapProps> = ({
  gcpPairs,
  isPendingPair,
  knownPlaces,
  locateGuess,
  mapFocus,
  mode,
  onLocateGuess,
  onPairComplete,
  revealKnown,
  warpAnnotation,
}) => {
  const firstKnownPlace = knownPlaces[0]?.coordinates;
  const defaultCenter = useMemo(
    () =>
      firstKnownPlace
        ? {
            latitude: Number(firstKnownPlace[1]),
            longitude: Number(firstKnownPlace[0]),
            zoom: 6,
          }
        : { latitude: 20, longitude: 0, zoom: 2 },
    [firstKnownPlace],
  );

  const center = mapFocus
    ? {
        latitude: mapFocus.latitude,
        longitude: mapFocus.longitude,
        zoom: mapFocus.zoom,
      }
    : defaultCenter;

  const markers = useMemo<MapMarker[]>(
    () => [
      ...gcpPairs.map((pair, i) => ({
        latitude: pair.geoCoords[1],
        longitude: pair.geoCoords[0],
        label: `#${i + 1}`,
        color: "#4e2a84",
      })),
      ...(locateGuess
        ? [
            {
              latitude: locateGuess.latitude,
              longitude: locateGuess.longitude,
              label: "Your guess",
              color: "#4e2a84",
            },
          ]
        : []),
      ...(revealKnown
        ? knownPlaces
            .map((place) => ({
              latitude: Number(place.coordinates?.[1]),
              longitude: Number(place.coordinates?.[0]),
              label: place.label || "Known place",
              color: "#008656",
            }))
            .filter(
              (place) =>
                !Number.isNaN(place.latitude) && !Number.isNaN(place.longitude),
            )
        : []),
    ],
    [gcpPairs, knownPlaces, locateGuess, revealKnown],
  );

  const handleMapClick = useCallback(
    ([longitude, latitude]: [number, number]) => {
      const guess = {
        latitude: Number(latitude.toFixed(5)),
        longitude: Number(longitude.toFixed(5)),
      };

      if (mode === "locate") {
        onLocateGuess(guess);
        return;
      }

      if (!isPendingPair) return;
      onPairComplete(guess);
    },
    [isPendingPair, mode, onLocateGuess, onPairComplete],
  );

  const useCrosshairCursor =
    (mode === "georeference" && isPendingPair) || mode === "locate";

  return (
    <CloverMapShell data-pending={isPendingPair}>
      <CloverMap
        center={center}
        fitToData={!mapFocus}
        georefAnnotation={warpAnnotation}
        imageOverlayOpacity={0.85}
        markers={markers}
        onMapClick={handleMapClick}
        showControlPoints={false}
        showImageOverlay
        useCrosshairCursor={useCrosshairCursor}
      />
    </CloverMapShell>
  );
};

type PlaceSearchProps = {
  onSelect: (result: PlaceSearchResult) => void;
};

const PlaceSearch: React.FC<PlaceSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const exampleQueries = [
    "Northwestern University Library",
    "Lagos, Nigeria",
    "Eiffel Tower",
  ];

  const handleSearch = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setError("");

    try {
      const placeResults = await searchPlaces(query);
      setResults(placeResults);
      if (!placeResults.length) setError("No places found.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Place search failed.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleExample = (example: string) => {
    setQuery(example);
    setResults([]);
    setError("");
  };

  return (
    <PlaceSearchStyled onSubmit={handleSearch}>
      <label>
        Search places
        <span>Buildings, campuses, neighborhoods, cities, countries</span>
      </label>
      <div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a place or landmark"
        />
        <button type="submit" disabled={isSearching || !query.trim()}>
          <MagnifyingGlassIcon /> {isSearching ? "Searching" : "Search"}
        </button>
      </div>
      <ExampleQueries>
        {exampleQueries.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => handleExample(example)}
          >
            {example}
          </button>
        ))}
      </ExampleQueries>
      {error && <PlaceSearchMessage>{error}</PlaceSearchMessage>}
      {results.length > 0 && (
        <PlaceResults>
          {results.map((result) => (
            <li key={result.place_id}>
              <button type="button" onClick={() => onSelect(result)}>
                <strong>
                  {result.name || result.display_name.split(",")[0]}
                </strong>
                <span>{result.display_name}</span>
              </button>
            </li>
          ))}
        </PlaceResults>
      )}
    </PlaceSearchStyled>
  );
};

const GeoGuessStyled = styled("section", {
  background: "#f8f7f4",
  color: "$black80",
  minHeight: "calc(100vh - 260px)",
  padding: "$gr5 0 $gr6",

  "> header": {
    width: "min(1500px, calc(100vw - 48px))",
    margin: "0 auto $gr4",
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    gap: "$gr3",

    "@sm": {
      alignItems: "stretch",
      flexDirection: "column",
      width: "min(100% - 28px, 1500px)",
    },

    p: {
      display: "flex",
      alignItems: "center",
      gap: "$gr2",
      margin: "0 0 $gr1",
      color: "$darkGreen",
      fontFamily: "$northwesternSansBold",
      fontSize: "$gr2",
      textTransform: "uppercase",
    },

    h1: {
      margin: "0",
      color: "$purple",
      fontFamily: "$northwesternDisplayBold",
      fontSize: "clamp(2.75rem, 5rem, 5.75rem)",
      letterSpacing: "0",
      lineHeight: "0.94",
    },

    "> div:last-child": {
      display: "flex",
      gap: "$gr2",
      flexWrap: "wrap",
    },

    button: {
      alignItems: "center",
      background: "$purple",
      border: "0",
      color: "$white",
      cursor: "pointer",
      display: "inline-flex",
      fontFamily: "$northwesternSansBold",
      gap: "$gr1",
      minHeight: "$gr5",
      padding: "0 $gr3",

      "&:disabled": {
        background: "$black20",
        cursor: "not-allowed",
      },
    },
  },
});

const GameSurface = styled("div", {
  width: "min(1500px, calc(100vw - 48px))",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "$gr4",
  alignItems: "start",

  "@lg": {
    gridTemplateColumns: "1fr",
  },

  "@sm": {
    width: "min(100% - 28px, 1500px)",
  },
});

const WorkspaceControls = styled("div", {
  background: "$white",
  border: "1px solid $black10",
  display: "grid",
  gap: "$gr3",
  gridColumn: "1 / -1",
  gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
  padding: "$gr3",

  "@lg": {
    gridTemplateColumns: "1fr",
  },
});

const ImagePanel = styled("article", {
  minWidth: "0",
});

const ImageStage = styled("div", {
  background: "$black80",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",

  "@sm": {
    minHeight: "300px",
  },

  img: {
    display: "block",
    maxHeight: "min(72vh, 820px)",
    maxWidth: "100%",
    objectFit: "contain",
  },
});

const ImageAnnotatorShell = styled("div", {
  display: "grid",
  gridTemplateRows: "auto minmax(360px, 68vh)",
  height: "min(78vh, 860px)",
  minHeight: "460px",
  position: "relative",
  width: "100%",

  "@sm": {
    height: "360px",
    minHeight: "360px",
  },

  "> div:last-child": {
    background: "$black",
    height: "100%",
    position: "relative",
    width: "100%",
  },

  ".openseadragon-container": {
    background: "$black",
  },
});

const ImageAnnotatorCanvas = styled("div", {
  cursor: "grab",
  overflow: "hidden",

  '&[data-interactive="true"]': {
    cursor: "crosshair",
  },

  '&[data-panning="true"]': {
    cursor: "grabbing",
  },

  '&[data-interactive="true"] *': {
    cursor: "crosshair !important",
  },

  '&[data-panning="true"] *': {
    cursor: "grabbing !important",
  },

  "> div:first-child": {
    height: "100%",
    width: "100%",
  },
});

const ImagePointLayer = styled("div", {
  inset: "0",
  pointerEvents: "none",
  position: "absolute",
  zIndex: "1",
});

const ImagePointMarker = styled("div", {
  alignItems: "center",
  background: "$purple",
  border: "2px solid $white",
  borderRadius: "50%",
  boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.35)",
  boxSizing: "border-box",
  color: "$white",
  display: "flex",
  fontFamily: "$northwesternSansBold",
  fontSize: "11px",
  fontVariantNumeric: "tabular-nums",
  height: "22px",
  justifyContent: "center",
  lineHeight: "1",
  pointerEvents: "none",
  position: "absolute",
  textAlign: "center",
  transform: "translate(-50%, -50%)",
  width: "22px",

  '&[data-pending="true"]': {
    background: "#f59e0b",
  },
});

const ImageAnnotatorStatus = styled("div", {
  alignItems: "center",
  background: "$black",
  borderBottom: "1px solid $black80",
  color: "$black20",
  display: "flex",
  fontSize: "$gr1",
  gap: "$gr2",
  justifyContent: "space-between",
  padding: "$gr1 $gr2",

  "> span": {
    alignItems: "center",
    display: "flex",
    gap: "$gr1",
  },
});

const ZoomControls = styled("div", {
  display: "flex",
  gap: "4px",

  button: {
    alignItems: "center",
    background: "$black80",
    border: "0",
    color: "$white",
    cursor: "pointer",
    display: "inline-flex",
    height: "28px",
    justifyContent: "center",
    width: "28px",

    "&:hover": {
      background: "$purple",
    },

    "&:disabled": {
      cursor: "not-allowed",
      opacity: "0.4",
    },
  },
});

const WorkDetails = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "$gr3",
  padding: "$gr3 0",
  borderBottom: "1px solid $black10",

  "@sm": {
    flexDirection: "column",
  },

  h2: {
    margin: "0 0 $gr1",
    color: "$black",
    fontFamily: "$northwesternDisplayBold",
    fontSize: "$gr4",
    letterSpacing: "0",
    lineHeight: "1.1",
  },

  p: {
    margin: "0",
    color: "$black50",
  },

  a: {
    alignItems: "center",
    color: "$purple",
    display: "inline-flex",
    fontFamily: "$northwesternSansBold",
    gap: "$gr1",
    whiteSpace: "nowrap",
  },
});

const ContextList = styled("ul", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$gr2",
  listStyle: "none",
  margin: "$gr3 0 0",
  padding: "0",

  li: {
    background: "$white",
    borderLeft: "4px solid $brightBlueB",
    color: "$black80",
    fontSize: "$gr2",
    padding: "$gr1 $gr2",
  },
});

const GuessPanel = styled("aside", {
  display: "grid",
  gap: "$gr1",
  minWidth: "0",
});

const MapFrame = styled("div", {
  position: "relative",
});

const ModeSwitch = styled("div", {
  display: "grid",
  gap: "$gr1",
  gridTemplateColumns: "1fr 1fr",
  margin: "0",

  "@xs": {
    gridTemplateColumns: "1fr",
  },

  button: {
    alignItems: "flex-start",
    background: "$white",
    border: "2px solid $black10",
    color: "$black50",
    cursor: "pointer",
    display: "flex",
    gap: "$gr1",
    padding: "$gr2",
    textAlign: "left",
    transition: "all 120ms ease",

    "&:hover": {
      borderColor: "$purple30",
      color: "$black80",
    },

    '&[data-active="true"]': {
      background: "$purple10",
      borderColor: "$purple",
      color: "$purple",
    },

    svg: {
      flexShrink: "0",
      marginTop: "2px",
    },

    "> span": {
      display: "grid",
      gap: "2px",
    },

    strong: {
      display: "block",
      fontFamily: "$northwesternSansBold",
      fontSize: "$gr2",
    },

    em: {
      color: "$black50",
      fontSize: "$gr1",
      fontStyle: "normal",
      lineHeight: "1.3",
    },

    '&[data-active="true"] em': {
      color: "$purple",
    },
  },
});

const FootprintToggle = styled("div", {
  bottom: "$gr2",
  left: "$gr2",
  maxWidth: "calc(100% - 32px)",
  position: "absolute",
  zIndex: "1001",

  label: {
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.94)",
    border: "1px solid $purple30",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.16)",
    color: "$purple",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: "$northwesternSansBold",
    fontSize: "$gr1",
    gap: "$gr1",
    lineHeight: "1.25",
    minHeight: "$gr4",
    padding: "$gr1 $gr2",
  },

  input: {
    accentColor: "#4e2a84",
  },

  svg: {
    color: "$purple",
  },
});

const LocateGuessSummary = styled("div", {
  alignItems: "center",
  background: "$purple10",
  display: "grid",
  gap: "$gr2",
  gridTemplateColumns: "auto 1fr auto",
  marginTop: "$gr2",
  padding: "$gr2",

  "> span:first-child": {
    color: "$purple",
    fontFamily: "$northwesternSansBold",
    fontSize: "$gr1",
    textTransform: "uppercase",
  },

  strong: {
    color: "$black",
    fontFamily: "$northwesternSansRegular",
  },

  button: {
    alignItems: "center",
    background: "transparent",
    border: "0",
    color: "$purple",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: "$northwesternSansBold",
    fontSize: "$gr1",
    gap: "4px",
  },
});

const PanelHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "$gr2",
  alignItems: "start",

  p: {
    display: "flex",
    gap: "$gr1",
    alignItems: "center",
    color: "$darkGreen",
    fontFamily: "$northwesternSansBold",
    margin: "0 0 $gr1",
    textTransform: "uppercase",
    fontSize: "$gr1",
  },

  h2: {
    color: "$black",
    fontFamily: "$northwesternDisplayBold",
    fontSize: "$gr4",
    letterSpacing: "0",
    lineHeight: "1.05",
    margin: "0",
  },
});

const KnownBadge = styled("span", {
  background: "$darkYellowB",
  color: "$white",
  flexShrink: "0",
  fontFamily: "$northwesternSansBold",
  fontSize: "$gr1",
  padding: "$gr1 $gr2",

  '&[data-known="true"]': {
    background: "$darkGreen",
  },
});

const PendingBanner = styled("div", {
  alignItems: "center",
  background: "#fef3c7",
  borderLeft: "4px solid #f59e0b",
  color: "#92400e",
  display: "flex",
  fontFamily: "$northwesternSansBold",
  fontSize: "$gr1",
  gap: "$gr1",
  padding: "$gr2",
});

const PlaceSearchStyled = styled("form", {
  background: "#f5f1e8",
  borderTop: "4px solid $purple",
  display: "grid",
  gap: "$gr2",
  margin: "-1px 0 0",
  padding: "$gr2",
  position: "relative",
  zIndex: "1",

  label: {
    color: "$black",
    display: "grid",
    fontFamily: "$northwesternSansBold",
    gap: "2px",
  },

  "label span": {
    color: "$black50",
    fontFamily: "$northwesternSansRegular",
    fontSize: "$gr1",
  },

  "> div:first-of-type": {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "$gr1",

    "@xs": {
      gridTemplateColumns: "1fr",
    },
  },

  input: {
    border: "1px solid $black20",
    color: "$black",
    font: "inherit",
    minHeight: "$gr5",
    minWidth: "0",
    padding: "$gr1 $gr2",
  },

  "> div:first-of-type button": {
    alignItems: "center",
    background: "$purple",
    border: "0",
    color: "$white",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: "$northwesternSansBold",
    gap: "$gr1",
    justifyContent: "center",
    minHeight: "$gr5",
    padding: "0 $gr2",

    "&:disabled": {
      background: "$black20",
      cursor: "not-allowed",
    },
  },
});

const ExampleQueries = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$gr1",

  button: {
    background: "$white",
    border: "1px solid $black10",
    color: "$purple",
    cursor: "pointer",
    fontFamily: "$northwesternSansBold",
    padding: "$gr1 $gr2",
  },
});

const PlaceSearchMessage = styled("p", {
  color: "$brightRed",
  fontFamily: "$northwesternSansBold",
  margin: "0",
});

const PlaceResults = styled("ol", {
  borderTop: "1px solid $black10",
  listStyle: "none",
  margin: "0",
  maxHeight: "220px",
  overflowY: "auto",
  padding: "$gr1 0 0",

  li: {
    margin: "0",
  },

  button: {
    background: "transparent",
    border: "0",
    borderBottom: "1px solid $black10",
    color: "$black80",
    cursor: "pointer",
    display: "grid",
    gap: "2px",
    padding: "$gr1 0",
    textAlign: "left",
    width: "100%",

    "&:hover, &:focus": {
      color: "$purple",
    },
  },

  strong: {
    fontFamily: "$northwesternSansBold",
  },

  span: {
    color: "$black50",
    fontSize: "$gr1",
    lineHeight: "1.35",
  },
});

const CloverMapShell = styled("div", {
  background: "#d8eee9",
  border: "1px solid #97b9b3",
  boxSizing: "border-box",
  height: "min(78vh, 860px)",
  minHeight: "460px",
  overflow: "hidden",
  position: "relative",
  width: "100%",

  "@sm": {
    height: "360px",
    minHeight: "360px",
  },

  '&[data-pending="true"]': {
    borderColor: "#f59e0b",
    boxShadow: "0 0 0 2px #fef3c7",
  },

  "> div:first-child": {
    height: "100%",
    width: "100%",
  },

  ".leaflet-container": {
    fontFamily: "$northwesternSansRegular",
    height: "100%",
    width: "100%",
  },
});

const GcpPairList = styled("ul", {
  borderTop: "1px solid $black10",
  display: "grid",
  gap: "2px",
  listStyle: "none",
  margin: "$gr2 0 0",
  padding: "$gr2 0 0",

  li: {
    alignItems: "center",
    display: "grid",
    fontSize: "$gr1",
    gap: "$gr2",
    gridTemplateColumns: "auto 1fr auto",
    padding: "4px 0",
  },

  "li > span:first-child": {
    background: "$purple",
    borderRadius: "50%",
    color: "$white",
    fontFamily: "$northwesternSansBold",
    fontSize: "10px",
    height: "18px",
    lineHeight: "18px",
    textAlign: "center",
    width: "18px",
  },

  "li > span:nth-child(2)": {
    color: "$black50",
    fontFamily: "$northwesternSansRegular",
  },

  button: {
    alignItems: "center",
    background: "transparent",
    border: "0",
    color: "$black20",
    cursor: "pointer",
    display: "flex",
    padding: "2px",

    "&:hover": {
      color: "$brightRed",
    },
  },
});

const ContributionForm = styled("div", {
  display: "grid",
  gap: "$gr2",
  marginTop: "$gr3",

  label: {
    color: "$black80",
    display: "grid",
    fontFamily: "$northwesternSansBold",
    gap: "$gr1",
  },

  select: {
    minHeight: "$gr5",
  },

  textarea: {
    minHeight: "96px",
    resize: "vertical",
  },

  "select, textarea": {
    border: "1px solid $black20",
    color: "$black",
    font: "inherit",
    padding: "$gr2",
  },

  button: {
    alignItems: "center",
    background: "$darkGreen",
    border: "0",
    color: "$white",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: "$northwesternSansBold",
    gap: "$gr1",
    justifyContent: "center",
    minHeight: "$gr5",
    padding: "0 $gr3",

    "&:disabled": {
      background: "$black20",
      cursor: "not-allowed",
    },
  },
});

const ResultPanel = styled("div", {
  alignItems: "center",
  background: "$purple10",
  display: "grid",
  gap: "$gr1",
  marginTop: "$gr3",
  padding: "$gr3",

  strong: {
    color: "$purple",
    fontFamily: "$northwesternDisplayBold",
    fontSize: "$gr4",
    lineHeight: "1",
  },

  span: {
    color: "$black80",
  },

  button: {
    alignItems: "center",
    background: "transparent",
    border: "0",
    color: "$purple",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: "$northwesternSansBold",
    gap: "$gr1",
    justifySelf: "start",
    padding: "$gr2 0 0",
  },
});

const StatusBanner = styled("p", {
  background: "$brightRed",
  color: "$white",
  margin: "0 auto $gr3",
  padding: "$gr2 $gr3",
  width: "min(1500px, calc(100vw - 48px))",
});

const LoadingBlock = styled("div", {
  alignItems: "center",
  color: "$white",
  display: "flex",
  fontFamily: "$northwesternSansBold",
  justifyContent: "center",
  minHeight: "320px",
});

export default GeoGuess;
