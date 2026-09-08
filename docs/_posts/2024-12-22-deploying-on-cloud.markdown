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

You can host your own instance of Zasper for personal use or team collaboration. This guide covers
starting the server, authentication, remote deployment, and containerization.

## Starting the Server in Protected Mode

Run Zasper with authentication enabled by using the `--protected=true` flag:

```
prasunanand@Prasuns-Mac-mini example % zasper --protected=true

==========================================================
     ███████╗ █████╗ ███████╗██████╗ ███████╗██████╗
     ╚══███╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗
       ███╔╝ ███████║███████╗██████╔╝█████╗  ██████╔╝
      ███╔╝  ██╔══██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗
     ███████╗██║  ██║███████║██║     ███████╗██║  ██║
     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝

                    Zasper Server
                Version: 0.2.0-beta
----------------------------------------------------------
 ✅ Server started successfully!
 📡 Listening on:        http://localhost:8048
 🖥️  Webapp available at: http://localhost:8048
 🔒 Protected Mode:      enabled
 🔐 Server Access Token: 14be1b674a3b9196a82c01129028d0dd
==========================================================
```

### Opening the Login Page

Visit your server in the browser:

[http://localhost:8048](http://localhost:8048)

Zasper will redirect you to the login page automatically.

![Server Login Page](https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/login.png)

### Authenticating with the Access Token

Copy the Server Access Token from your terminal output and paste it into the login screen to
authenticate. You're now running a fully secured Zasper instance.

## Running It in Docker

The [`docker/`](https://github.com/zasper-io/zasper/tree/main/docker) directory in the main repo
builds a container that installs the latest Zasper release, installs Jupyter for it under a
non-root `zasper` user, and serves it on port 8048:

```bash
git clone https://github.com/zasper-io/zasper
cd zasper/docker
docker compose build
docker compose up -d
```

Without `docker compose`, the same two steps look like this instead:

```bash
docker build . -t zasper
docker run -p 8048:8048 -d zasper
```

Either way, the same server you started above is now on port 8048 of whatever host is running the
container — run it with `--protected=true` (edit the `Dockerfile`'s `CMD`, or override it in
`docker-compose.yml`) before exposing that host to anything but your own machine.

## Remote Servers

Zasper doesn't do anything special for "remote" — it's the same binary or the same container, just
started on a machine you reach over the network instead of `localhost`. Bind it, put a reverse
proxy with TLS in front of it, and keep `--protected=true` on: see Tips below.

## Tips and Best Practices

* Keep your access token secret. Treat it like a password.
* Regularly update Zasper to get the latest security patches.
* For production, always run behind a reverse proxy with HTTPS.
* Consider systemd or another service manager to keep Zasper running on reboot.
