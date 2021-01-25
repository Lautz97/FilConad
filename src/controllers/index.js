const dbman = new (require("../services/foundation/index"))()

module.exports = class genericController {
	constructor() {}

	async dropper(collection) {
		return await dbman.dropCollection(collection)
	}
}
