const puppeteer = require("puppeteer");

describe("Home Page", () => {
  it("should render my name", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");

    await expect(page).toMatch("Sergio Xalambrí");

    return browser.close();
  });

  it("should render my job title", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");

    await expect(page).toMatch("Lead Support Engineer");

    return browser.close();
  });
});
