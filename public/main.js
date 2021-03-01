function validate() {
	if (document.newOggetto.nome.value.length != 7) {
		alert("INSERIRE CODICE PRODOTTO CORRETTO")
		document.newOggetto.nome.focus()
		return false
	}
	if (document.newOggetto.descrizione.value.length > 30) {
		alert("ISERIRE DESCRIZIONE PIU' CORTA (max 30 caratteri)")
		document.newOggetto.descrizione.focus()
		return false
	}
	if (document.newOggetto.prezzo.value == 0) {
		alert("INSERIRE PREZZO CORRETTO")
		document.newOggetto.prezzo.focus()
		return false
	}
	return true
}

function modifyOggetto(str) {
	// fetch("/cat/updateOggetto", {
	// method: "put",
	// headers: { "Content-Type": "application/json" },
	// body: JSON.stringify({ id: str })
	// })
}

function deleteOggetto(str) {
	fetch("/cat/deleteOggetto", {
		method: "delete",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id: str })
	})
}
