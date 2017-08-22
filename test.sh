#!/bin/bash

function killServer {
	kill $NODE_PID
}

trap killServer EXIT

node test/acceptance/test_server.js &
NODE_PID=$!
sleep 3

./node_modules/mocha-phantomjs/bin/mocha-phantomjs -p ./node_modules/.bin/phantomjs -R spec "http://localhost:4000/index.html";
