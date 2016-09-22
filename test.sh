#!/bin/bash

function killServer {
	kill $NODE_PID
}

trap killServer EXIT

node test/acceptance/test_server.js &
NODE_PID=$!
sleep 3

./node_modules/mocha-phantomjs/bin/mocha-phantomjs -R spec "http://localhost:3000/index.html";
