/**
 * Declare any modules here which don't have
 * types exported with their package.  Without
 * this, TypeScript complains.
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any;
  }
}

declare module "@allmaps/leaflet" {
  import * as L from "leaflet";

  export class WarpedMapLayer extends L.Layer {
    constructor(annotationOrUrl: unknown, options?: Record<string, unknown>);
    setOpacity(opacity: number): void;
    addGeoreferenceAnnotation(annotation: unknown): Promise<unknown>;
    removeGeoreferenceAnnotation(annotation: unknown): Promise<unknown>;
    clear(): void;
  }
}
