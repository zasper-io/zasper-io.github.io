---
layout: docs
title:  "Deploying on Cloud"
date:   2024-12-22 07:39:59 +0530
index: 4
categories: docs
permalink: docs/:title
author: Prasun Anand
---

###  Hosting Zasper 🚀

To host your own instance of Zasper, follow these steps:

#### 1. Start the server in protected mode
Run Zasper with the --protected=true flag to enable authentication:

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
### 2. Access the login page

Once the server starts, visit: [http://localhost:8048](http://localhost:8048). It will redirect you to a login page.


![Server Login Page](https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/login.png)

### 3. Authenticate using the access token
Copy the `Server Access Token` displayed in the console output when the server starts.
Paste it into the login page to authenticate and access the app.
