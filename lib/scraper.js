const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

const scrape = async (req, res) => {
  const browser = await puppeteer.launch({
    args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
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
