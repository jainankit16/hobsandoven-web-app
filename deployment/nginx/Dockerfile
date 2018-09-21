FROM nginx:1.13

RUN mkdir -p /home/LogFiles \
     && echo "root:Docker!" | chpasswd \
     && echo "cd /home" >> /etc/bash.bashrc \
     && apt update \
     && apt install -y --no-install-recommends openssh-server supervisor

COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY sshd_config /etc/ssh/
COPY init_container.sh /bin/

#COPY index.html /home/site/wwwroot/index.html
COPY dist/ /home/site/wwwroot/
COPY sshd_config /etc/ssh/

RUN service ssh start

EXPOSE 80 2222

CMD ["/bin/init_container.sh"]
