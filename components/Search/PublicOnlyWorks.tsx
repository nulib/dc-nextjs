import * as SwitchPrimitive from "@radix-ui/react-switch";
import styles from "@/components/Shared/Switch.module.css";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";
const SearchPublicOnlyWorks = () => {
  const router = useRouter();
  const { urlFacets } = useQueryParams();
  const { query: q } = router;
  const switchId = `public-works-toggle`;
  const checked = Boolean(
    urlFacets?.visibility && urlFacets?.visibility[0] === "Public",
  );
  const handleCheckedChange = (value: boolean) => {
    const nextQuery = { ...(q && q) };
    const newObj = { ...urlFacets };
    delete nextQuery["visibility"];
    if (value) {
      newObj["visibility"] = ["Public"];
    } else {
      delete newObj["visibility"];
    }
    router.push({
      pathname: "/search",
      query: { ...nextQuery, ...newObj },
    });
  };
  return (
    <form className={styles.styledToggle}>
      <div className={styles.wrapper}>
        <label
          htmlFor={switchId}
          data-checked={checked}
          className={styles.label}
        >
          Public only
        </label>
        <SwitchPrimitive.Root
          checked={checked}
          id={switchId}
          onCheckedChange={handleCheckedChange}
          className={styles.styledSwitch}
        >
          <SwitchPrimitive.Thumb className={styles.styledThumb} />
        </SwitchPrimitive.Root>
      </div>
    </form>
  );
};
export default SearchPublicOnlyWorks;
