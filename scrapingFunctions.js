const axios = require("axios");
const cheerio = require("cheerio");

function myFilter(elm) {
  return elm != null && elm !== false && elm !== "";
}

async function scrapeSP500Stocks() {
  try {
    const response = await axios.get(
      "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    );
    const $ = cheerio.load(response.data);
    const table = $("#constituents");

    // Extract data from the first 4 columns of the 'S&P 500 component stocks' table
    const sp500Stocks = {};
    table.find("tbody tr").each((index, row) => {
      const columns = $(row).find("td");
      const symbol = columns.eq(0).text().trim();
      const security = columns.eq(1).text().trim();
      const industry = columns.eq(2).text().trim();
      const subIndustry = columns.eq(3).text().trim();
      if (symbol) {
        sp500Stocks[symbol] = { security, industry, subIndustry };
        //console.log(sp500Stocks[symbol]);
      }
    });

    // Combine only the 'symbol' field from S&P 500 stocks
    let sp500Symbols = Object.keys(sp500Stocks);
    console.log(`sp500Symbols ------------  ${sp500Symbols}`);
    sp500Symbols = sp500Symbols.filter(myFilter);
    //console.log("S&P 500 Symbols:", sp500Symbols);
    //console.log("S&P 500 Stocks (First 4 Columns):", typeof sp500Stocks);

    return { sp500Stocks, sp500Symbols };
  } catch (error) {
    console.error("sp500Stocks Error-----------:", error);
  }
}

async function scrapeSP400Stocks() {
  try {
    const response = await axios.get(
      "https://en.wikipedia.org/wiki/List_of_S%26P_400_companies"
    );
    const $ = cheerio.load(response.data);
    const table = $("#constituents");

    // Extract data from the first 4 columns of the 'S&P 400 companies' table
    const sp400Stocks = {};
    table.find("tbody tr").each((index, row) => {
      const columns = $(row).find("td");
      const symbol = columns.eq(0).text().trim();
      const security = columns.eq(1).text().trim();
      const industry = columns.eq(2).text().trim();
      const subIndustry = columns.eq(3).text().trim();
      if (symbol) {
        sp400Stocks[symbol] = { security, industry, subIndustry };
      }
    });

    //console.log("S&P 400 Stocks (First 4 Columns):", sp400Stocks);

    // Combine only the 'symbol' field from S&P 400 stocks

    let sp400Symbols = Object.keys(sp400Stocks);
    sp400Symbols = sp400Symbols.filter(myFilter);
    console.log(`sp400Symbols ------------  ${sp400Symbols}`);

    //console.log("S&P 400 sp400Stocks:", sp400Stocks[1]);

    return { sp400Stocks, sp400Symbols };
  } catch (error) {
    //console.error("Error:", error);
  }
}

/*
// Call the functions to scrape the data
async function scrapeData() {
  const sp500Data = await scrapeSP500Stocks();
  const sp400Data = await scrapeSP400Stocks();

  // Combine 'symbol' fields from both S&P 500 and S&P 400 stocks
  const combinedSymbols = [...sp500Data.sp500Symbols, ...sp400Data.sp400Symbols];
  const combineddata = {...sp500Data, ...sp400Data};
  //console.log('Combined sp500Data:', typeof(sp500Data));
  //console.log('Combined combinedSymbols:', typeof(combinedSymbols));
}
*/
//scrapeData()

module.exports = {
  scrapeSP500Stocks,
  scrapeSP400Stocks,
};
