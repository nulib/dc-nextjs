import React, { FC, ReactElement } from "react";
import { RenderOptions, render, screen } from "@testing-library/react";
import { FilterProvider } from "@/context/filter-context";
import { SearchProvider } from "@/context/search-context";

const AllTheProviders: FC = ({ children }) => {
  return (
    <SearchProvider>
      <FilterProvider>{children}</FilterProvider>
    </SearchProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render, screen };
