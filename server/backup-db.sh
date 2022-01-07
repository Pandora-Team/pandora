#!/bin/bash

db_container=pandora_db_1

vars_expected="$vars_expected STORAGE_USER";         vars_found="$vars_found${STORAGE_USER+ STORAGE_USER}"
vars_expected="$vars_expected STORAGE_PASSWORD";     vars_found="$vars_found${STORAGE_PASSWORD+ STORAGE_PASSWORD}"
vars_expected="$vars_expected STORAGE_BASE_URI";     vars_found="$vars_found${STORAGE_BASE_URI+ STORAGE_BASE_URI}"
vars_expected="$vars_expected STORAGE_BACKUPS_REPO"; vars_found="$vars_found${STORAGE_BACKUPS_REPO+ STORAGE_BACKUPS_REPO}"

if [ "$vars_found" != "$vars_expected" ]
then
    echo "Required environment varibles:$vars_expected" >&2
    echo "Found:$vars_found" >&2
    exit 1
fi
archive_name="$db_container-$(date +'%y%m%d_%H%M%S').tgz"
local_path=/tmp/$archive_name
remote_path="$STORAGE_BASE_URI/$STORAGE_BACKUPS_REPO/$archive_name"
storage_api_uri="$STORAGE_BASE_URI/api/storage/$STORAGE_BACKUPS_REPO"

container_script='
    rm -r /tmp/bkp*
    mongodump --quiet \
              --username=$MONGO_INITDB_ROOT_USERNAME \
              --password=$MONGO_INITDB_ROOT_PASSWORD \
              --out=/tmp/bkp
    [ $? -ne 0 ] && exit 1
    tar czf /tmp/bkp.tgz -C /tmp/bkp .
    rm -r /tmp/bkp
'
docker exec $db_container sh -c "$container_script"
[ $? -ne 0 ] && exit 1

docker cp $db_container:/tmp/bkp.tgz $local_path

curl -Ssu $STORAGE_USER:$STORAGE_PASSWORD -T $local_path "$remote_path"
exit $?
