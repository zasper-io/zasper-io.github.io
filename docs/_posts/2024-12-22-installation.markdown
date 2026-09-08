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

Zasper ships in two forms:

| Type            | Description                                       |
| ---------------- | -------------------------------------------------- |
| **Web App**     | Terminal-first, lightweight, CLI-based experience  |
| **Desktop App** | Full native GUI, OS-integrated Jupyter launcher    |

## Web App

Install the Web App via Homebrew, Snap, or Conda.

### Homebrew (macOS)

```bash
brew install zasper-io/tap/zasper
```

Works on macOS 11 and later, Intel and Apple Silicon.

### Snap (Linux)

```bash
sudo snap install zasper
```

Works on Ubuntu 18.04+, Fedora, Arch, and other Snap-supported distributions.

### Conda

```bash
conda install zasper -c conda-forge
```

## Desktop App

For a native experience with a built-in kernel manager, download the Desktop app from the
[Downloads page](/downloads) or directly from
[GitHub Releases](https://github.com/zasper-io/zasper/releases). It bundles a launcher, a kernel
manager, and an integrated session runner.

## Current Release

**Version:** `v0.2.0-beta` — see the [Downloads page](/downloads) for the exact binary for every
platform.

### Platform Support

| OS                  | Minimum Version | Web App | Desktop App |
| ------------------- | ---------------- | :-----: | :---------: |
| macOS (Apple Silicon) | macOS 11        |   Yes   |     Yes     |
| macOS (Intel)         | macOS 11        |   Yes   |     Yes     |
| Debian (AMD64)        | Debian 10       |   Yes   |     Yes     |
| Debian (ARM64)        | Debian 10       |   Yes   |     Yes     |
| Debian (i386)         | Debian 10       |   Yes   |   Planned   |
| Red Hat (AMD64)       | RHEL 8          |   Yes   |   Planned   |
| Red Hat (ARM64)       | RHEL 8          |   Yes   |   Planned   |
| Red Hat (i386)        | RHEL 8          |   Yes   |   Planned   |
| Windows (AMD64)       | Windows 10+     |   Yes   |   Planned   |
| Windows (ARM64)       | Windows 11      |   Yes   |     Yes     |
| Windows (i386)        | Windows 10+     |   Yes   |   Planned   |

Additional platforms are being tested and will be supported in upcoming releases.

## Web App vs. Desktop App

| Feature                             | Web App | Desktop App |
| ------------------------------------ | :-----: | :----------: |
| Launch kernels                      |   Yes   |     Yes      |
| Works in terminal-only environments |   Yes   |      No      |
| Native OS UI (menus, dialogs)       |   No    |     Yes      |
| Auto kernel discovery               |   Yes   |     Yes      |
| Lightweight install                 |   Yes   |      No      |
| Suitable for remote servers         |   Yes   |      No      |

## Troubleshooting

**Command not found?**

Make sure `brew`, `snap`, or `conda` is correctly installed and added to your `PATH`.

**Kernel not showing up?**

Run `jupyter kernelspec list` to confirm it's installed and registered.

**Desktop app not launching?**

Ensure your OS version meets the minimum requirement. Zasper has no separate log file — it logs to
standard output — so run it from a terminal rather than by double-clicking, and pass `--debug` for
more detail:

```bash
zasper --debug
```
