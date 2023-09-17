FROM alpine:latest

LABEL com.beemovr.version="1.0.0"
LABEL com.beemovr.description="BeeMovr.com"
LABEL com.beemovr.maintainer="Soobin Rho <soobinrho@nsustain.com>"

#
# System setup
#
RUN apk update \
 && apk upgrade --no-cache \
 && apk add --no-cache \
    git \
    npm \
    python3 \
 && ln -sf python3 /usr/bin/python \
 && python3 -m ensurepip \
 && pip3 install --no-cache --upgrade pip \
    setuptools \
    python-dateutil \
    requests \
    Flask \
    flask-cors

#
# Source code setup
#
RUN cd ~ \
 && git clone https://github.com/ericfly02/BeeMovr.git \
 && cd BeeMovr/frontend \
 && npm install

COPY entrypoint.sh /entrypoint.sh
RUN ["chmod", "+x", "/entrypoint.sh"]
ENTRYPOINT ["/entrypoint.sh"]