const dbman = new (require("../services/foundation/index"))()

module.exports = class genericController {
	constructor() {}

	dropper(collection) {
		dbman.dropCollection(collection)
	}
}
