const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/../../src'));
app.use(express.static(__dirname + '/../../bower_components'));
app.use(express.static(__dirname + '/../../node_modules'));

app.listen(PORT, function() {
	console.log(`Server running in port http://localhost:${PORT}`);
});
