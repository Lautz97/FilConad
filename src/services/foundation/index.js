const mongoose = require("mongoose")
let db

/**
 * This class will give all the tools for wotking with the db
 */
module.exports = class foundationManager {
	constructor() {
		db = mongoose.connection.db
	}
	/**
	 * Insert an object in a collection
	 * @param {String} collectionName the name of the collection Capitolized and plural
	 * @param {Object} objectToInsert the JSON object to insert in the db, will be inserted only if respects strictly the given Schema
	 */
	async insertData(collectionName, objectToInsert) {
		return await db.collection(collectionName).insertOne(objectToInsert)
	}

	/**
	 * Update all objects identified by the filterObj query
	 * @param {String} collectionName the name of the collection Capitolized and plural
	 * @param {Object} filterObj a set of key:value pairs contained by all objects
	 * @param {Object} keyValuePair the set of key:value pairs that will be updated
	 */
	async setData(collectionName, filterObj, keyValuePair) {
		return await db.collection(collectionName).updateOne(filterObj, { $set: keyValuePair })
	}

	/**
	 * delete all objects idetified by the filterObj query
	 * @param {String} collectionName the name of the collection Capitolized and plural
	 * @param {Object} filterObj a set of key:value pairs contained by all objects
	 */
	async deleteData(collectionName, filterObj) {
		return await db.collection(collectionName).deleteMany(filterObj)
	}

	/**
	 * return the first of all objects in the collection respecting the filterObj query
	 * @param {String} collectionName the name of the collection Capitolized and plural
	 * @param {Object} filterObj  set of key:value pairs contained by all objects
	 */
	async getData(collectionName, filterObj) {
		return await db.collection(collectionName).findOne(filterObj)
	}

	/**
	 * return an array of all objects in the collection respecting the filterObj query
	 * @param {String} collectionName the name of the collection Capitolized and plural
	 * @param {Object} filterObj a set of key:value pairs contained by all objects
	 */
	async getDataArray(collectionName, filterObj) {
		const r = await db
			.collection(collectionName)
			.find(filterObj)
			.toArray()
		return r
	}

	/**
	 * get an array of all objects in the collection extrapolating a single property of every object
	 * @param {String} collectionName the name of the collection Capitolized and plural
	 * @param {String} property a string equal to a key of the objects in the collection
	 */
	async getAllFromCollection(collectionName, property) {
		let a = await db
			.collection(collectionName)
			.find()
			.toArray()
		for (let x in a) {
			a[x] = { [property]: a[x][property] }
		}
		return a
	}

	/**
	 * drop an entire collection (if Exists)
	 * @param {String} collectionName the name of the collection Capitolized and plural
	 */
	async dropCollection(collectionName) {
		try {
			return await db.dropCollection(collectionName)
		} finally {
			return 1
		}
	}
}
