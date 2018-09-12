describe("Page /", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000");
  });

  it("should render my name", async () => {
    await expect(page).toMatch("Sergio Xalambrí");
  });

  it("should render my title", async () => {
    await expect(page).toMatch("Software Engineer & Technical Writer");
  });

  it("should render the buy me a coffee suggestion", async () => {
    await expect(page).toMatch(
      "Do you like my content? Become a Patreon and get some benefits!"
    );
  });
});
