import * as TabsPrimitive from "@radix-ui/react-tabs";
import styles from "@/components/Facets/Filter/GroupList.module.css";
import * as Accordion from "@radix-ui/react-accordion";
import { ALL_FACETS, FACETS } from "@/lib/constants/facets-model";
import Facet from "@/components/Facets/Facet/Facet";
import { IconChevronDown } from "@/components/Shared/SVG/Icons";
import { getFacetGroup } from "@/lib/utils/facet-helpers";
import { useFilterState } from "@/context/filter-context";
const FacetsGroupList: React.FC = () => {
  const {
    filterState: { recentFacet },
  } = useFilterState();
  let defaultGroup;
  let defaultFacetId;
  if (recentFacet && Object.keys(recentFacet).length > 0) {
    defaultFacetId = recentFacet.id;
    defaultGroup = getFacetGroup(defaultFacetId)?.label;
  }
  return (
    <TabsPrimitive.Root
      defaultValue={defaultFacetId}
      orientation="vertical"
      data-testid="facets-group-list"
      className={styles.tabsRoot}
    >
      <Accordion.Root type="single" defaultValue={defaultGroup}>
        {FACETS.map((group) => {
          return (
            <Accordion.Item
              value={group.label}
              key={group.label}
              className={styles.group}
            >
              <Accordion.Header className={styles.groupHeader}>
                <Accordion.Trigger className={styles.groupToggle}>
                  <span>{group.label}</span>
                  <span className={styles.groupToggleIcon}>
                    <IconChevronDown />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.groupContent}>
                <TabsPrimitive.List className={styles.itemList}>
                  {group.facets.map((facet) => {
                    return (
                      <TabsPrimitive.Trigger
                        value={facet.id}
                        key={facet.id}
                        data-testid="facet-value-button"
                        className={styles.itemToggle}
                      >
                        {facet.label}
                      </TabsPrimitive.Trigger>
                    );
                  })}
                </TabsPrimitive.List>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
      {ALL_FACETS.facets.map((facet) => {
        return (
          <TabsPrimitive.Content
            value={facet.id}
            key={facet.id}
            className={styles.itemContent}
          >
            <Facet facet={facet} />
          </TabsPrimitive.Content>
        );
      })}
    </TabsPrimitive.Root>
  );
};
export default FacetsGroupList;
