---
layout: docs
title:  "Installation"
description: "Install Zasper on macOS, Linux or Windows with Homebrew, Snap, conda or a prebuilt binary, then check it works and upgrade an older release."
date:   2024-12-22 07:39:59 +0530
categories: docs
index: 1
group: Get started
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

Zasper is one static binary with no runtime dependencies. The download is {{ site.download_size }},
and it takes {{ site.binary_size }} on disk once it is unpacked. It runs a server on your own
machine, and you use it in your browser: Chrome, Firefox, Safari or Edge.

## Requirements

- **A Jupyter kernel.** Zasper runs notebooks on Jupyter kernels and never installs one on its own.
  `pip install ipykernel` is enough to get started; [Installing Jupyter
  Kernels](/docs/installing-jupyter-kernels) covers other languages. Without a kernel Zasper still
  starts, and the Launcher offers **Set up a Python kernel**, which makes a `.venv` with ipykernel in
  your project when you click it, once the folder is trusted.
- **A modern browser.**

## Homebrew (macOS, Linux)

```bash
brew tap zasper-io/tap
brew trust zasper-io/tap
brew install zasper-io/tap/zasper
```

Homebrew 6 loads nothing from a third-party tap until you trust it, which is what `brew trust`
records.

## Snap (Linux)

```bash
sudo snap install zasper
```

## Conda (Linux x86-64, Windows, Intel Mac)

```bash
conda install zasper -c conda-forge
```

## Prebuilt Binaries

