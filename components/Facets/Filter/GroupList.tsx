import * as Accordion from "@radix-ui/react-accordion";

import { ALL_FACETS, FACETS } from "@/lib/constants/facets-model";
import {
  Group,
  GroupContent,
  GroupHeader,
  GroupToggle,
  GroupToggleIcon,
  ItemContent,
  ItemList,
  ItemToggle,
  TabsRoot,
} from "@/components/Facets/Filter/GroupList.styled";

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
    <TabsRoot
      defaultValue={defaultFacetId}
      orientation="vertical"
      data-testid="facets-group-list"
    >
      <Accordion.Root type="single" defaultValue={defaultGroup}>
        {FACETS.map((group) => {
          return (
            <Group value={group.label} key={group.label}>
              <GroupHeader>
                <GroupToggle>
                  <span>{group.label}</span>
                  <GroupToggleIcon>
                    <IconChevronDown />
                  </GroupToggleIcon>
                </GroupToggle>
              </GroupHeader>
              <GroupContent>
                <ItemList>
                  {group.facets.map((facet) => {
                    return (
                      <ItemToggle
                        value={facet.id}
                        key={facet.id}
                        data-testid="facet-value-button"
                      >
                        {facet.label}
                      </ItemToggle>
                    );
                  })}
                </ItemList>
              </GroupContent>
            </Group>
          );
        })}
      </Accordion.Root>
      {ALL_FACETS.facets.map((facet) => {
        return (
          <ItemContent value={facet.id} key={facet.id}>
            <Facet facet={facet} />
          </ItemContent>
        );
      })}
    </TabsRoot>
  );
};

export default FacetsGroupList;
