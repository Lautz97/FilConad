const serverInit = require("./server")
const dbInit = require("./mongoose")
const middlewaresInit = require("./middlewares")

module.exports = class Initializer {
	constructor() {}

	/**
	 * Initialize server listener, middlewares, db connection and cronjobs returning a verbose output in console
	 * @param {Boolean} middlewares This boolean value if false will disable the initialization for the given module
	 * @param {Boolean} db This boolean value if false will disable the initialization for the given module
	 * @param {Boolean} server This boolean value if false will disable the initialization for the given module
	 * @param {Boolean} cron This boolean value if false will disable the initialization for the given module
	 * @param {[Number]} hours This array must contain the hours (as Int) in which the cronjob will run
	 */
	async init(middlewares, db, server, cron, hours) {
		middlewares ? console.dir("middlewares init done: " + (await this.initMiddleware())) : console.dir("bypassed mw init")

		db ? console.dir("db init done: " + ((await this.initDb()) ? true : false)) : console.dir("bypassed db init")

		server ? console.dir("server init done: " + (await this.initServer())) : console.dir("bypassed server init")

		if (cron) {
			console.dir("cronjob init done, will occour at: " + hours)
			cronJob(hours)
		} else {
			console.dir("bypassed cron job init")
		}
	}

	/**
	 * questo metodo ci permette di inizializzare
	 * middlewares ed utilities per express
	 */
	async initMiddleware() {
		const mwStarter = new middlewaresInit()

		return await mwStarter.init()
	}

	/**
	 * questo metodo ci permette di connetterci al db
	 * ed inizializzarlo
	 */
	async initDb() {
		const dbStarter = new dbInit()
		
		return await dbStarter.dbConnect()
	}

	/**
	 * questo metodo inizializzerà il server
	 * le routes ed il view engine
	 */
	async initServer() {
		//crea istanza di inizializzatore express
		const exp = new serverInit()
		//invoca metodo init
		return await exp.init()
	}
}
