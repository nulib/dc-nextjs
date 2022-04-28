import React, { FC, ReactElement } from "react";
import { RenderOptions, render, screen } from "@testing-library/react";
import { SearchProvider } from "@/context/search-context";

const AllTheProviders: FC = ({ children }) => {
  return <SearchProvider>{children}</SearchProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render, screen };
