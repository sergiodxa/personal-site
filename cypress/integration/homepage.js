describe("Homepage", () => {
  it("should render my name", () => {
    cy.visit("https://sergiodxa.com");
    cy.contains("Sergio Xalambrí");
  });
});
