const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/tags/show", function(req, res) {
	var response = "<h1>Received params</h1>";
	console.dir(req.body);
	for (var key in req.body) {
		response += `<p class="${key}">${key}: ${req.body[key]}</p>`;
	}
	res.send(response);
});

app.listen(3000, function(){
	console.log("Up");
});

app.use(express.static("tests"));
app.use(express.static("src"));
