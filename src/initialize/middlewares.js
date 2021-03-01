const cookieParser = require("cookie-parser")
const logger = require("morgan")

const express = require("express")
const app = express()
const path = require("path")

module.exports = class middlewaresStarter {
	constructor() {}

	async init() {
		try {
			//morgan -> express Logger
			app.use(logger(":method :url :status :res[content-length] - :response-time ms"))

			
		} catch (error) {
			console.dir("ERROR: " + error)
			return false
		} finally {
			return true
		}
	}
}
