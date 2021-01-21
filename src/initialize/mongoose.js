const mongoose = require("mongoose")
const config = require("../config")

module.exports = class MongooseStarter {
	constructor() {
		// console.dir(config)
	}

	async dbConnect() {
		let connection
		try {
			connection = await mongoose
				.connect(config.databaseURL, {
					useNewUrlParser: true,
					useUnifiedTopology: true
				})
				.catch((err) => {
					console.dir(err)
				})
		} catch (error) {
			console.dir(error)
			return false
		} finally {
			return connection.connection.db
		}
	}

	async dbDisconnect() {
		mongoose.disconnect()
	}
}
