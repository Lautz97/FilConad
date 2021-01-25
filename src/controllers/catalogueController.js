const dbman = new (require("../services/foundation/index.js"))()
const Oggetto = require("../models/oggettoModel")

module.exports = class catalogueController {
	constructor() {}

	addOggetto(rawOggetto) {
		return dbman.insertData("Oggetti", Oggetto.fromObj(rawOggetto))
	}

	retrieveList(query = {}) {
		collectionName = "Oggetti"
	}
}
