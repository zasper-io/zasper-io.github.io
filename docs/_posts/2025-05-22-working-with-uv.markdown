---
layout: docs
title:  "Working with UV"
description: "Use uv to build fast, reproducible Python environments and register them as Jupyter kernels for Zasper."
date:   2024-12-22 07:39:59 +0530
index: 4
group: Environments
categories: docs
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

UV is a fast Python package manager and virtual environment tool built in Rust. It's a drop-in
replacement for `pip`, `venv`, and `virtualenv`, and it's well suited to lightweight, reproducible
Python environments — a good fit for use with Zasper.

This guide shows how to create and configure a Python project using UV and register it as a
Jupyter kernel for use in Zasper.

### Step 1: Create a New Project

Start by initializing a new Python project with UV:

```bash
uv init exampleUV
cd exampleUV
uv run main.py   # creates a .venv directory automatically
```

The `.venv` directory is your virtual environment — an isolated space where you can install
dependencies without affecting your global Python installation.

### Step 2: Install Packages

Install the `ipykernel` package, which allows the environment to be used as a kernel in
Jupyter-based tools like Zasper:

```bash
uv add --dev ipykernel
```

This records `ipykernel` as a development dependency in `pyproject.toml` and installs it into
`.venv`, so the next `uv sync` keeps it. uv commands find the project's `.venv` on their own, so
there is no environment to activate. Add any other libraries your project needs with `uv add`.

If you open this folder in Zasper now and trust it, it already lists the environment: a project's
own `.venv` with `ipykernel` in it appears first in the Launcher as **Python 3.x (.venv)**, with no
registration needed (see [Trusted Folders](/docs/trusted-folders)). Zasper's **Set up a Python
kernel** button does steps 1 and 2 for you when a project has no kernel yet — see [Installing
Jupyter Kernels](/docs/installing-jupyter-kernels).

### Step 3: Register the Kernel (Optional)

Register the environment only if you want to use it from other projects too, or from Jupyter itself:

```bash
uv run python -m ipykernel install --user --name=exampleUV
```

This creates a new kernel spec named `exampleUV`. It will now appear as an option in the Zasper
kernel selector wherever Zasper is opened.

## You're All Set

Launch Zasper in the `exampleUV` folder, choose **Python 3.x (.venv)** — or the `exampleUV` kernel if
you registered it — and run code in your new environment.
