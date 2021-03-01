const dbman = new (require("../services/foundation/index.js"))()

const ObjId = require("mongoose").Types.ObjectId
const Oggetto = require("../models/oggettoModel")

module.exports = class catalogueController {
	constructor() {}

	addOggetto(rawOggetto) {
		rawOggetto.prezzo = (rawOggetto.prezzo * 1000).toString().slice(0, -3) + "." + (rawOggetto.prezzo * 1000).toString().substr(-3)
		rawOggetto.descrizione = rawOggetto.descrizione.toUpperCase()
		return dbman.insertData("Oggetti", Oggetto.fromObj(rawOggetto))
	}

	updateOggetto(id, rawOggetto) {
		return dbman.setData("Oggetti", { _id: new ObjId(id) }, Oggetto.fromObj(rawOggetto))
	}

	deleteOggetto(id) {
		return dbman.deleteData("Oggetti", { _id: new ObjId(id) })
	}

	async retrieveList() {
		const ret = await dbman.getAllFromCollection("Oggetti", null)
		return ret
	}
}
