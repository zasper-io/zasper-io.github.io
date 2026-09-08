---
layout: docs
title:  "Developer Guide"
date:   2024-12-22 07:39:59 +0530
index: 7
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

## Build from Source

### Download the Source

```bash
git clone https://github.com/zasper-io/zasper
```

### Install Dependencies

```bash
make init
```

This installs the frontend's npm dependencies.

### Build the Project

From the project root, build both the frontend and the backend:

```bash
make build
```

This creates a binary called `zasper`. Add it to your `PATH`.

Run `zasper` in any directory to confirm the installation succeeded:

```
% zasper -h
Usage of ../zasper:
  -cwd string
    	base directory of project (default ".")
  -debug
    	sets log level to debug
  -port string
    	port to start the server on (default ":8048")
  -protected
    	enable protected mode
  -tracking
    	enable usage tracking (default true)
```

Go to any directory you want to serve and run `zasper`. This starts the Zasper server in that
directory:

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
                Version: 0.2.0-beta
----------------------------------------------------------
 ✅ Server started successfully!
 📡 Listening on:         http://localhost:8048
 🖥️ Webapp available at:  http://localhost:8048
 🔒 Protected Mode:       disabled
==========================================================
```

Go to `http://localhost:8048`.
