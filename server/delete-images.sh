#!/bin/bash

artifactory_host=''
token=''

header="Authorization: Bearer $token"
base_uri="https://$artifactory_host"
for i in {1..15}
do
    echo "$i"
    curl -H "$header" -X DELETE "$base_uri/artifactory/lib/api/$i"
    curl -H "$header" -X DELETE "$base_uri/artifactory/lib/web/$i"
done

# curl -vH "$header" -X POST "$base_uri/api/system/storage/gc"
