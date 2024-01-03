function createTables(db) {
  // Create "Quote" table
  db.run(`CREATE TABLE IF NOT EXISTS Quote (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Date TEXT,
    Nanoseconds INTEGER,
    Ticker TEXT,
    Bid_Size INTEGER,
    Bid_Price REAL,
    Mid_Price REAL,
    Ask_Price REAL,
    Ask_Size REAL,
    Halted INTEGER,
    After_Hours INTEGER,
    industry TEXT, 
    subIndustry TEXT
    
  )`);

  // Create "Break" table
  db.run(`CREATE TABLE IF NOT EXISTS Break (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Date TEXT,
    Nanoseconds INTEGER,
    Ticker TEXT,
    Last_Price REAL,
    Last_Size REAL,
    Intermarket_Sweep_Order INTEGER,
    Oddlot INTEGER,
    NMS_Rule_611 INTEGER
  )`);

  // Create "Trade" table
  db.run(`CREATE TABLE IF NOT EXISTS Trade (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Date TEXT,
    Nanoseconds INTEGER,
    Ticker TEXT,
    Last_Price REAL,
    Last_Size REAL,
    Intermarket_Sweep_Order INTEGER,
    Oddlot INTEGER,
    NMS_Rule_611 INTEGER
  )`);

  // db.close();
}

module.exports = createTables;
