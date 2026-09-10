---
layout: docs
title:  "Configuration"
date:   2026-09-10 09:00:00 +0530
index: 6
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Zasper is configured with command-line flags and a few environment variables. Settings you change
in the app are stored in `~/.zasper/config.json`.

## Command-Line Flags

| Flag | Default | What it does |
| --- | --- | --- |
| `--cwd` | `.` | The folder to open as the project |
| `--host` | `127.0.0.1` | The network interface to listen on. `0.0.0.0` makes the server reachable from other machines; use it together with `--protected=true` |
| `--port` | `:8048` | The port to listen on. `8888` and `:8888` both work |
| `--protected` | `false` | Require an access token to log in; see [Deploying on Cloud](/docs/deploying-on-cloud) |
| `--tracking` | `true` | Send [anonymous usage data](#anonymous-usage-data) |
| `--debug` | `false` | Log at debug level |
| `--version` | | Print the version and exit |

A `--port` that includes a host, such as `--port=0.0.0.0:8048`, still listens on exactly that
address. This keeps scripts written before 1.0 working unchanged.

## Environment Variables

| Variable | What it does |
| --- | --- |
| `ZASPER_JWT_SECRET` | The key used to sign login sessions in protected mode. Without it, Zasper generates a random key on every start, so a restart logs everyone out |
| `ZASPER_TELEMETRY` | `0`, `false`, `off` or `no` turns usage data off for this run; `1`, `true`, `on` or `yes` turns it on |
| `ZASPER_LOG_FORMAT` | `console` or `json`. By default Zasper uses console format in a terminal and JSON otherwise |
| `ZASPER_ACCESS_LOG` | `1`, `true`, `on` or `yes` logs every HTTP request |

## Files

| Path | Contents |
| --- | --- |
| `~/.zasper/config.json` | Your theme, recent projects, usage-data setting and anonymous ID |
| `~/.zasper/runtime/` | Connection files for running kernels. They are readable only by you and are deleted when the kernel stops |

## Logging

Zasper writes its logs to standard output. By default it logs only changes and failures; successful
requests and routine kernel activity appear only with `--debug`.

In a terminal, logs are formatted for reading. When the output goes elsewhere, such as a pipe, a
file, systemd or a container's log collector, each line is JSON. Set `ZASPER_LOG_FORMAT` to override
this. To log every HTTP request without turning on all debug logging, set `ZASPER_ACCESS_LOG=1`.

## Anonymous Usage Data

Zasper sends a small amount of anonymous usage data: counts of things like notebooks opened, cells
run and terminals started, along with the Zasper version, OS and CPU architecture. It never sends
file names, paths, code, project names, your username or your IP address. There is no session
recording and no cookie.
[PRIVACY.md](https://github.com/zasper-io/zasper/blob/main/PRIVACY.md) lists every event and every
value it can carry.

Any one of these turns it off. The first two apply only to the current run and take precedence over
the setting:

1. `zasper --tracking=false`
2. `ZASPER_TELEMETRY=0 zasper`
3. **Settings → Privacy → Send anonymous usage data**, which is remembered

With tracking off, Zasper collects nothing and makes no requests. **Settings → Privacy → Reset
anonymous ID** replaces your ID, so what is sent next can't be linked to what was sent before.
