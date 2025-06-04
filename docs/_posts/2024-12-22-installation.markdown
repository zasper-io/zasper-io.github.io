---
layout: docs
title:  "Installation"
date:   2024-12-22 07:39:59 +0530
categories: usage
index: 1
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

Zasper ships in **two flavors**:

| Type            | Description                                      |
| --------------- | ------------------------------------------------ |
| **Web App**     | Terminal-first, lightweight CLI-based experience |
| **Desktop App** | Full native GUI, OS-integrated Jupyter launcher  |

---

## 🌐 Web App (Terminal-based)

You can install the Web App via Homebrew, Snap, or (soon) Conda.

### 🍺 Homebrew (macOS)

```bash
brew install zasper-io/tap/zasper
```

> ✅ Works on macOS 11+ (Intel & Apple Silicon)

---

### 🐧 Snap (Linux)

```bash
sudo snap install zasper
```

> ✅ Works on Ubuntu 18.04+, Fedora, Arch, and other Snap-supported distros.

---

### 📦 Conda

```
conda install zasper -c conda-forge
```

---

## 🖥️ Desktop App (Native GUI)

For a native experience with a built-in kernel manager, download the Desktop app:

👉 Visit our [Downloads Page](https://zasper.io/downloads)
Or head straight to [GitHub Releases](https://github.com/zasper-io/zasper/releases)

> 🧹 The Desktop app bundles a launcher, kernel manager, and integrated session runner.

---

## 📦 Current Release

**Version:** `v0.1.0-alpha`

### ✅ Platform Support

| OS                  | Min Version | Web App | Desktop App |
| ------------------- | ----------- | :-----: | :---------: |
| **macOS (Silicon)** | macOS 11    |    ✅    |      ✅      |
| **macOS (Intel)**   | macOS 11    |    ✅    |      ✅      |
| **Debian (AMD64)**  | Debian 10   |    ✅    |      ✅      |
| **Debian (ARM64)**  | Debian 10   |    ✅    |      ✅      |
| **Debian (i386)**   | Debian 10   |    ✅    |      ✅      |
| **RedHat (AMD64)**  | RHEL 8      |    ✅    |      ❌      |
| **RedHat (ARM64)**  | RHEL 8      |    ✅    |      ❌      |
| **RedHat (i386)**   | RHEL 8      |    ✅    |      ❌      |
| **Windows (AMD64)** | Win 10+     |    ✅    |      ❌      |
| **Windows (ARM64)** | Win 11      |    ✅    |      ✅      |
| **Windows (i386)**  | Win 10+     |    ✅    |      ❌      |

> ⏳ **Additional platforms** are being tested and will be supported in upcoming releases.

---

## ⚖️ Web App vs Desktop App

| Feature                             | Web App | Desktop App |
| ----------------------------------- | :-----: | :---------: |
| Launch kernels                      |    ✅    |      ✅      |
| Works in terminal-only environments |    ✅    |      ❌      |
| Native OS UI (menus, dialogs)       |    ❌    |      ✅      |
| Auto kernel discovery               |    ✅    |      ✅      |
| Lightweight install                 |    ✅    |      ❌      |
| Suitable for remote servers         |    ✅    |      ❌      |

---

## 🛠️ Troubleshooting Installation

* **Command not found?**

Make sure `brew`, `snap`, or `conda` is correctly installed and added to your `PATH`.



* **Kernel not showing up?**

Run `jupyter kernelspec list` to confirm it's installed and registered.

* **Desktop app not launching?**

Ensure your OS version meets the minimum requirement. Check logs via terminal:
