---
layout: docs
title:  "Installation Webapp"
date:   2024-12-22 07:39:59 +0530
index: 1
categories: docs
permalink: docs/:title
author: Prasun Anand
---



#### Build the frontend

```bash
cd ./ui/
npm run build
```

#### Start the backend


Go to project home and start the server

```bash
go build
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
% zasper 
2024/12/15 20:39:12 Zasper Server started! Listening on port:8048

███████╗ █████╗ ███████╗██████╗ ███████╗██████╗ 
╚══███╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗
  ███╔╝ ███████║███████╗██████╔╝█████╗  ██████╔╝
 ███╔╝  ██╔══██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗
███████╗██║  ██║███████║██║     ███████╗██║  ██║
╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝

```

Go to `http://localhost:8048`