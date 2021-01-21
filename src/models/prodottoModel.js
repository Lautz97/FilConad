const mongoose = require("mongoose")
const { Model, Schema } = mongoose

const prodotto = new Schema({
	nome: String,
	descrizione: String,
	prezzo: String
})
class Prodotto extends Model {

	/**
	 * 
	 * @param {String} n the name of the product
	 * @param {String} d the description of the product
	 * @param {String} p the price of the product
	 */
	constructor(n, d, p) {
		super()
		this.nome = n
		this.descrizione = d
		this.prezzo = p

	}
}

module.exports = mongoose.model(Prodotto, prodotto, "Prodotto")
