const app = require("./app");
const connectDatabase = require("./config/database");

// Import the seceret dot_env variable
const dotenv = require("dotenv");

//Handle Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// Setting up config file
dotenv.config({ path: "backend/config/config.env" });

// Conntecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//Handle Unhandled Promise rejection => in case of the db server is down (wrong string, down, etc.)

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
