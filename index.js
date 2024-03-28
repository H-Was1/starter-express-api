const express = require("express");
const  scrapeAqi  = require("./lib/scraper");
const app = express();
app.get("/", scrapeAqi);
app.listen(process.env.PORT || 3000);
