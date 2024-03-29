const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

const SBR_WS_ENDPOINT =
  "wss://brd-customer-hl_b0a0c0e0-zone-scraping_browser2:6prn2p6i1yyc@brd.superproxy.io:9222";

const scrape = async (req, res) => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: SBR_WS_ENDPOINT,
  });

  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  const selector = "div.uU7dJb";
  await page.waitForSelector(selector);
  const content = await page.$eval(selector, (data) => data.innerText);
  await browser.close();
  return res.json({
    status: 200,
    country: content,
  });
};
module.exports = scrape;
