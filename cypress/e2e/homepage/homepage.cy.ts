describe("Homepage component", () => {
  it("renders the hero slider", () => {
    cy.visit("https://devbox.library.northwestern.edu:3000/");
    cy.get(".swiper").within(() => {
      cy.get(".swiper-button-prev");
      cy.get(".swiper-button-next");
    });
  });

  it("renders the global search bar and fires off a successful search", () => {
    cy.visit("https://devbox.library.northwestern.edu:3000/");

    cy.fixture("/search/response1.js").then((json) => {
      cy.intercept(
        "POST",
        "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search*",
        json
      );
      cy.get("form[data-testid='search-ui-component'] input").type("foo");
      cy.contains("Search").click();
      cy.url().should("include", "/search?q=foo");
    });
  });

  //TODO: Learn more section

  //TODO: Harmful Content
});
