---
layout: docs
title:  "Installation"
date:   2024-12-22 07:39:59 +0530
categories: docs
index: 1
group: Get started
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

Zasper is a single binary of about 8 MB with no runtime dependencies. It runs a server on your own
machine, and you use it in your browser: Chrome, Firefox, Safari or Edge.

## Requirements

- **A Jupyter kernel.** Zasper runs notebooks on Jupyter kernels but does not install one.
  `pip install ipykernel` is enough to get started; [Installing Jupyter
  Kernels](/docs/installing-jupyter-kernels) covers other languages. Without a kernel Zasper still
  starts, and the Launcher tells you what to install.
- **A modern browser.**

## Homebrew (macOS)

```bash
brew install zasper-io/tap/zasper
```

## Snap (Linux)

```bash
sudo snap install zasper
```

## Conda

```bash
conda install zasper -c conda-forge
```

## Prebuilt Binaries

Download the archive for your platform from the [Downloads page](/downloads) or from
[GitHub Releases](https://github.com/zasper-io/zasper/releases), unpack it, and put `zasper`
somewhere on your `PATH`:

```bash
tar -xzf zasper-webapp-1.0.0-linux-amd64.tar.gz
sudo mv zasper /usr/local/bin/
```

Every release carries a checksum file. To verify what you downloaded, run this in the folder that
has both:

```bash
sha256sum -c zasper_1.0.0_checksums.txt --ignore-missing      # Linux
shasum -a 256 -c zasper_1.0.0_checksums.txt --ignore-missing  # macOS
```

The macOS binaries are signed and notarized by Apple, so Gatekeeper opens them without a warning.

## Check That It Works

```bash
zasper --version
```

This prints `1.0.0`. Then start Zasper in the folder you want to work in:

```bash
cd ~/notebooks
zasper
```

and open [http://127.0.0.1:8048](http://127.0.0.1:8048).

## Platform Support

| Platform                 | Architectures              | Status                                                       |
| ------------------------ | -------------------------- | ------------------------------------------------------------ |
| macOS 12 or later        | Apple Silicon, Intel       | Fully supported                                              |
| Linux, any distribution  | x86-64, ARM64, i386        | Fully supported                                              |
| Windows 10 or later      | x86-64, ARM64, i386        | Runs, but the terminal and some kernel paths are less tested; use WSL for the best experience |

The Linux archives are static binaries, so one build works on every distribution, Debian and Red
Hat alike.

## Upgrading from 0.2.0-beta

1.0.0 is the first stable release. From here on, Zasper's HTTP and WebSocket API, its configuration
file and its command-line flags follow semantic versioning and will not break within 1.x. A few
things changed on the way there:

- **The server binds `127.0.0.1` by default** instead of every interface. If you reach Zasper from
  another machine, start it with `--host=0.0.0.0` and turn on `--protected=true` at the same time;
  see [Deploying on Cloud](/docs/deploying-on-cloud).
- **The desktop app is gone.** Zasper is now only the local server you open in a browser. Install
  it with any of the methods above.
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

**A kernel doesn't show up**

Run `jupyter kernelspec list` to confirm the kernel is registered, then restart Zasper. Kernels
installed while it is running are picked up on the next start.

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
