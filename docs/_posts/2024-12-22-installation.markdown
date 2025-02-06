---
layout: docs
title:  "Installation"
date:   2024-12-22 07:39:59 +0530
categories: usage
index: 2
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

Zasper comes in two flavours:
* Electron App
* Web App


### Electron App

Go to `ui` and build the frontend
```
npm install
npm run build
```

Go to project home and start the server

```bash
go build -o ui/public/zasper
```

Go to `ui` and run the app in dev mode

```
npm run electron-dev       # dev-mode

npm run electron-package   # prod-mode
```

#### Logs

By default, the Zasper electron application writes logs to the following locations:

```
on Linux: ~/.config/zasper/logs/main.log
on macOS: ~/Library/Logs/zasper/main.log
on Windows: %USERPROFILE%\AppData\Roaming\zasper\logs\main.log
```


