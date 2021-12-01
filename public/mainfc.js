// qui dentro vanno inseriti i campi della form
const container = document.querySelector(".container")
const elaborateBtn = document.querySelector("#elaborate")

let indexH = 0
let indexR = 0

let listaProdotti = []

const selectedProduct = (t) => {
	let prodotto = null
	listaProdotti.forEach((p) => {
		if (p.nome == t.value) {
			prodotto = p
		}
	})
	t.parentNode.parentNode.childNodes.forEach((n) => {
		if (n.childNodes[1].id == "descrizioneArticolo") {
			n.childNodes[1].value = prodotto.descrizione
		} else if (n.childNodes[1].id == "prezzoUnitarioNetto") {
			n.childNodes[1].value = prodotto.prezzo
		}
	})
}

const selectedQuantity = (t) => {
	let totale = t.value
	t.parentNode.parentNode.childNodes.forEach((n) => {
		if (n.childNodes[1].id == "prezzoUnitarioNetto") {
			totale = (parseInt((totale * n.childNodes[1].value * 1000).toString()) / 1000).toFixed(3)
		} else if (n.childNodes[1].id == "numeroPezzi") {
			n.childNodes[1].value = t.value
		}
	})
	t.parentNode.parentNode.childNodes.forEach((n) => {
		if (n.childNodes[1].id == "importoTotaleNetto") {
			n.childNodes[1].value = totale
		}
	})
}

const fetchProdotti = () => {
	fetch("/cat/listOggetto", {
		method: "get",
		headers: { "Content-Type": "application/json" }
	})
		.then((response) => response.json())
		.then((data) => (listaProdotti = data))
}

const init = () => {
	addHeaderBtn(container)

	fetchProdotti()
}

init()

/**
 * This function allows you to append a new form item child to an element
 *
 * @param type          the type of the input in the element that's created in the function
 * @param parent        the parent of the element that's created in the function
 * @param id            the id of the element that's created in the function
 * @param text          the inner text of the label in the
 *                          element that's created in the function
 * @param defValue      the default value of the input text field
 *                          of the element that's created in the function
 * @param hidden        set this to true if the element must have a fixed value
 * @param fullHidden    set this to true if the element must have a fixed value
 */
function addFormField(type = "text", parent, id, text, defValue = "", hidden = false, fullHidden = false) {
	const div = document.createElement("td")
	div.hidden = fullHidden
	parent.appendChild(div)

	if (type === "text") {
		div.innerHTML = `<tr><label for=${id}><h4>${text}</h4></label></tr>`
		if (hidden == true) {
			div.innerHTML += `<tr><input hidden readonly type="text" id=${id} value="${defValue}"></tr>`
		} else {
			div.innerHTML += `<tr><input type="text" id=${id} value="${defValue}"></tr>`
		}
	} else if (type === "articolo") {
		div.innerHTML = `<tr><label for=${id}><h4>${text}</h4></label></tr>`
		if (hidden == true) {
			div.innerHTML += `<tr><input onChange="selectedProduct(this)" hidden readonly type="text" id=${id} value="${defValue}"></tr>`
		} else {
			div.innerHTML += `<tr><input onChange="selectedProduct(this)" type="text" id=${id} value="${defValue}"></tr>`
		}
	} else if (type === "pezzi") {
		div.innerHTML = `<tr><label for=${id}><h4>${text}</h4></label></tr>`
		if (hidden == true) {
			div.innerHTML += `<tr><input onChange="selectedQuantity(this)" hidden readonly type="text" id=${id} value="${defValue}"></tr>`
		} else {
			div.innerHTML += `<tr><input onChange="selectedQuantity(this)" type="text" id=${id} value="${defValue}"></tr>`
		}
	}

	parent.appendChild(div)
	return div
}

function addHeaderBtn(parent) {
	const div = document.createElement("div")
	parent.appendChild(div)

	div.innerHTML = `<input type="button" id="newHeader" 
            onclick="addHeader()" value="Aggiungi Header">`
}

function addRowBtn(parent) {
	const div = document.createElement("div")
	parent.appendChild(div)

	div.innerHTML = `<input type="button" id="newRow" 
            onclick="addRow()" value="Aggiungi Riga">`
}

