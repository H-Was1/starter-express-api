const puppeteerExtra = require("puppeteer-extra");

const scrape = async (req, res) => {
  const browser = await puppeteerExtra.launch({
    headless: false,
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

module.exports = scrape;
