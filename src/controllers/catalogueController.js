const dbman = new (require("../services/foundation/index.js"))()

module.exports = class catalogueController {
	constructor() {}

    addOggetto(rawOggetto) {
        dbman.insertData("Oggetti", rawOggetto)
    }
}
