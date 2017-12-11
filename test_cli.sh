#!/bin/bash
lsof -P | grep ':4000' | awk '{print $2}' | xargs kill -9
./parallel_commands.sh "npm run test:server" "npm run cypress:run"
