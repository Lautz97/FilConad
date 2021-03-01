const express = require("express")
const path = require("path")
const router = express.Router()
const catC = new (require("../controllers/catalogueController"))()

/* GET home page. */
router.get("/", (req, res, next) => {
	catC.retrieveList().then((results) => {
		res.render("filconadForm.ejs", { list: results })
	})
})

module.exports = router
