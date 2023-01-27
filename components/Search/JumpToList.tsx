import { Dispatch, KeyboardEvent, useEffect, useState } from "react";
import {
  HelperStyled,
  JumpItem,
  JumpToListStyled,
} from "@/components/Search/JumpTo.styled";
import { IconReturnDownBack } from "@/components/Shared/SVG/Icons";
import Link from "next/link";
import { getCollection } from "@/lib/collection-helpers";
import useEventListener from "@/hooks/useEventListener";
import { useRouter } from "next/router";

interface SearchJumpToListProps {
  searchValue: string;
  setShowJumpTo: Dispatch<React.SetStateAction<boolean>>;
}

const SearchJumpToList: React.FC<SearchJumpToListProps> = ({
  searchValue,
  setShowJumpTo,
}) => {
  const router = useRouter();
  const [collectionTitle, setCollectionTitle] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const jumpToItems = [
    {
      dataTestId: "helper-anchor-collection",
      helperLabel: "In this Collection",
      pathName: "/search",
      query: {
        collection: collectionTitle,
        q: searchValue,
      },
    },
    {
      dataTestId: "helper-anchor-all",
      helperLabel: "All Digital Collections",
      pathName: "/search",
      query: {
        q: searchValue,
      },
    },
  ];

  const handleItemHover = (index: number): void => {
    setActiveIndex(index);
  };

  const handleKeyEvent = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
        break;
      case "ArrowDown":
        if (activeIndex < jumpToItems.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
        break;
      case "Enter":
        e.preventDefault();
        const activeItem = jumpToItems[activeIndex];
        router.push({
          pathname: activeItem.pathName,
          query: activeItem.query,
        });
        break;
      case "Escape":
        setShowJumpTo(false);
        break;
      default:
        break;
    }
  };

  // @ts-ignore
  useEventListener("keydown", handleKeyEvent);

  useEffect(() => {
    if (!router?.query?.id) return;

    async function getCollectionTitle() {
      try {
        const data = await getCollection(router.query.id as string);
        setCollectionTitle(data?.title || "");
      } catch (err) {
        console.error(
          "Error getting Collection title in JumpTo component",
          err
        );
      }
    }
    getCollectionTitle();
  }, [router.query.id]);

  return (
    <JumpToListStyled data-testid="jump-to-wrapper" role="listbox">
      {jumpToItems.map((item, index) => (
        <JumpItem
          key={item.dataTestId}
          role="option"
          aria-selected={index === activeIndex}
          onMouseEnter={() => handleItemHover(index)}
        >
          <Link
            href={{
              pathname: item.pathName,
              query: item.query,
            }}
            tabIndex={0}
            data-testid={item.dataTestId}>

            {searchValue} <Helper label={item.helperLabel} />

          </Link>
        </JumpItem>
      ))}
    </JumpToListStyled>
  );
};

const Helper: React.FC<{ label: string }> = ({ label }) => {
  return (
    <HelperStyled data-testid="helper">
      <span>{label}</span> <IconReturnDownBack />
    </HelperStyled>
  );
};

export default SearchJumpToList;
