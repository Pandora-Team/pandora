db_container=pandora_db_1
bkp_path=/tmp/$db_container-$(date +'%y%m%d_%H%M%S').tgz
docker exec $db_container sh -c 'rm -r /tmp/bkp* ; mongodump --username=$MONGO_INITDB_ROOT_USERNAME --password=$MONGO_INITDB_ROOT_PASSWORD --out=/tmp/bkp && tar czvf /tmp/bkp.tgz /tmp/bkp && rm -r /tmp/bkp'
docker cp $db_container:/tmp/bkp.tgz $bkp_path
curl -u github:$REPO_PASSWORD -T $bkp_path "$REPO_URI/$bkp_path"
