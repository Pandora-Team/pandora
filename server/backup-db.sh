user=github
password=$REPO_PASSWORD
db_container=pandora_db_1
archive_name="$db_container-$(date +'%y%m%d_%H%M%S').tgz"
local_path=/tmp/$archive_name
remote_path="$REPO_URI/$archive_name"

docker exec $db_container sh -c 'rm -r /tmp/bkp* ; mongodump --username=$MONGO_INITDB_ROOT_USERNAME --password=$MONGO_INITDB_ROOT_PASSWORD --out=/tmp/bkp && tar czvf /tmp/bkp.tgz /tmp/bkp && rm -r /tmp/bkp'
docker cp $db_container:/tmp/bkp.tgz $local_path
curl -u github:$password -T $local_path "$remote_path"

# https://www.jfrog.com/confluence/display/JFROG/Artifactory+REST+API#ArtifactoryRESTAPI-FolderInfo

# https://www.jfrog.com/confluence/display/JFROG/Artifactory+REST+API#ArtifactoryRESTAPI-DeleteItem

