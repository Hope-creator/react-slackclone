#!/bin/bash

apt-get update
apt-get install -y netcat

until nc -z mongo_db_slackclone 27017
do
    echo "wait for mongodb up"
    sleep 1
done
  
>&2 echo "Mongodb is up - executing command"
exec "$@"