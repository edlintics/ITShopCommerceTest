const app = require("./app");

// Import the seceret dot_env variable
const dotenv = require("dotenv");

// Setting up config file

dotenv.config({ path: "backend/config/config.env" });

app.listen(process.env.PORT, () => {
	console.log(
		`Server is started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`,
	);
});
