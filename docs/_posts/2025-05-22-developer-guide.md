---
layout: docs
title:  "Developer Guide"
date:   2024-12-22 07:39:59 +0530
index: 9
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

## Requirements

- Go 1.25 or newer
- Node.js 22.12 or newer. The repository's `.nvmrc` pins it, so `nvm use` picks it up.
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
make webapp-install
```

Check that it worked:

```
% zasper -h
Usage of zasper:
  -cwd string
    	base directory of project (default ".")
  -debug
    	sets log level to debug
  -host string
    	interface to bind; 0.0.0.0 puts the server on the network (default "127.0.0.1")
  -port string
    	port to start the server on (default ":8048")
  -protected
    	enable protected mode
  -tracking
    	enable usage tracking (default true)
  -version
    	print the version and exit
```

[Configuration](/docs/configuration) explains every flag and environment variable.

## Develop

```bash
make dev
```

This runs the Vite dev server on port 3000 with hot reload, alongside the Go server on port 8048.
Open [http://localhost:3000](http://localhost:3000).

These help while you work:

```bash
zasper --debug --tracking=false   # debug logs, no usage data from your test runs
ZASPER_ACCESS_LOG=1 zasper        # log every HTTP request
```

## Test

```bash
make test
```

This runs the frontend tests and the Go tests, with the race detector on. The end-to-end suite runs
the frontend against a real server; see
[e2e/README.md](https://github.com/zasper-io/zasper/blob/main/e2e/README.md).

## Further Reading

- [CONTRIBUTING.md](https://github.com/zasper-io/zasper/blob/main/CONTRIBUTING.md): how to send a
  change
- [docs/API.md](https://github.com/zasper-io/zasper/blob/main/docs/API.md): the HTTP and WebSocket
  API, covered by semantic versioning from 1.0.0
- [CHANGELOG.md](https://github.com/zasper-io/zasper/blob/main/CHANGELOG.md): what changed in each
  release
