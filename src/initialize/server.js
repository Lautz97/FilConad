const path = require("path")
const logger = require("morgan")
const config = require("../config/index")
const express = require("express")

const app = express()

module.exports = class server {
	constructor() {}

	async init() {
		try {
			this.defineViewEngine()
			this.defineRoutes()
			this.startListener()
		} catch (error) {
			console.log(error)
			return false
		} finally {
			return true
		}
	}

	async defineRoutes() {
		try {
			const cors = require("cors")
			app.use(cors())

			//potrebbe essere scritto meglio
			//aggiungere qui ogni file contenente routes e la sua url root
			app.use("/", require("../routes"))
		} catch (error) {
			console.dir(error)
			return false
		} finally {
			return true
		}
	}

	async defineViewEngine() {
		try {
			//posizione viste
			app.set("views", path.join(__dirname, "../views"))
			//dichiarazione view engine
			app.set("view engine", "ejs")
		} catch (error) {
			console.dir(error)
			return false
		} finally {
			return true
		}
	}

	async startListener() {
		try {
			const p = config.port || 3080
			app.listen(p, (err) => {
				if (err) {
					console.dir(err)
					process.exit(1)
				}
				console.log(`
				################################################
				    ~~~~Server listening on port: ${p}~~~~
				################################################
			`)
			})
		} catch (error) {
			console.dir(error)
			return false
		} finally {
			return true
		}
	}
}
