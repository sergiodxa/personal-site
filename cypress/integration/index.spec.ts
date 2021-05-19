describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");

    cy.findByText("Welcome to Remix!").should("exist");
  });
});
