---
layout: docs
title:  "Developer Guide"
description: "Build Zasper from source: the Go and Node versions it needs, the development servers for the backend and the UI, and how to run the tests."
date:   2024-12-22 07:39:59 +0530
index: 10
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

## Requirements

- Go 1.26 or newer
- Node.js 22 (22.12 or later; Node 26 fails the frontend tests). The repository's `.nvmrc`
  pins it, so `nvm use` picks it up.
- `git` and `make`

## Build from Source

```bash
git clone https://github.com/zasper-io/zasper
cd zasper
make init
```

`make init` installs the frontend's npm dependencies. Then build:

```bash
make build
```

This builds the frontend, embeds it in the Go binary, and writes `zasper` to the project root. To
install it into your Go bin directory instead, which needs that directory on your `PATH`:

```bash
make install
```

Check that it worked:

```
% zasper -h
Usage of zasper:
  -allow-host string
    	other host names a server on loopback answers to, comma-separated, such as a reverse proxy's
  -check-update
    	ask zasper.io for the newest version and exit: 0 when up to date, 1 when there is a newer one, 2 when the check failed
  -cwd string
    	base directory of project (default ".")
  -debug
    	sets log level to debug
  -host string
    	interface to bind; 0.0.0.0 puts the server on the network (default "127.0.0.1")
  -no-browser
    	do not open the app in a browser on startup
  -port string
    	port to start the server on (default ":8048")
  -protected
    	deprecated and ignored: Zasper always runs in protected mode (default true)
  -tracking
    	enable usage tracking (default true)
  -trust
    	trust the project folder for this run: its kernels, .venv and language servers start without asking
  -version
    	print the version and exit
```

[Configuration](/docs/configuration) explains every flag and environment variable.

## Develop

```bash
make dev
```

This runs the Vite dev server on port 3000 with hot reload, alongside the Go server on port 8048,
which `make dev` starts with `--no-browser`. Open [http://localhost:3000](http://localhost:3000)
and sign in with the access token the Go server prints. Set `ZASPER_ACCESS_TOKEN` to keep the same
token, and stay signed in, while you restart the server.

These help while you work:

```bash
zasper --debug --tracking=false   # debug logs, no usage data from your test runs
ZASPER_ACCESS_LOG=1 zasper        # log every HTTP request
```

## Test

```bash
make test
```

This runs the frontend tests and the Go tests, with the race detector on. `make test-go` and
`make test-frontend` run one half each, and `make e2e` runs the end-to-end suite, which drives the
frontend against a real server; see
[e2e/README.md](https://github.com/zasper-io/zasper/blob/main/e2e/README.md).

## Repository Layout

- `internal/`: the Go server, one package per area, such as `kernel`, `content`, `lsp` and `trust`
- `ui/`: the React frontend, built with Vite and embedded in the binary
- `e2e/`: the Playwright browser tests
- `docs/`: developer notes on the API and on individual features
- `docker/`: the Dockerfile and a Compose example
- `scripts/`: release helpers that sync the version and extract changelog sections

## Further Reading

- [CONTRIBUTING.md](https://github.com/zasper-io/zasper/blob/main/CONTRIBUTING.md): how to send a
  change. Your first pull request asks you to sign the
  [Contributor License Agreement](https://github.com/zasper-io/zasper/blob/main/CLA.md)
- [docs/API.md](https://github.com/zasper-io/zasper/blob/main/docs/API.md): the HTTP and WebSocket
  API, covered by semantic versioning from 1.0.0
- [CHANGELOG.md](https://github.com/zasper-io/zasper/blob/main/CHANGELOG.md): what changed in each
  release
