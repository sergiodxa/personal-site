describe("Homepage", () => {
  it("should render my name", () => {
    cy.visit("/");
    cy.contains("Sergio Xalambrí");
  });
});
