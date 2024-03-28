const express = require("express");
const scrape = require("./lib/scraper");
const app = express();
app.get("/", scrape);
app.listen(process.env.PORT || 3000);
