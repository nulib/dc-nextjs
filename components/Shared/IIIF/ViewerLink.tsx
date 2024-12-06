import Link from "next/link";

interface IIIFViewerLinkProps {
  viewer: {
    label: string;
    href: string;
    iiifContentParam?: string;
  };
  uri: string;
}

const IIIFViewerLink: React.FC<IIIFViewerLinkProps> = ({ viewer, uri }) => {
  const iiifContent = new URL(viewer.href);
  iiifContent.searchParams.set(
    viewer.iiifContentParam ? viewer.iiifContentParam : "iiif-content",
    uri,
  );

  return (
    <Link href={iiifContent.toString()} target="_blank" rel="noreferrer">
      {viewer.label}
    </Link>
  );
};

export default IIIFViewerLink;
