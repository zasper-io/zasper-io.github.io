---
layout: docs
title:  "Deploying on Cloud"
date:   2024-12-22 07:39:59 +0530
index: 4
categories: docs
permalink: docs/:title
author: Prasun Anand
---
### 🏠 Hosting Zasper 🚀

You can easily host your own instance of Zasper for personal use or team collaboration. This guide covers starting the server, authentication, remote deployment, and containerization.



---

#### 1. Start the Server in Protected Mode

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
                Version: 0.1.0-alpha
----------------------------------------------------------
 ✅ Server started successfully!
 📡 Listening on:        http://localhost:8048
 🖥️  Webapp available at: http://localhost:8048
 🔒 Protected Mode:      enabled
 🔐 Server Access Token: 14be1b674a3b9196a82c01129028d0dd
==========================================================
```

---

#### 2. Open the Login Page

Visit your server in the browser:

[http://localhost:8048](http://localhost:8048)

Zasper will redirect you to the login page automatically.

![Server Login Page](https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/login.png)

---

#### 3. Authenticate Using the Access Token

Copy the **Server Access Token** from your terminal output and paste it into the login screen to authenticate.

> ⚡ That's it! You're now running a fully secured Zasper instance.

Need to deploy this on a remote server or Docker container? Let me know and I can help generate instructions.


## Tips & Best Practices

* Keep your access token secret! **Treat it like a password.**
* Regularly update Zasper to get latest security patches.
* For production, always run behind a reverse proxy with HTTPS.
* Consider systemd or other service managers to keep Zasper running on reboot.
