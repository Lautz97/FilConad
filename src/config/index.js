const dotenv = require("dotenv")

// dotenv.config() leggerà il file .env, ne analizzerà il contenuto, e lo assegnerà a process.env.
dotenv.config()

module.exports = {
	//port number
	port: process.env.PORT,
	//db info
	databaseURL: process.env.DB_URL
}
