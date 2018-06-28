describe("Home Page", () => {
  it("should render my name", async () => {
    await page.goto("http://localhost:3000");

    await expect(page).toMatch("Sergio Xalambrí");
  });

  it("should render my job title", async () => {
    await page.goto("http://localhost:3000");

    await expect(page).toMatch("Lead Support Engineer");
  });
});
