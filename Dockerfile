FROM debian:bookworm
RUN DEBIAN_FRONTEND=noninteractive apt-get purge -y apache2* dnsmasq* eatmydata exim4* imagemagick-6-common mysql-client* mysql-server* nginx* libnginx-mod* php7* resolvconf && systemctl disable systemd-resolved.service && systemctl stop systemd-resolved.service
RUN rm /etc/resolv.conf && echo "nameserver 1.1.1.1" > /etc/resolv.conf
RUN apt-get update && apt-get install -y git curl
RUN git clone https://github.com/DanWin/hosting.git /hosting
RUN /hosting/install_binaries.sh