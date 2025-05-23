---
layout: docs
title:  "Developer Guide"
date:   2024-12-22 07:39:59 +0530
index: 6
categories: docs
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---


## Build from source

#### Download source

```bash
git clone https://github.com/zasper-io/zasper
```


#### Build the frontend

```bash
make init
```

#### Start the backend


Go to project home and start the server

```bash
make build
```
This will crate a binary called `zasper`. Now add this binary to your path.

Run zasper in any directory to see if the installation was done correctly.

```
% zasper -h
Usage of ../zasper:
  -cwd string
    	base directory of project (default ".")
  -debug
    	sets log level to debug
  -port string
    	port to start the server on (default ":8048")
```


Go to any directory you want to serve and run `zasper`. This starts zasper server in the directory.

```
prasunanand@Prasuns-Mac-mini example % zasper
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
 📡 Listening on:         http://localhost:8048
 🖥️ Webapp available at:  http://localhost:8048
 🔒 Protected Mode:       disabled
==========================================================
```

Go to `http://localhost:8048`