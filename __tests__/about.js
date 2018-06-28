describe("Page /", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000/about");
  });

  it("should render my name", async () => {
    await expect(page).toMatch("Sergio Xalambrí");
  });

  it("should render my title", async () => {
    await expect(page).toMatch("Software Developer");
  });

  it("should render my job title", async () => {
    await expect(page).toMatch("Lead Support Engineer");
  });

  it("should render the buy me a coffee suggestion", async () => {
    await expect(page).toMatch(
      "Do you like my articles? Buy me a coffee and help me continue writing!"
    );
  });
});