function cleanOldButtons(both = false) {
	if (both) {
		const ob = container.querySelector("#newRow").parentElement
		ob.parentNode.removeChild(ob)
	}
	const ob1 = container.querySelector("#newHeader").parentElement

	const ret = ob1.previousElementSibling
	ob1.parentNode.removeChild(ob1)
	return ret
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addHeader() {
	const here = cleanOldButtons()

	const bf =
		`<form id="headerForm` + indexH + `"><table cellspacing="2" cellpadding="2" border="2" id="headerFormTable` + indexH + `">`

	if (here != null && here != undefined) {
		here.innerHTML = bf
	} else {
		container.innerHTML = "<div>" + bf + "</div>"
	}

	const form = document.querySelector(`#headerFormTable${indexH}`)

	addFormField("text", form, "tipoRecord", "Header " + indexH, "01", true)
	const ps = form.parentNode.previousSibling
	let p = 1
	if (ps !== null) {
		p = Number(ps.firstChild.querySelector("#progressivo").value) + 1
	}
	
	addFormField("text", form, "progressivo", "Numero Progressivo: ", indexH+1)
	addFormField("text", form, "numeroFattura", "Numero Fattura: ")
	addFormField("text", form, "dataFattura", "Data Fattura[AAMMGG]: ")
	addFormField("text", form, "numeroBolla", "Numero Bolla: ")
	addFormField("text", form, "dataBolla", "Data Bolla[AAMMGG]: ")
	addFormField("text", form, "codiceFornitore", "Codice Fornitore: ", "104979.1", true, true)
	addFormField("text", form, "tipoFornitore", "Tipo Fornitore: ", "1", true, true)
	addFormField("text", form, "codiceCliente", "Codice Cliente: ", "CONAD AD", false, false)
	addFormField("text", form, "codiceCooperativa", "Codice Cooperativa: ", "!!!!!!!!!!!!!!", true, true)
	addFormField("text", form, "codiceSocio", "Codice Socio: ")
	addFormField("text", form, "tipoSocio", "Tipo Socio: ", "1", true, true)
	//radio
	addFormField("text", form, "tipoDocumento", "Tipo Documento[F/N]: ")
	addFormField("text", form, "codiceDivisa", "Codice Divisa: ", "EUR", true, true)
	addFormField("text", form, "filler", "Filler: ", "!!!!!!!!!!!!!!!!!!!!!!!!!", true, true)
	addFormField("text", form, "riservato", "Riservato", "!!!!!!", true, true)

	addRowBtn(container)
	addHeaderBtn(container)
	indexH++
}

function addRow() {
	const here = cleanOldButtons()

	const bf = `<form id="rowForm` + indexR + `"><table cellspacing="2" cellpadding="2" border="2" id="rowFormTable` + indexR + `">`

	here.innerHTML = bf

	const form = document.querySelector(`#rowFormTable${indexR}`)

	const reso = document.querySelector(`#headerFormTable${indexH-1}`).querySelector("#tipoDocumento").value.toString()=="N"?"1":"!"

	addFormField("text", form, "tipoRecord", "Riga " + indexR, "02", true)
	const p = form.parentNode.parentNode.previousSibling.firstChild.querySelector("#progressivo").value
	addFormField("text", form, "progressivo", "Numero Progressivo: ", indexH)
	addFormField("articolo", form, "codiceArticolo", "Codice Articolo: ")
	addFormField("text", form, "descrizioneArticolo", "Descrizione: ")
	addFormField("text", form, "unitaMisura", "Unità di Misura: ", "pz", true, true)
	addFormField("pezzi", form, "quantitaFatturata", "Quantità Fatturata: ")
	addFormField("text", form, "prezzoUnitarioNetto", "Prezzo Unitario Netto: ")
	addFormField("text", form, "importoTotaleNetto", "Importo Totale Netto: ", "")
	addFormField("text", form, "numeroPezzi", "Numero Pezzi: ", "", true, true)
	addFormField("text", form, "tipoIva", "TipoIva: ", "!", true, true)
	addFormField("text", form, "aliquotaIva", "Aliquota Iva: ", "22", true, true)
	addFormField("text", form, "tipoMovimento", "Tipo Movimento: ", "!", true, true)
	addFormField("text", form, "tipoCessione", "Tipo Cessione: ", "1", true, true)
	addFormField("text", form, "numeroOrdineConad", "Numero Ordine Conad: ", "!!!!!!", true, true)
	addFormField("text", form, "codiceListino", "Codice Listino: ", "!!", true, true)
	addFormField("text", form, "tipoArticolo", "Tipo Articolo: ", "!", true, true)
	addFormField("text", form, "tipoContratto", "Tipo Contratto: ", "!", true, true)
	addFormField("text", form, "tipoTrattamento", "Tipo Trattamento: ", "!", true, true)
	addFormField("text", form, "costoTrasporto", "Costo Trasporto: ", "00000", true, true)
	addFormField("text", form, "codiceContabile", "Codice Contabile: ", "!", true, true)
	addFormField("text", form, "tipoReso", "Tipo Reso: ", reso, true, true)
	addFormField("text", form, "prezzoCatalogo", "Prezzo Catalogo: ", "!!!!!!!", true, true)
	addFormField("text", form, "filler", "Filler", "!!!", true, true)
	addFormField("text", form, "dataOrdine", "Data Ordine[AAMMGG]: ", "!!!!!!", true, true)
	addFormField("text", form, "riservato", "Riservato", "!!!!!!", true, true)

	addRowBtn(container)
	addHeaderBtn(container)
	indexR++
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function elaborate() {
	let index = 0
	let spanIndex = 0
	let stringozza = ""

	while (container.children[index].firstChild.id.includes("Form")) {
		let form = container.children[index].firstChild.firstChild

		while (form.children[spanIndex] !== undefined) {
			let ch = form.children[spanIndex]
			let val = ch.children[1].value

			switch (ch.children[1].id) {
				case "progressivo":
					val = riempi("0", val, 5, true)
					break

				case "numeroFattura":
					val = riempi("0", val, 6, true)
					break

				case "dataFattura":
					val = riempi("!", val, 6, true)
					break

				case "numeroBolla":
					val = riempi("0", val, 6, true)
					break

				case "dataBolla":
					val = riempi("!", val, 6, true)
					break

				case "codiceFornitore":
					val = riempi("!", val, 15, true)
					break

				case "codiceCliente":
					val = riempi("!", val, 15, false)
					break

				case "codiceCooperativa":
					val = riempi("!", val, 15, false)
					break

				case "codiceSocio":
					val = riempi("!", val, 15, true)
					break

				case "riservato":
					val = riempi("!", val, 6, false)
					break

				case "codiceArticolo":
					val = riempi("!", val, 15, false)
					break

				case "descrizioneArticolo":
					val = riempi("!", val, 30, false)
					break
				case "quantitaFatturata":
					//added in production
					val = (val * 100).toString().replace(".", "").replace(",", "")
					val = riempi("0", val, 7, true)
					break
				case "prezzoUnitarioNetto":
					val = val.toString().replace(".", "").replace(",", "")
					val = riempi("0", val, 9, true)
					break
				case "importoTotaleNetto":
					val = (val * 1000).toString().replace(".", "").replace(",", "")
					val = riempi("0", val, 9, true)
					break
				case "numeroPezzi":
					val = riempi("0", val, 4, true)
					break
				case "numeroOrdineConad":
					val = riempi("!", val, 6, true)
					break
				case "costoTrasporto":
					//c'è uno zero di troppo(?)
					val = riempi("0", val, 5, true)
					break
				case "prezzoCatalogo":
					val = riempi("!", val, 7, true)
					break
				case "dataOrdine":
					val = riempi("!", val, 6, true)
					break

				default:
					break
			}
			stringozza += val
			spanIndex++
		}
		stringozza += "\n"
		spanIndex = 0
		index++
	}
	stringozza = stringozza.replace(/(!)/g, " ")
	mostraStringa(stringozza)
	//console.log(stringozza.length)
}

function riempi(riempitivo, stringa, dimComplessiva, precedi) {
	while (stringa.length < dimComplessiva) {
		if (precedi === true) {
			stringa = riempitivo + stringa
		} else if (precedi === false) {
			stringa += riempitivo
		}
	}
	return stringa
}

//todo
function mostraStringa(s) {
	const a = document.querySelector("#elaborate").parentNode
	//a.firstChild.textContent = s
	//console.log(s)
	alert(s)
}