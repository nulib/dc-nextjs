import dynamic from "next/dynamic";

export const BloomIIIFWrapper: React.ComponentType<{
  collectionId: string;
}> = dynamic(() => import("@samvera/bloom-iiif"), {
  ssr: false,
});

export default BloomIIIFWrapper;
