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
		PORT=$random_port node test/acceptance/test_server.js & npm run cypress:open
		((counter++))
	fi
done
exit 0
