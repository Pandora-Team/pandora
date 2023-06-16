#!/bin/bash
set -e 

usage_msg="Usage: $0 ssh_address [target_dir]"
ssh_address=${1?$usage_msg}
target_dir="${2:-.}"

db_container=pandora_db_1
target_path="${target_dir%%/}/$db_container-$(date +'%y%m%d_%H%M%S').tgz"

echo "Connecting to '$ssh_address' via ssh..."
( sed "\$a main $db_container" | ssh -T $ssh_address ) << 'END_OF_SCRIPT'
echo 'Running on the remote host...'
set -e
main() {
    local db_container=${1?"Usage: ${FUNCNAME[0]} db_container"}
    container_script='
        set -e
        echo "Running inside the container..."
        rm -r /tmp/bkp*
        echo "Starting mongodump..."
        mongodump --username=$MONGO_INITDB_ROOT_USERNAME \
                  --password=$MONGO_INITDB_ROOT_PASSWORD \
                  --db=$MONGO_INITDB_DATABASE \
                  --authenticationDatabase=admin \
                  --out=/tmp/bkp \
                  --quiet
        [ $? -ne 0 ] && exit 1
        echo "Archiving the backup..."
        tar czf /tmp/bkp.tgz -C /tmp/bkp .
        rm -r /tmp/bkp
    '
    docker exec $db_container sh -c "$container_script"

    echo "Fetching the backup from '$db_container'..."
    docker cp $db_container:/tmp/bkp.tgz /tmp/bkp.tgz
}
END_OF_SCRIPT
echo "Fetching the backup from the remote host into '$target_path'..."
scp $ssh_address:/tmp/bkp.tgz $target_path
