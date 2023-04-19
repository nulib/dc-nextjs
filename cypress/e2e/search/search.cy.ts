const DEFAULT_PAGINATION_SIZE = 40;
const TOTAL_RESULTS = 182;

function getPaginationResults(count: number) {
  return count > DEFAULT_PAGINATION_SIZE ? DEFAULT_PAGINATION_SIZE : count;
}

function verifyGridItemCount(count = 0) {
  const paginationResults = getPaginationResults(count);
  cy.get("[data-testid='grid-item']").should("have.length", paginationResults);
}

function verifyTopResultsCount(count: number) {
  cy.get("[data-testid='results-count']").contains(`${count} results`);
}

describe("Search page component", () => {
  it("renders the global search bar and fires off a successful searches", () => {
    cy.visit("/search");

    const searches = [
      {
        expectedResultCount: 4,
        term: "Obama",
      },
      {
        expectedResultCount: 32,
        term: "Illinois",
      },
      {
        expectedResultCount: 8,
        term: "Berkeley",
      },
    ];

    /** Test Search only functionality */
    cy.get("form[data-testid='search-ui-component'] input").as("searchInput");
    cy.contains("Search").as("searchBtn");
    verifyTopResultsCount(TOTAL_RESULTS);
    verifyGridItemCount(TOTAL_RESULTS);

    searches.forEach((s) => {
      cy.get("@searchInput").clear().type(s.term);

      cy.get("@searchBtn").click();
      cy.url().should("include", `/search?q=${s.term}`);
      verifyTopResultsCount(s.expectedResultCount);
      cy.get("@searchInput").should("have.value", s.term);

      const paginationResults = getPaginationResults(s.expectedResultCount);
      verifyGridItemCount(s.expectedResultCount);
      cy.contains(
        `Showing 1 to ${paginationResults} of ${paginationResults} results`
      );
    });

    /** Reset search input */
    cy.get("button[type='reset']").click();
    cy.url().should("include", `/search`);
    verifyTopResultsCount(TOTAL_RESULTS);
    verifyGridItemCount(TOTAL_RESULTS);
  });

  it("renders Facet filter buttons above the grid correctly", () => {
    cy.visit("/search");

    /** Work Type facet top buttons */
    cy.get("[data-testid='facet-inline-component']").within(() => {
      cy.contains("All").as("allBtn");
      cy.contains("Image").as("imageBtn");
      cy.contains("Audio").as("audioBtn");
      cy.contains("Video").as("videoBtn");
    });

    cy.get("@allBtn").parent().should("have.attr", "aria-checked", "true");
    cy.get("@imageBtn").parent().should("have.attr", "aria-checked", "false");

    cy.get("@imageBtn").click();
    cy.get("@imageBtn").parent().should("have.attr", "aria-checked", "true");
    cy.get("@allBtn").parent().should("have.attr", "aria-checked", "false");
    verifyTopResultsCount(136);
    verifyGridItemCount(136);

    cy.get("@audioBtn").click();
    cy.get("@audioBtn").parent().should("have.attr", "aria-checked", "true");
    cy.get("@imageBtn").parent().should("have.attr", "aria-checked", "false");
    verifyTopResultsCount(21);
    verifyGridItemCount(21);

    cy.get("@videoBtn").click();
    cy.get("@videoBtn").parent().should("have.attr", "aria-checked", "true");
    cy.get("@audioBtn").parent().should("have.attr", "aria-checked", "false");
    verifyTopResultsCount(25);
    verifyGridItemCount(25);

    /** Test Public Works toggle */
    cy.get("@allBtn").click();
    cy.contains("Public works only")
      .siblings("button[role='switch']")
      .as("publicWorksToggle")
      .click();
    verifyTopResultsCount(114);
    verifyGridItemCount(114);

    /** Test Filter Facet Toggle UI */
    cy.contains("Clear All").click();
    cy.get("[data-testid='facet-user-component']").as("facetUserComponent");
    cy.get("@facetUserComponent").should("not.exist");
    cy.get("@imageBtn").click();
    cy.get("@facetUserComponent")
      .should("exist")
      .within(() => {
        cy.contains("1");
      });
    /** Tests the facet count tag value updates */
    cy.get("@publicWorksToggle").click({ force: true });
    cy.get("@facetUserComponent").within(() => {
      cy.contains("2");
    });
  });

  it("renders the Filter modal and interactions within", () => {
    cy.visit("/search");
    cy.contains("Filter").as("filterBtn").click();
    cy.get("[data-testid='modal-content']").within(() => {
      describe("Verify main modal structure components on modal load", () => {
        cy.get("header").contains("Filter");
        cy.get("[data-testid='facets-filter-close']");
        cy.get("footer button").contains("Clear All").as("clearAllBtn");
        cy.get("footer button").contains("Cancel").as("cancelBtn");
        cy.get("[data-testid='facets-submit'] button").as("viewResultsBtn");
      });

      /** Facet category menu buttons display */
      /** Subject and Description Facets category defaults to open on load */

      cy.get("[data-testid='facets-group-list']").within(() => {
        cy.get("h3 button")
          .contains("Subject and Descriptive")
          .as("subjectsAndDescriptiveBtn");

        /** Displays Subject and Description children facets */
        cy.contains("Genre");
        cy.contains("Language");
        cy.contains("Style Period");
        cy.contains("Subject");
        cy.contains("Technique");
        cy.contains("Work Type");

        /** Displays other Facet categories */
        cy.contains("Collection and Location");
        cy.contains("Creator and Contributor").as("creatorAndContributorBtn");
        cy.contains("Rights and Usage");
      });

      /** Test interacting with a Facet */
      cy.get("button").contains("Style Period").click();
      cy.get("h3").contains("Style Period");
      cy.get("[data-testid='facet-find'] input").as("facetFilterInput");
      cy.get("@facetFilterInput").should("have.value", "");
      cy.get("@facetFilterInput").should(
        "have.attr",
        "placeholder",
        "Find Style Period"
      );
      cy.get("[data-testid='facet-options']")
        .as("facetOptions")
        .children()
        .should("have.length", 6);

      /** Test facet input filter doesn't care about capitalization */
      cy.get("@facetFilterInput").type("a", { force: true });
      cy.get("@facetOptions").children().should("have.length", 4);
      cy.get("@facetFilterInput").clear().type("A", { force: true });
      cy.get("@facetOptions").children().should("have.length", 4);

      /** Test filtering of facets */
      cy.get("@facetFilterInput").clear();
      cy.get("[data-testid='facets-group-list'] div[role='tablist'] button")
        .contains("Subject")
        .as("subjectBtn")
        .click();
      cy.get("@facetFilterInput").type("foo", { force: true });
      cy.get("@facetOptions").children().should("have.length", 14);
      cy.get("@facetFilterInput").clear().type("Rose", { force: true });
      cy.get("@facetOptions").children().should("have.length", 2);

      /** Test narrowing checkbox selections across Facets */
      cy.get("@facetFilterInput").clear();
      cy.get("@clearAllBtn").click();

      cy.get("[data-testid='facets-group-list'] div[role='tablist'] button")
        .contains("Genre")
        .click();
      cy.get("@facetOptions").within(() => {
        cy.contains("photographs").click();
      });
      cy.get("@facetOptions").children().should("have.length", 2);
      cy.get("@viewResultsBtn").should("have.text", "View Results (13)");
      cy.get("li[data-testid='facets-filter-preview-item']")
        .as("previewResultItems")
        .should("have.length", 5);

      cy.get("@subjectBtn").click();
      cy.get("@facetOptions").within(() => {
        cy.contains("Women").click();
      });
      cy.get("@viewResultsBtn").should("have.text", "View Results (2)");
      cy.get("@previewResultItems").should("have.length", 2);
      cy.get("@facetOptions").within(() => {
        cy.contains("British").click();
      });
      cy.get("@viewResultsBtn").should("have.text", "View Results (1)");
      cy.get("@previewResultItems").should("have.length", 1);

      /** Display interactive active facets in Filter modal header */
      cy.get("@clearAllBtn").click();
      cy.get("@facetFilterInput").clear();

      cy.get("@subjectBtn").click();
      cy.get("@facetOptions").contains("British Columbia").click();
      cy.get("[data-testid='facet-user-value-component']")
        .as("activeUserFacet")
        .should("have.length", 1);
      cy.get("@activeUserFacet").contains("British Columbia");
      cy.get("@activeUserFacet").contains("Subject");

      cy.get("@creatorAndContributorBtn").click();
      cy.get("[data-testid='facet-value-button']")
        .as("facetValueBtn")
        .contains("Contributor")
        .click();
      cy.get("@facetOptions")
        .contains("Curtis, Edward S., 1868-1952 (Publisher)")
        .click();
      cy.get("@activeUserFacet").should("have.length", 2);
      cy.get("@activeUserFacet").contains(
        "Curtis, Edward S., 1868-1952 (Publisher)"
      );
      cy.get("@activeUserFacet").contains("Contributor");

      /** Removes above active facets successfully */
      cy.get("@viewResultsBtn").contains("View Results (5)");
      cy.get("@activeUserFacet").contains("British Columbia").click();
      cy.get("@activeUserFacet").should("have.length", 1);
      cy.get("@viewResultsBtn").contains("View Results (6)");
      cy.get("@activeUserFacet")
        .contains("Curtis, Edward S., 1868-1952 (Publisher)")
        .click();
      cy.get("@activeUserFacet").should("have.length", 0);
      cy.get("@viewResultsBtn").contains("View Results (182)");
    });
  });

  it("Shows and hides the filter modal", () => {
    cy.visit("/search");
    verifyTopResultsCount(TOTAL_RESULTS);
    cy.get("[data-testid='modal-content']").should("not.exist");
    cy.contains("Filter").as("filterBtn").click();
    cy.get("[data-testid='modal-content']").as("filterModal").should("exist");

    /** Top Close button does not update Search Results */
    cy.contains("Chamber music groups").click();
    cy.contains("View Results (7)");
    cy.get("header [data-testid='facets-filter-close']").click();
    cy.get("@filterModal").should("not.exist");
    verifyTopResultsCount(TOTAL_RESULTS);

    /** Footer Cancel button does not update Search Results */
    cy.get("@filterBtn").click();
    cy.contains("Film posters").click();
    cy.contains("View Results (5)");
    cy.contains("Cancel").click();
    verifyTopResultsCount(TOTAL_RESULTS);

    /** View Results Button updates Search  */
    cy.get("@filterBtn").click();
    cy.contains("Language").click();
    cy.contains("French").click();
    cy.contains("View Results (11)").click();
    verifyTopResultsCount(11);
    verifyGridItemCount(11);
    cy.get("[data-testid='facet-user-component']").contains("1");
  });
});
