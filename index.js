const Initializer = require("./src/initialize")
const initializer = new Initializer()

async function initialize() {
	await initializer.init(true, true, true, false, [1])
}

//keeping this as clean as possible
initialize()
