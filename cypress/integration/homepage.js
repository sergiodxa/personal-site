describe("Homepage", () => {
  it("should render my name", () => {
    cy.visit("/");
    cy.contains("Sergio Xalambrí");
  });
  
  it("should render my job title", () => {
    cy.visit("/");
    cy.contains("Lead Support Engineer");
  });
  
  it("should render the navigation", () => {
    cy.visit("/");
    cy.contains("About me");
    cy.contains("Essays");
    cy.contains("Services");
    cy.contains("Thoughts");
    cy.contains("Books");
  });
});
