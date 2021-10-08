# https://pandora-kpop.ru

## Подготовка сервера

1. Установить `sudo`, `docker`, `nginx` и `python3-pip`. Из `pip` установить `docker-compose` и `certbot`.
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
