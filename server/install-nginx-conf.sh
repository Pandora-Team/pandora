#!/bin/sh
if [ "$(id -u)" -ne 0 ]
then
    echo "error: root access required" > /dev/stderr
    exit 1
fi
cat /etc/nginx/sites-enabled/pandora > /home/ci/bkp-nginx.conf
cat /home/ci/new-nginx.conf > /etc/nginx/sites-enabled/pandora
service nginx reload
