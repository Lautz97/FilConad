const mongoose = require("mongoose")
const { Model, Schema } = mongoose

const oggetto = new Schema({
	nome: String,
	descrizione: String,
	costo: String,
	misura: String
})
class Oggetto extends Model {
	/**
	 *
	 * @param {String} n the name of the product
	 * @param {String} d the description of the product
	 * @param {String} p the price of the product
	 * @param {String} m unit of measure
	 */
	constructor(n, d, p, m) {
		super()
		this.nome = n
		this.descrizione = d
		this.costo = p
		this.misura = m
	}

	static fromObj(obj) {
		return new Oggetto(obj.nome, obj.descrizione, obj.costo, obj.misura)
	}
}

module.exports = mongoose.model(Oggetto, oggetto, "Oggetto")