Download the archive for your platform from the [Downloads page](/downloads/) or from
[GitHub Releases](https://github.com/zasper-io/zasper/releases), unpack it, and put `zasper`
somewhere on your `PATH`:

```bash
tar -xzf zasper-webapp-{{ site.data.release.version }}-linux-amd64.tar.gz
sudo mv zasper /usr/local/bin/
```

Every release carries a checksum file. To verify what you downloaded, run this in the folder that
has both:

```bash
sha256sum -c zasper_{{ site.data.release.version }}_checksums.txt --ignore-missing      # Linux
shasum -a 256 -c zasper_{{ site.data.release.version }}_checksums.txt --ignore-missing  # macOS
```

The macOS binaries are signed and notarized by Apple, so Gatekeeper opens them without a warning.

## Check That It Works

```bash
zasper --version
```

This prints `{{ site.data.release.version }}`. Then start Zasper in the folder you want to work in:

```bash
cd ~/notebooks
zasper
```

Zasper opens [http://127.0.0.1:8048](http://127.0.0.1:8048) in your browser, already signed in. If
no browser opens, for example because you passed `--no-browser` or are connected over SSH, open the
**Sign in with** link that Zasper prints when it starts.

## Platform Support

| Platform                 | Architectures              | Status                                                       |
| ------------------------ | -------------------------- | ------------------------------------------------------------ |
| macOS 12 or later        | Apple Silicon, Intel       | Fully supported                                              |
| Linux, any distribution  | x86-64, ARM64, i386        | Fully supported                                              |
| Windows 10 or later      | x86-64, ARM64, i386        | Supported, except the built-in terminal, which needs Zasper running under WSL               |

The Linux archives are static binaries, so one build works on every distribution, Debian and Red
Hat alike.

## Upgrading from 2.0.0

Zasper now asks whether you trust each folder before it runs anything the folder controls. After
the upgrade every folder is asked about once, including the one you start `zasper` in, because no
folder is trusted yet.

- **Until you trust a folder, nothing in it runs on its own.** A notebook's kernel waits for the
  folder to be trusted, the project's `.venv` is not offered as a kernel, and **Set up a Python
  kernel** and git commands that change the repository, such as commit, pull and push, ask first.
  You can still read every file, notebook and saved output.
- **Scripts and servers can skip the question.** `zasper --trust` trusts the folder for that run
  only, and `ZASPER_TRUST_ALL=1` in the environment trusts every folder. A server started by
  systemd or a script starts no kernels until its folder is trusted this way, or until someone
  trusts it from a browser or **Settings → Trust**.
- **Scripts that use Zasper's API** should know two things. The watch socket,
  `/api/contents/watch`, now names the files that changed instead of sending `reload`, so treat any
  message as a change. And a save given the `hash` a read returned is refused with `409` when the
  file has changed since; a save without one writes as before.

[Trusted Folders](/docs/trusted-folders) has the details.

## Upgrading from 1.1.0

2.0.0 is a major release because two details of Zasper's API changed, for security. The app itself
needs nothing from you beyond signing in once; these are the changes to know about:

- **Behind a reverse proxy, name its host.** A server on `127.0.0.1` now answers only to
  `localhost`, which stops a web page that points its own domain at your machine from reaching it.
  If Caddy or nginx serves Zasper as `zasper.example.com`, start Zasper with
  `--allow-host=zasper.example.com` or set `ZASPER_ALLOWED_HOSTS`, as
  [Deploying on Cloud](/docs/deploying-on-cloud#behind-a-reverse-proxy-with-https) shows. Without
  it, every page is `403 Forbidden`.
- **Scripts that open a kernel or terminal WebSocket send a header.** `?token=<jwt>` in the URL is
  no longer accepted, because a token in a URL ends up in logs and browser history. Send
  `Authorization: Bearer <jwt>` instead; see
  [docs/API.md](https://github.com/zasper-io/zasper/blob/main/docs/API.md#removed-in-200). The
  `protected` field is also gone from `/api/config` and `/api/info`, where it was always `true`.
- **A notebook's kernel starts in the notebook's folder**, as in Jupyter, not the folder Zasper was
  started in. A notebook in a subfolder that opened files by paths relative to the project root
  needs those paths adjusted.
- **Saved interactive output needs its cell run again.** HTML output saved in a notebook no longer
  runs scripts when the notebook opens, so a saved Plotly or Bokeh plot draws itself after you
  re-run its cell.
- **You sign in once more** after upgrading: the browser's session is now a cookie that no script in
  the page can read.
- **Request bodies have a size limit**: 512 MiB for the API, with uploads excepted, and 16 KiB for
  sign-in.

## Upgrading from 1.0.0

Three changes need attention if you run Zasper anywhere other than your own machine:

- **Every server now requires the access token.** Protected mode is always on. `--protected` is
  still accepted, so scripts that pass it keep starting, but `--protected=false` is ignored. A
  client that called the API without signing in has to exchange the access token at `/auth/login`
  first; see [docs/API.md](https://github.com/zasper-io/zasper/blob/main/docs/API.md#authentication).
- **`ZASPER_JWT_SECRET` has been removed.** If you set it to keep sessions valid across restarts,
  set `ZASPER_ACCESS_TOKEN` to a fixed token instead. Changing that token signs everyone out.
- **Zasper opens your browser on startup**, already signed in. It only does this when it is running
  in a terminal, and on Linux only when there is a display, so SSH sessions, Docker and systemd are
  left alone. Pass `--no-browser` to turn it off.

[Deploying on Cloud](/docs/deploying-on-cloud) shows the new setup for servers, Docker and systemd.

## Upgrading from 0.2.0-beta

1.0.0 is the first stable release. From here on, Zasper's HTTP and WebSocket API, its configuration
file and its command-line flags follow semantic versioning and will not break within 1.x. A few
things changed on the way there:

- **The server binds `127.0.0.1` by default** instead of every interface. If you reach Zasper from
  another machine, start it with `--host=0.0.0.0`; see [Deploying on Cloud](/docs/deploying-on-cloud).
- **The desktop app is gone.** Zasper is now only the local server you open in a browser. Install
  it with any of the methods above.
- **Homebrew installs a cask.** If you installed 0.x through Homebrew, run `brew uninstall zasper`
  first: from 1.0, Zasper is published as a cask rather than a formula.
- **`DELETE /ws/kernels/{kernel_id}` has been removed.** Use `DELETE /api/kernels/{kernelId}`,
  which is unchanged.
- **Kernel connection files have moved** from the system temp directory to `~/.zasper/runtime`.
  They are now readable only by you and are deleted when the kernel stops.
- **Zasper sends anonymous usage data** unless you turn it off. See
  [Configuration](/docs/configuration#anonymous-usage-data) for what is sent and how to stop it.

The full list is in the
[changelog](https://github.com/zasper-io/zasper/blob/main/CHANGELOG.md).

## Troubleshooting

**`zasper: command not found`**

The folder you put `zasper` in is not on your `PATH`. For Homebrew, snap or conda, check that the
package manager itself is on your `PATH`.

**The sign-in page asks for a token**

Paste the **Server Access Token** that Zasper printed when it started, or open the **Sign in with**
link instead. The token changes every time Zasper starts unless `ZASPER_ACCESS_TOKEN` is set, so a
token from an earlier run no longer works.

**A kernel doesn't show up**

Run `jupyter kernelspec list` to confirm the kernel is registered, then reload the page: Zasper reads
the kernel list again each time the Launcher asks for it. Restart Zasper only if you have installed a
new version of Python since it started. [Installing Jupyter
Kernels](/docs/installing-jupyter-kernels#troubleshooting) has more.

**Zasper can't be reached from another machine**

By default Zasper binds only `127.0.0.1`. See
[Deploying on Cloud](/docs/deploying-on-cloud#reaching-it-from-another-machine).

**Something else is wrong**

Zasper logs to standard output, not to a file. Run it from a terminal with `--debug` to see more:

```bash
zasper --debug
```

If that doesn't explain it, [open an issue](https://github.com/zasper-io/zasper/issues) with that
output.
