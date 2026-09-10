---
layout: docs
title:  "Deploying on Cloud"
date:   2024-12-22 07:39:59 +0530
index: 5
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

You can host your own instance of Zasper on a server and use it from anywhere. This guide covers
protected mode, making the server reachable, putting it behind HTTPS, Docker, and running it as a
service.

Zasper gives whoever can log in your project files and a terminal. Never make it reachable from
another machine without protected mode.

## Protected Mode

Start Zasper with authentication turned on:

```bash
zasper --protected=true
```

The startup banner shows the access token:

```
==========================================================
     ███████╗ █████╗ ███████╗██████╗ ███████╗██████╗
     ╚══███╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗
       ███╔╝ ███████║███████╗██████╔╝█████╗  ██████╔╝
      ███╔╝  ██╔══██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗
     ███████╗██║  ██║███████║██║     ███████╗██║  ██║
     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝

                    Zasper Server
                Version: 1.0.0
----------------------------------------------------------
 ✅ Server started successfully!
 📡 Bound to:            127.0.0.1:8048
 🖥️  Webapp available at: http://127.0.0.1:8048
 🔒 Protected Mode:      enabled
 🔐 Server Access Token: 14be1b674a3b9196a82c01129028d0dd
 📊 Anonymous usage data: on  (--tracking=false to turn off)
                          see PRIVACY.md for what is sent
==========================================================
```

Open the server in your browser and Zasper redirects you to the login page. Paste the access token
from the banner to log in.

![Server Login Page](https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/login.png)

Zasper generates a new access token every time it starts. After logging in, your browser holds a
session. Sessions are signed with a key that is also random on every start, so by default a restart
logs everyone out. To keep sessions valid across restarts, set a fixed key:

```bash
export ZASPER_JWT_SECRET="$(openssl rand -hex 32)"   # store this somewhere safe and reuse it
zasper --protected=true
```

## Reaching It from Another Machine

By default Zasper listens only on `127.0.0.1`, so nothing else can connect to it. Use `--host` to
open it up, and always together with protected mode:

```bash
zasper --protected=true --host=0.0.0.0
```

The banner then shows `Bound to: 0.0.0.0:8048`. Other machines reach it at the server's own address
on port 8048.

## Behind a Reverse Proxy with HTTPS

For anything beyond your own network, put Zasper behind a reverse proxy that handles HTTPS. If the
proxy runs on the same machine, leave Zasper on the default `127.0.0.1`, because only the proxy
needs to reach it.

Terminals, kernels and file watching use WebSockets, so the proxy has to pass WebSocket upgrades
through. It also has to forward the original `Host` header: Zasper refuses a WebSocket connection
when the browser's `Origin` doesn't match the `Host` it receives.

With [Caddy](https://caddyserver.com), which does both by default and gets the certificate for
you:

```
zasper.example.com {
    reverse_proxy 127.0.0.1:8048
}
```

With nginx:

```nginx
server {
    listen 443 ssl;
    server_name zasper.example.com;
    # ssl_certificate and ssl_certificate_key go here

    location / {
        proxy_pass http://127.0.0.1:8048;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 1d;
    }
}
```

`proxy_read_timeout` keeps a quiet terminal or kernel connection from being closed after nginx's
default 60 seconds.

## Running It in Docker

The [`docker/`](https://github.com/zasper-io/zasper/tree/main/docker) directory in the main
repository builds an image from that checkout. The image installs Jupyter and runs Zasper as a
non-root `zasper` user:

```bash
git clone https://github.com/zasper-io/zasper
cd zasper/docker
docker compose up -d --build
```

The Compose file opens the project in `docker/workspace`, and publishes port 8048 on `127.0.0.1`
only. Inside the container Zasper listens on `0.0.0.0`, because that's the only way to reach it
through Docker's port mapping. To make it reachable from other machines, change the port mapping
and turn on protected mode in `docker-compose.yml`:

```yaml
services:
  zasper:
    ports:
      - "8048:8048"
    command: ["zasper", "--host=0.0.0.0", "--protected=true"]
    environment:
      ZASPER_JWT_SECRET: replace-with-a-long-random-string
```

The access token is in the container's log:

```bash
docker compose logs zasper
```

Without Compose, build from the repository root:

```bash
docker build -f docker/Dockerfile -t zasper .
docker run -d -p 127.0.0.1:8048:8048 -v "$PWD/workspace:/home/zasper" zasper
```

## Running It as a Service

On Linux, systemd can start Zasper at boot and restart it if it stops. Save this as
`/etc/systemd/system/zasper.service`, adjusting the user, folder and binary path:

```ini
[Unit]
Description=Zasper
After=network.target

[Service]
User=zasper
WorkingDirectory=/home/zasper/notebooks
EnvironmentFile=/etc/zasper.env
ExecStart=/usr/local/bin/zasper --protected=true
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Put `ZASPER_JWT_SECRET=...` in `/etc/zasper.env` and make that file readable only by root. Then:

```bash
sudo systemctl enable --now zasper
journalctl -u zasper
```

Zasper finds the kernels that the service's user has installed. Under systemd, logs are written as
JSON; [Configuration](/docs/configuration#logging) explains how to change that.

## Tips

* Treat the access token and `ZASPER_JWT_SECRET` like passwords.
* Update Zasper regularly to get security fixes.
* Only open notebooks you trust. Zasper does not yet sign or trust notebooks, so saved HTML output
  can run scripts when a notebook is opened; see [Notebook Support](/docs/notebook-support#known-limitations).
