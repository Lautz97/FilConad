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
					useUnifiedTopology: true,
					useCreateIndex: true
				})
				.catch((err) => {
					console.dir(err)
				})
		} catch (error) {
			console.dir(error)
			return false
		} finally {
			this.createIdxs()
			return connection.connection.db
		}
	}

	async createIdxs() {
		const list = (await mongoose.connection.db.listCollections().toArray()).map(({ name }) => name)
		if (!list.includes("Oggetti")) {
			await (await mongoose.connection.db.createCollection("Oggetti")).createIndex("nome", { unique: true })
		}
	}

	async dbDisconnect() {
		mongoose.disconnect()
	}
}
