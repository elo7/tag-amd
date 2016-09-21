#!/bin/bash

function killPhantom {
	kill $PHANTOM_PID
}

trap killPhantom EXIT

NODE_BIN=./node_modules/.bin

$NODE_BIN/phantomjs --webdriver=4444 > /dev/null &
PHANTOM_PID=$!
cd test/acceptance/ && ../../$NODE_BIN/codeceptjs run --steps
