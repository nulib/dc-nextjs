import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { ALL_FACETS, FACETS } from "@/lib/constants/facets-model";
import FacetWrapper from "./FacetWrapper";

const FacetsGroupList: React.FC = () => {
  return (
    <Tabs.Root orientation="vertical">
      <div style={{ display: "flex" }}>
        <Accordion.Root type="single">
          {FACETS.map((group) => {
            return (
              <Accordion.Item value={group.label} key={group.label}>
                <Accordion.Header>
                  <Accordion.Trigger>{group.label}</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Tabs.List
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {group.facets.map((facet) => {
                      return (
                        <Tabs.Trigger
                          value={facet.id}
                          key={facet.id}
                          style={{ backgroundColor: "white" }}
                        >
                          {facet.label}
                        </Tabs.Trigger>
                      );
                    })}
                  </Tabs.List>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
        {ALL_FACETS.facets.map((facet) => {
          return (
            <Tabs.Content value={facet.id} key={facet.id}>
              <FacetWrapper facet={facet} />
            </Tabs.Content>
          );
        })}
      </div>
    </Tabs.Root>
  );
};

export default FacetsGroupList;
