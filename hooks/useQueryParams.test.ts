import mockRouter from "next-router-mock";
import { renderHook } from "@testing-library/react";
import useQueryParams from "./useQueryParams";

jest.mock("next/router", () => require("next-router-mock"));

mockRouter.setCurrentUrl("/search?q=foo&subject=baz&genre=Film");

it("should return proper query param values", () => {
  const { result } = renderHook(() => useQueryParams());
  expect(result.current.searchTerm).toEqual("foo");
  expect(result.current.urlFacets).toMatchObject({
    genre: ["Film"],
    subject: ["baz"],
  });
});
