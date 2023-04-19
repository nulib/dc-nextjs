describe("Homepage component", () => {
  it("renders the hero slider", () => {
    cy.visit("/");
    cy.get(".swiper").within(() => {
      cy.get(".swiper-button-prev");
      cy.get(".swiper-button-next").as("nextBtn");

      cy.get("figure")
        .first()
        .contains("Edward S. Curtis's The North American Indian")
        .should(
          "have.attr",
          "href",
          "https://dc-next.rdc-staging.library.northwestern.edu/collections/55ff2504-dd53-4943-b2cb-aeea46e77bc3"
        );
      cy.contains("Crossing the Pend d'Oreille - Kalispel");

      cy.get("@nextBtn").click();

      cy.contains("Berkeley Folk Music Festival").should(
        "have.attr",
        "href",
        "https://dc-next.rdc-staging.library.northwestern.edu/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7"
      );
      cy.contains("Joan Baez");
    });
  });

  //TODO: Learn more section

  //TODO: Harmful Content
});
