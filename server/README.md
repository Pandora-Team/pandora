## Установленные пакеты

1. `sudo`
1. `docker`
1. `nginx`
1. `python3-pip`
    1. `docker-compose`
    1. `certbot`

## Подготовка сервера

Хорошо бы это затащить в Ansible, но цель не оправдывает затраты, так что плэйбук вот такой:

1. Сгенерировать ключевую пару для пользователя `ci`: `ssh-keygen -t ed25519`.
1. [Добавить пользователей](https://gist.github.com/Himura2la/e4258e60fe1a644dabd19a9d96aa3a0d) `ci` и `admin`:
    * Добавить им публичные части SSH-ключей.
    * Добавить `ci` в группу `docker`, а `admin` в группу `sudo`.
1. Положить приватную часть SSH-ключа в GitHub Secrets.
1. `sudo passwd --delete root`.
1. `/etc/ssh/sshd_config`:
    * `Port <random>`
    * `PasswordAuthentication no`
    * `PermitRootLogin no`
    * `ClientAliveInterval 120`
    * `ClientAliveCountMax 3`
1. `/etc/sudoers`:
    * `%sudo ALL=(ALL:ALL) NOPASSWD: ALL`
    * `ci    ALL=(root)    NOPASSWD: /usr/sbin/nginx`
1. Положить файлик `.env` с секретами в папку `/home/ci`.
1. Дать доступ юзеру `ci` к файлу `/etc/nginx/sites-enabled/pandora`:
    ```
    cd /etc/nginx/sites-enabled
    rm *
    touch pandora
    chown ci:ci pandora
    ```
1. Создать docker-volume для базы и задепоить сайт.
1. Получить SSL-сертификаты.
1. [Настроить автообновление SSL-сертификатов](https://certbot.eff.org/docs/using.html?highlight=renew#setting-up-automated-renewal):
    ```
    SLEEPTIME=$(awk 'BEGIN{srand(); print int(rand()*(3600+1))}'); echo "0 0,12 * * * root sleep $SLEEPTIME && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null
    ```
1. Настроить `nginx` запускаться после `docker` (так как `stub_status` должен биндиться на адрес интерфейса `docker0`, который не существвет до запуска докер-демона)
    ```
    sed '/^After=/ s/$/ docker.service/' /lib/systemd/system/nginx.service | sudo tee /etc/systemd/system/nginx.service
    sudo systemctl daemon-reload
    sudo service nginx status
    ```