#!/bin/bash

artifactory_host=''
token=''

header="Authorization: Bearer $token"
base_uri="https://$artifactory_host/artifactory/lib"
for i in {1..15}
do
    echo "$i"
    curl -H "$header" -X DELETE "$base_uri/api/$i"
    curl -H "$header" -X DELETE "$base_uri/web/$i"
done
