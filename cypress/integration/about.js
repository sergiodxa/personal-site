describe("About me", () => {
  it("should render my name", () => {
    cy.visit("/about");
    cy.contains("Sergio Xalambrí");
  });
  
  it("should render my title", () => {
    cy.visit("/about");
    cy.contains("Software Developer");
  });
  
  it("should render my job title", () => {
    cy.visit("/about");
    cy.contains("Lead Support Engineer at ▲ ZEIT");
  });
  
  it("should render the buy me a coffee suggestion", () => {
    cy.visit("/about");
    cy.contains(
      "Do you like my articles? Buy me a coffee and help me continue writing!"
    );
  });
});
