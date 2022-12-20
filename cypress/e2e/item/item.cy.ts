describe("Item page", () => {
  it("renders page content", () => {
    cy.fixture("/item/manifest1.json").then((json) => {
      cy.intercept(
        "GET",
        "https://iiif.stack.rdc-staging.library.northwestern.edu/public/4b/d4/e8/bd/-8/66/5-/4b/b8/-9/a5/5-/f3/ab/dd/65/aa/98-manifest.json",
        json
      );
      cy.visit(
        "https://devbox.library.northwestern.edu:3000/items/4bd4e8bd-8665-4bb8-9a55-f3abdd65aa98"
      );
      cy.get("[data-testid='work-viewer-wrapper']");
    });
  });
});
