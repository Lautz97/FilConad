const fs = require("fs")
const dbMan = new (require("./index"))()

module.exports = class extrapolator {
	constructor() {}

	/**
	 * TODO static db or backup loader
	 */
	async loadFromFile(fileName, collectionName) {}
}
