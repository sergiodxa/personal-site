describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render my name", () => {
    cy.contains("Sergio Xalambrí");
  });

  it("should render my job title", () => {
    cy.contains("Lead Support Engineer at ▲ ZEIT");
  });
  
  it("should render the navigation", () => {
    cy.contains("About me");
    cy.contains("Essays");
    cy.contains("Services");
    cy.contains("Thoughts");
    cy.contains("Books");
  });
});
