import linkStyles from "@/components/Shared/Link.module.css";
import itemStyles from "@/components/Collection/Item/Item.module.css";
import type { CollectionListShape } from "@/lib/collection-helpers";
import Figure from "@/components/Figure/Figure";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";
import ReadMore from "@/components/Shared/ReadMore";
import WorkCount from "@/components/Shared/WorkCount/WorkCount";
const CollectionItem: React.FC<
  CollectionListShape & {
    priority: boolean;
  }
> = ({
  title,
  description,
  id,
  thumbnail,
  totalAudio,
  totalImage,
  totalVideo,
  priority,
}) => {
  return (
    <article data-collection={id} className={itemStyles.itemStyled}>
      <div className={itemStyles.itemImageWrapper}>
        <Link href={`/collections/${id}`}>
          <Figure
            data={{
              src: `${thumbnail}?aspect=square`,
              title,
              priority,
            }}
          />
        </Link>
      </div>
      <div className={itemStyles.itemContent}>
        <Heading as="h4">
          <Link href={`/collections/${id}`} legacyBehavior>
            <a data-dc-slot="link" className={linkStyles.linkStyled}>
              {title}
            </a>
          </Link>
        </Heading>
        <WorkCount image={totalImage} audio={totalAudio} video={totalVideo} />
        {description && (
          <p className={itemStyles.description}>
            <ReadMore text={description} words={55} />
          </p>
        )}
      </div>
    </article>
  );
};
export default CollectionItem;
