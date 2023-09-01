interface MiradorLinkProps {
  showWarning: boolean;
  manifestId: string;
}

export default function MiradorLink({
  showWarning,
  manifestId,
}: MiradorLinkProps) {
  return showWarning ? (
    <span>View in Mirador</span>
  ) : (
    <a
      href={`https://projectmirador.org/embed/?iiif-content=${manifestId}`}
      target="_blank"
      rel="noreferrer"
    >
      View in Mirador
    </a>
  );
}
