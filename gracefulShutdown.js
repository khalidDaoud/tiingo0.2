function gracefulShutdown(db) {
  // Perform cleanup tasks or final actions here
  // For example, close database connections, save data, etc.
  console.log("exit calledd -------------------------------------");
  db.close();
  // Exit the application gracefully
  process.exit(0); // Optional: You can provide an exit code (0 for success)
}

module.exports = gracefulShutdown;
