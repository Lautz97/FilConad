const express = require("express")
const path = require("path")
const router = express.Router()
const config = require("../config")

router.all("/*/", (req, res, next) => {
	console.dir(`requested: ` + req.url + `    ` + `with method: ` + req.method)
	next()
})

/* GET home page. */
router.get("/", (req, res, next) => {
	res.sendFile(path.resolve(__dirname + "\\..\\views\\index.html"))
})

module.exports = router
