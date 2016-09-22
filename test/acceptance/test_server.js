const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/../../src'));
app.use(express.static(__dirname + '/../../bower_components'));
app.use(express.static(__dirname + '/../../node_modules'));

app.listen(3000, function() {
	console.log('Server started!');
});
