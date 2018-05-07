#!/bin/bash
random_port=$(( $RANDOM % 65536 ));

counter=0
while [ $counter -lt 1 ]
do
	if [ -n "$(lsof -i :$random_port)" ]
	then
		echo "port in use!";
	else
		echo "{\"baseUrl\":\"http://localhost:${random_port}\",\"watchForFileChanges\":true,\"videoRecording\":false}" > cypress.json
		PORT=$random_port node test/acceptance/test_server.js & pid=$!
		PID_LIST+=" $pid";
		npm run cypress:run & pid=$!
		PID_LIST+=" $pid";

		trap "kill $PID_LIST" SIGINT
		echo "Parallel processes have started";
		wait $PID_LIST
		echo "All processes have completed";
		((counter++))
	fi
done
