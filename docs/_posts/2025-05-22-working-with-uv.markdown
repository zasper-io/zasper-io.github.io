---
layout: docs
title:  "Working with UV"
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

### Step 2: Activate the Virtual Environment

To use the environment in your terminal session:

```bash
source .venv/bin/activate
```

This activates the environment so that any Python or pip commands you run use the local `.venv`.

### Step 3: Install Packages

Install the `ipykernel` package, which allows the environment to be used as a kernel in
Jupyter-based tools like Zasper:

```bash
uv pip install ipykernel
```

You can also install any additional libraries your project needs at this stage.

### Step 4: Register the Kernel

Make the environment available to Jupyter (and Zasper) by registering it as a named kernel:

```bash
uv run python -m ipykernel install --user --name=exampleUV
```

This creates a new kernel spec named `exampleUV`. It will now appear as an option in the Zasper
kernel selector.

## You're All Set

Launch Zasper, select the `exampleUV` kernel, and run code in your new environment.
