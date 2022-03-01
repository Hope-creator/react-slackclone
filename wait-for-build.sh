#!/bin/bash

until [[ -d ../build ]]
do
    echo "Wait for build compile"
    sleep 3
done

>&2 echo "Build is ready"
exec "$@"