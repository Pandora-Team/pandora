#!/bin/bash

db_container=pandora_db_1
target_backups_count=5

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
storage_uri="$STORAGE_BASE_URI/$STORAGE_BACKUPS_REPO"
storage_api_uri="$STORAGE_BASE_URI/api/storage/$STORAGE_BACKUPS_REPO"
archive_name="$db_container-$(date +'%y%m%d_%H%M%S').tgz"
local_path=/tmp/$archive_name

echo '--- create and upload a new backup ---'

container_script='
    rm -r /tmp/bkp*
    mongodump --username=$MONGO_INITDB_ROOT_USERNAME \
              --password=$MONGO_INITDB_ROOT_PASSWORD \
              --authenticationDatabase=admin \
              --db=$MONGO_INITDB_DATABASE \
              --out=/tmp/bkp \
              --quiet
    [ $? -ne 0 ] && exit 1
    tar czf /tmp/bkp.tgz -C /tmp/bkp .
    rm -r /tmp/bkp
'
docker exec $db_container sh -c "$container_script"
[ $? -ne 0 ] && exit 1
docker cp $db_container:/tmp/bkp.tgz "$local_path"
[ $? -ne 0 ] && exit 1
curl -Ssu "$STORAGE_USER:$STORAGE_PASSWORD" -T "$local_path" "$storage_uri/$archive_name"
[ $? -ne 0 ] && exit 1

echo -e '\n--- clean old backups ---'

backups_info="$(curl -su "$STORAGE_USER:$STORAGE_PASSWORD" $storage_api_uri)"
jq_expression='[.children[].uri] | sort | .[] | ltrimstr("/")'
all_files="$(echo "$backups_info" | jq -r "$jq_expression")"
files_count="$(echo "$all_files" | wc -l)"
files_count_to_rm="$((files_count-target_backups_count))"
if [ "$files_count_to_rm" -gt 0 ]
then
  files_to_rm="$(head -n $files_count_to_rm <(echo "$all_files"))"
  echo "Removing $files_count_to_rm old backup(s): $(echo "$files_to_rm" | xargs)"
  echo "$files_to_rm" | while read -r file
  do
    response_code="$(curl -Ssu "$STORAGE_USER:$STORAGE_PASSWORD" -w "%{response_code}\n" -X DELETE "$storage_uri/$file")"
    echo "- $file deletion result (HTTP response code): $response_code"
  done
fi
