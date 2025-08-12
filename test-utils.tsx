import React, { FC, ReactElement, ReactNode } from "react";
import { RenderOptions, render } from "@testing-library/react";

import { FilterProvider } from "@/context/filter-context";
import { LayoutProvider } from "./context/layout-context";
import { SearchProvider } from "@/context/search-context";
import { WorkProvider } from "./context/work-context";

interface AllTheProvidersProps {
  children: ReactNode;
}

const AllTheProviders: FC<AllTheProvidersProps> = ({ children }) => {
  return (
    <SearchProvider>
      <FilterProvider>
        <LayoutProvider>
          <WorkProvider>{children}</WorkProvider>
        </LayoutProvider>
      </FilterProvider>
    </SearchProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
