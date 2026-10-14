---
layout: docs
title:  "Configuration"
description: "Zasper's command-line flags and environment variables, and the settings it keeps in ~/.zasper/config.json."
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
| `--host` | `127.0.0.1` | The network interface to listen on. `0.0.0.0` makes the server reachable from other machines; see [Deploying on Cloud](/docs/deploying-on-cloud) |
| `--port` | `:8048` | The port to listen on. `8888` and `:8888` both work |
| `--allow-host` | | Other host names the server answers to while it listens on `127.0.0.1`, comma-separated, such as a reverse proxy's `zasper.example.com`; see [Deploying on Cloud](/docs/deploying-on-cloud#behind-a-reverse-proxy-with-https) |
| `--no-browser` | `false` | Don't open Zasper in a browser on startup. Zasper only opens one when it is running in a terminal, and on Linux only when there is a display |
| `--tracking` | `true` | Send [anonymous usage data](#anonymous-usage-data) |
| `--trust` | `false` | Trust the project folder for this run, so its kernels, `.venv` and language servers start without asking; see [Trusted Folders](/docs/trusted-folders) |
| `--debug` | `false` | Log at debug level |
| `--version` | | Print the version and exit |
| `--check-update` | | Ask zasper.io for the newest version and exit: `0` when up to date, `1` when there is a newer one, `2` when the check failed |

`zasper mcp` is a command of its own rather than a flag. It connects a coding agent to a running
Zasper server over MCP; see [MCP Server](/docs/mcp-server).

Every Zasper server requires the access token it prints at startup. `--protected` is still
accepted so that older scripts keep starting, but it is ignored.

A `--port` that includes a host, such as `--port=0.0.0.0:8048`, still listens on exactly that
address. This keeps scripts written before 1.0 working unchanged.

## Environment Variables

| Variable | What it does |
| --- | --- |
| `ZASPER_ACCESS_TOKEN` | A fixed access token, instead of a new one on every start. Sessions are signed with a key derived from it, so while it stays the same they survive a restart, and changing it signs everyone out |
| `ZASPER_TELEMETRY` | `0`, `false`, `off` or `no` turns usage data off for this run; `1`, `true`, `on` or `yes` turns it on |
| `ZASPER_LOG_FORMAT` | `console` or `json`. By default Zasper uses console format in a terminal and JSON otherwise |
| `ZASPER_ACCESS_LOG` | `1`, `true`, `on` or `yes` logs every HTTP request |
| `ZASPER_ALLOWED_HOSTS` | Host names added to `--allow-host`'s, comma-separated |
| `ZASPER_TRUST_ALL` | `1` trusts every folder for this run; see [Trusted Folders](/docs/trusted-folders). The Docker image sets it |

`ZASPER_JWT_SECRET` was removed in 1.1.0 and is ignored; use `ZASPER_ACCESS_TOKEN` instead.

## Files

| Path | Contents |
| --- | --- |
| `~/.zasper/config.json` | Your theme, editor and language server settings, chosen Python interpreter, trusted folders, usage-data setting and anonymous ID |
| `~/.zasper/connections.json` | Your database connections for SQL cells, without their passwords. A project's own are in `<project>/.zasper/connections.json` |
| `~/.zasper/secrets.json` | Passwords for those connections, readable only by you, when the system keychain cannot hold them |
| `~/.zasper/checkpoints/` | Snapshots of the files a coding agent changed, so a turn can be undone. A project's are removed after 30 days without a new one |
| `~/.zasper/update-check.json` | The answer to the last check for a newer version, made at most once a day |
| `~/.zasper/runtime/` | Connection files for running kernels, and a record of each running server for `zasper mcp` to find. They are readable only by you and are deleted when they stop |

## Logging

Zasper writes its logs to standard output. By default it logs only changes and failures; successful
requests and routine kernel activity appear only with `--debug`.

In a terminal, logs are formatted for reading. When the output goes elsewhere, such as a pipe, a
file, systemd or a container's log collector, each line is JSON, and the startup banner becomes a
single line whose `access_token` field carries the token. Set `ZASPER_LOG_FORMAT` to override this.
To log every HTTP request without turning on all debug logging, set `ZASPER_ACCESS_LOG=1`.

## Update Notices

Zasper asks zasper.io for the newest version at most once a day, and keeps the answer in
`~/.zasper/update-check.json`, so the next start reads it without asking again. The request fetches
one file, `https://zasper.io/latest.json`. A failed check is logged only with `--debug` and changes
nothing you see.

When the last answer names a newer version, you see it in three places:

- **The startup banner** ends with a line naming the newer version and the one you have, then
  `Update with: brew upgrade zasper` if you installed with Homebrew, and a link to the release
  notes. In JSON logs this is a separate line whose message is `a newer version is available`.
- **The status bar** shows the new version at its right end. Its menu has the release date,
  **Release notes**, **Copy "brew upgrade zasper"** for a Homebrew install, and **Hide until the
  next version**. A release whose major number differs from yours is marked **Major**.
- **Settings → Updates** says what the last check found and when. **Check now** asks again
  straight away.

If the version you run is older than the oldest one without a known security problem, the notice
says **Security update** instead, with a warning icon in the status bar. Hiding it then lasts only
until the next day.

After an upgrade, the first time you open Zasper it shows the release notes for every version since
the one you last ran, in a **What's New** tab. This happens once; **Help: What's New** in the command
palette opens it again. A new install does not open it.

The snap never checks, because snaps update themselves. Settings says so in place of **Check now**.

To check from a script, run `zasper --check-update`. It prints the result and exits with `0` when
you have the newest version, `1` when there is a newer one and `2` when the check failed.

## Anonymous Usage Data

Zasper sends a small amount of anonymous usage data: counts of things like notebooks opened, cells
run and terminals started, along with the Zasper version, OS and CPU architecture. It never sends
file names, paths, code, project names, your username or your IP address. There is no session
recording and no tracking cookie.
[PRIVACY.md](https://github.com/zasper-io/zasper/blob/main/PRIVACY.md) lists every event and every
value it can carry.

Any one of these turns it off. The first two apply only to the current run and take precedence over
the setting:

1. `zasper --tracking=false`
2. `ZASPER_TELEMETRY=0 zasper`
3. **Settings → Privacy → Send anonymous usage data**, which is remembered

With tracking off, Zasper sends no usage data. Unless it was installed as a snap, it still checks
zasper.io for a newer version once a day, and it loads some widget libraries from jsDelivr unless
**Settings → Privacy → Load widget libraries from the internet** is off. **Settings → Privacy →
Anonymous ID → Reset** replaces your ID, so what is sent next can't be linked to what was sent before.
