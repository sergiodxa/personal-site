describe("Page /", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000/");
  });

  it("should render my name", async () => {
    await expect(page).toMatch("Sergio Xalambrí");
  });

  it("should render my job title", async () => {
    await expect(page).toMatch("Software Engineer");
  });
});
