require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { processEndpoint } = require("./controllers/webhookController");
const { ngrokStartup } = require("./services/ngrokStartup");

//app.use(bodyParser.json());

app.use(express.json());
app.set("view engine", "ejs");

if (process.env.DEV_MODE) {
	ngrokStartup();
	app.listen(process.env.PORT, () =>
		console.log(`App initialized on port: ${process.env.PORT}`)
	);
}

app.get("/report", processEndpoint);

app.get("/createquery/:orgid", processEndpoint, (req, res) => {
	console.log(res.locals);
	//console.log(req, " req");
	res.render("home", { data: res.locals.queryData });
});

app.get("/", function (req, res) {
	res.sendFile("index.html", { root: "./public" });
});

module.exports = {
	app,
};
