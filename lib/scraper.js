// const chromium = require("@sparticuz/chromium");
// const puppeteer = require("puppeteer-core");

// const scrape = async (req, res) => {
//   const browser = await puppeteer.launch({
//     args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
//     defaultViewport: chromium.defaultViewport,
//     executablePath: await chromium.executablePath(),
//     headless: chromium.headless,
//     ignoreHTTPSErrors: true,
//   });

//   const page = await browser.newPage();
//   await page.goto("https://www.google.com/");
//   const selector = "div.uU7dJb";
//   await page.waitForSelector(selector);
//   const content = await page.$eval(selector, (data) => data.innerText);
//   await browser.close();
//   return res.json({
//     status: 200,
//     country: content,
//   });
// };
const { response } = require("express");
const puppeteer = require("puppeteer-core");

const SBR_WS_ENDPOINT =
  "wss://brd-customer-hl_b0a0c0e0-zone-scraping_browser2:6prn2p6i1yyc@brd.superproxy.io:9222";

async function scrape(req, res) {
  console.log("Connecting to Scraping Browser...");
  const browser = await puppeteer.connect({
    browserWSEndpoint: SBR_WS_ENDPOINT,
  });
  try {
    const page = await browser.newPage();
    console.log("Connected! Navigating to https://gigacourse.com/?1...");
    await page.goto("https://gigacourse.com/?1");
    console.log("waiting for selector...");
    // await page.setDefaultTimeout(0);
    // await page.setDefaultNavigationTimeout(0);
    await page.screenshot({ path: "./page.png", fullPage: true });
    await page.waitForSelector(
      "#content > div > div > div.col-sm-8.content-column > div.bs-pagination-wrapper.main-term-none.infinity > div > article.post-8466.type-post.format-standard.has-post-thumbnail.sticky.listing-item.listing-item-blog.listing-item-blog-5.main-term-65.bsw-8 > div > h2 > a"
    );
    console.log("await successful! Scraping page content...");
    const country = await page.$eval(
      "#content > div > div > div.col-sm-8.content-column > div.bs-pagination-wrapper.main-term-none.infinity > div > article.post-8466.type-post.format-standard.has-post-thumbnail.sticky.listing-item.listing-item-blog.listing-item-blog-5.main-term-65.bsw-8 > div > h2 > a",
      (data) => data.innerText
    );
    const html = await page.content();
    res.json({
      status: 200,
      country,
      html,
    });
  } finally {
    return await browser.close();
  }
}

module.exports = scrape;
