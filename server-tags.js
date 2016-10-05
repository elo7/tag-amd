const express = require("express");

const app = express();

app.listen(3000, function(){
	console.log("Up");
});

app.use(express.static("tests"))
app.use(express.static("src"))
