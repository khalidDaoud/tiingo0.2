// Function to insert data into 'Q' or 'B' table in SQLite based on data[0]
async function insertIntoTable(data, industry, subIndustry, db) {
  try {
    // Filter null values
    if (data[0] === "Q") {
      // Insert data into 'Q' table
      const insertQuery = db.prepare(
        "INSERT INTO Quote (Date , Nanoseconds, Ticker,Bid_Size, Bid_Price, Mid_Price, Ask_Price, Ask_Size, Halted, After_Hours, industry, subIndustry) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)"
      );
      insertQuery.run(
        data[1], //Date
        data[2], //Nanoseconds
        data[3], //Ticker
        data[4], //Bid Size
        data[5], //Bid Price
        data[5], // Mid Price
        data[7], //Ask Price
        data[8], //Ask Size
        data[11], //Halted
        data[12], //After Hours
        industry,
        subIndustry
      );
      insertQuery.finalize();
      console.log("insertQuery Q", data[3]);
    } else if (data[0] === "T") {
      // Insert data into 'Trade' table
      const insertQuery = db.prepare(
        "INSERT INTO Trade (Date, Nanoseconds, Ticker, Last_Price, Last_Size, Intermarket_Sweep_Order, Oddlot, NMS_Rule_611) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      );
      insertQuery.run(
        data[1], //Date
        data[2], //Nanoseconds
        data[3], //Ticker
        data[9], //Last Price
        data[10], //Last Size
        //data[11], //Halted note here
        //data[12],//After Hours not here
        data[13], //Intermarket Sweep Order (ISO)
        data[14], //Oddlot
        data[15] //NMS Rule 611
      );
      insertQuery.finalize();
      console.log("insertQuery Trade", data[3]);
    } else if (data[0] === "B") {
      // Insert data into 'Break' table
      const insertQuery = db.prepare(
        "INSERT INTO Break (Date, Nanoseconds, Ticker, Last_Price, Last_Size, Intermarket_Sweep_Order, Oddlot, NMS_Rule_611) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      );
      insertQuery.run(
        data[1], //Date
        data[2], //Nanoseconds
        data[3], //Ticker
        data[9], //Last Price
        data[10], //Last Size
        //data[11], //Halted note here
        //data[12],//After Hours not here
        data[13], //Intermarket Sweep Order (ISO)
        data[14], //Oddlot
        data[15] //NMS Rule 611
      );
      insertQuery.finalize();
      console.log("insertQuery B");
    }
  } catch (error) {
    db.close();
    console.log("insert error: ", error);
  }

  // Close the database connection
  // dbName.close();
}

module.exports = insertIntoTable;
