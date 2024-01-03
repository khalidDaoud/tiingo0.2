const WebSocket = require("ws");
const fileSystem = require("fs");
const path = require("path");
const moment = require("moment"); // require
const tz = require("moment-timezone");
const scrapeAndSubscribe = require("./subscribe");
const insertIntoTable = require("./insertIntoTable");
const parseObject = require("./parseObject");
const createTables = require("./createTables");
const sqlite3 = require("sqlite3"); // Import SQLite3 library

let dt = moment(Date.now()).tz("America/New_York").format("DD-MM-YY"); //date for file name in  D-MM-YY New_York

//let filename = path.join(process.cwd(), dt + ".json"); // remove sp part keep.json;
let dbName = path.join(process.cwd(), dt + ".db"); // remove sp part keep .json
// Create or connect to your SQLite database
const db = new sqlite3.Database(dbName);
db.serialize(() => {
  db.run("PRAGMA synchronous = OFF");
  db.run("PRAGMA journal_mode = MEMORY");

  // Your other database operations here
  // ...
});
createTables(db);

/* replaced with Sqlite
let outputStream = fileSystem.createWriteStream(filename, {
  encoding: "utf8",
  flags: "a",
}); // add append flag
// used to filter null from data[] no need since each table Q,T & B insert only relvant fileds now
function myFilter(elm) {
  return elm != null && elm !== "";
}

/*
async function getindustryBySymbol(symbolToFind, dataArray) {
  const foundItem = dataArray.find((item) => item.symbol === symbolToFind);
  return foundItem ? foundItem.industry : null;
}

async function getsubIndustryBySymbol(symbolToFind, dataArray) {
  const foundItem = dataArray.find((item) => item.symbol === symbolToFind);
  return foundItem ? foundItem.subIndustry : null;
}
*/
let connect = async function () {
  try {
    const { subscribe, combineddata } = await scrapeAndSubscribe(); // gee S&P500 & S&P 400 and Token to Subscribe, Combined Data hase other info
    console.log(
      "Key does not Comm --------------------------!",
      combineddata["X"].industry,
      combineddata["X"].subIndustry
    );
    console.log("Key does not Comm --------------------------!", combineddata);
    ws = new WebSocket("wss://api.tiingo.com/iex");
    ws.on("open", function open() {
      ws.send(JSON.stringify(subscribe));
      //console.log(subscribe);
    });

    ws.on("close", function open() {
      db.close();
      //console.log(subscribe);
    });

    //process.on("SIGQUIT", gracefulShutdown(db));
    // process.on("SIGTERM", gracefulShutdown(db));
    ws.on("message", function (data) {
      reciveData = JSON.parse(data);

      if ("service" in reciveData) {
        trade = combineddata[reciveData.data[3]];
        console.log(`Trade ---industry----: ${trade.industry} `);
        console.log(`Trade ---subIndustry----: ${trade.subIndustry} `);
        //console.log( `"Service -----  industry: ${combineddata[reciveData.data[3]].industry}, : ${combineddata[reciveData.data[3]].subIndustry}`

        insertIntoTable(reciveData.data, trade.industry, trade.subIndustry, db); // need to add industry and sub industry fileds
      } else {
        console.log("Key does not exist!", reciveData);
      }
    });
  } catch (error) {
    db.close();
    console.error("Error:", error);
  }
};
process.on("SIGINT", function () {
  db.close(function (err) {
    console.log("--------------------SIGINT------------------------------");
    process.exit(err ? 1 : 0);
  });
});
process.on("SIGTERM", function () {
  db.close(function (err) {
    console.log("-------------------SIGTERM-------------------------------");
    process.exit(err ? 1 : 0);
  });
});

connect();
