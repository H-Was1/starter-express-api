const Chromium = require("@sparticuz/chromium");
const Puppeteer = require("puppeteer-core");

const scrapeAqi = async (req, res) => {
  const browser = await Puppeteer.launch({
    args: [...Chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: Chromium.defaultViewport,
    executablePath: await Chromium.executablePath(),
    headless: Chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const Page = await browser.newPage();
  await Page.goto("https://www.google.com/");
  const selector = "div.uU7dJb";
  await Page.waitForSelector(selector);
  const Content = await Page.$eval(selector, (data) => data.innerText);
  await browser.close();
  return res.json({
    status: 200,
    country: Content,
  });
};
module.exports = scrapeAqi;
