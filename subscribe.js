const fs = require("fs/promises");
const { scrapeSP500Stocks, scrapeSP400Stocks } = require("./scrapingFunctions");


let subscribe = {
  eventName: "subscribe",
  //authorization: "",
  eventData: {
    thresholdLevel: 0,
    //tickers: '',
  },
};

async function scrapeAndSubscribe() {
  try {
    const { sp500Stocks, sp500Symbols } = await scrapeSP500Stocks();
    const { sp400Stocks, sp400Symbols } = await scrapeSP400Stocks();
    const combineddata = { ...sp500Stocks, ...sp400Stocks };
    //console.log("Subscriber --sp400Data-----------", sp400Data.sp400Stocks);

    const tokenlist = await fs.readFile("./token.txt", "utf-8");
    //console.log("------tokenlist-----------------");
    //console.log(tokenlist);

    const token = tokenlist.slice(0, tokenlist.indexOf("#"));
    //console.log("------token-----------------");
    //console.log(token);

    subscribe.authorization = token;
    subscribe.eventData.tickers = [...sp500Symbols, ...sp400Symbols];

    console.log("------subscribe-----------------");
    console.log(subscribe);

    const updatedTokenList =
      tokenlist.slice(tokenlist.indexOf("#") + 1, tokenlist.length) +
      token +
      "#";
    await fs.writeFile("./token.txt", updatedTokenList);
    return { subscribe, combineddata };
  } catch (error) {
    console.error("Subscribe Error:", error);
  }
}

// Usage:
module.exports = scrapeAndSubscribe;
