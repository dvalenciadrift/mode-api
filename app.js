require("dotenv").config();
const express = require("express");
const app = express();
const { processEndpoint } = require("./controllers/webhookController");
const { ngrokStartup } = require("./services/ngrokStartup");

app.use(express.json());

if (process.env.DEV_MODE) {
	ngrokStartup();
	app.listen(process.env.PORT, () =>
		console.log(`App initialized on port: ${process.env.PORT}`)
	);
}

app.get("/createquery/:orgid", processEndpoint, (req, res) => {
	console.log(res.locals);
	//console.log(req, " req");
	res.json(res.locals.queryData);
	//res.render("home", { data: res.locals.queryData });
});

module.exports = {
	app,
};
