describe("Search page component", () => {
  it.only("renders the global search bar and fires off a successful search", () => {
    cy.visit("https://devbox.library.northwestern.edu:3000/search");

    cy.fixture("/search/pagination/page1.json").then((json) => {
      cy.intercept(
        "POST",
        "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search*",
        json
      );
      cy.get("form[data-testid='search-ui-component'] input").type("foo");
      cy.contains("Search").click();
      cy.url().should("include", "/search?q=foo");

      // Verify all Filter row UI elements
      cy.get("[data-testid='facets-ui-wrapper']").within(() => {
        cy.contains("All");
        cy.contains("Image");
        cy.contains("Audio");
        cy.contains("Video");
        cy.contains("Filter").click();
      });

      // Filter modal now open
      cy.get("[data-testid='modal-content']").within(() => {
        cy.contains("Filter");

        // Test top results preview
        cy.contains("Top Results");

        // Test the first result displays all it's UI elements
        cy.get("[data-testid='facets-filter-preview-item']").within(() => {
          cy.get("a[href='/items/8d710f86-ec54-43cf-9ec4-eb71b1c90c5d']");
          cy.get("img");
          cy.contains("Mimi Farina");
          cy.contains("Image");
        });

        //TODO: Continue testing for all the elements and then exiting
        // out of the Filter modal by either canceling or submitting Filter
      });
    });
  });

  it("renders facet aggregations", () => {
    cy.visit("https://devbox.library.northwestern.edu:3000/search");
    cy.fixture("/search/aggregations/aggs1.json").then((json) => {
      cy.intercept(
        "POST",
        "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search",
        json
      ).as("getAggs");

      cy.contains("Filter").click();
      cy.get("[data-testid='modal-content']").within(() => {
        cy.contains("Subjects and Descriptive").click();
        cy.contains("Genre");
        cy.contains("Style Period");

        // This click should trigger the fixture data
        cy.contains("div[role='tablist']", "Subject").click();
        cy.wait("@getAggs");

        cy.get("[data-testid='facet-multi-component']").within(() => {
          cy.contains("Subject");
        });
      });
    });

    // Now let's mock the next call to filter aggs
    cy.fixture("/search/aggregations/aggs2.json").then((json) => {
      cy.intercept(
        "POST",
        "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search",
        json
      ).as("getAggs2");
      // Filter the aggs by typing some text
      cy.get("input[aria-label='Find subject']").type("foobar");
      cy.wait("@getAggs2");
      cy.get("[data-testid='facet-options']")
        .find("li")
        .first()
        .should("contain.text", "Berkeley");
    });
  });
});
