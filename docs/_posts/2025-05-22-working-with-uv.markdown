---
layout: docs
title:  "Working with UV"
date:   2024-12-22 07:39:59 +0530
index: 3
categories: docs
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

UV is a super-fast Python package manager and virtual environment tool built in Rust. It’s a
drop-in replacement for `pip`, `venv`, and `virtualenv`, and it's ideal for lightweight,
reproducible Python environments — perfect for use with **Zasper**.

This guide shows how to create and configure a Python project using UV and register it as a
Jupyter kernel for use in **Zasper**.


### 🔧 Step 1: Create a new project

Start by initializing a new Python project with UV:

```
uv init exampleUV
cd exampleUV
uv run main.py   # This command creates a `.venv` directory automatically
```

The .venv directory is your virtual environment — an isolated space where you can install dependencies without affecting your global Python installation.

### 🧪 Step 2: Activate the virtual environment

To use the environment in your terminal session:

```
source .venv/bin/activate
```
This activates the environment so that any Python or pip commands you run will use the local .venv.


### 📦 Step 3: Install packages

Install the ipykernel package, which allows the environment to be used as a kernel in Jupyter-based tools like Zasper:

```
uv pip install ipykernel
```

You can also install any additional libraries you need for your project at this stage.

### 🧠 Step 4: Register the kernel

Finally, make the environment available to Jupyter (and Zasper) by registering it as a named kernel:

```
uv run python -m ipykernel install --user --name=exampleUV
```

This creates a new kernel spec named exampleUV. You’ll now see it listed as an option in the Zasper kernel selector.


## ✅ You're all set!

You can now launch Zasper, select the exampleUV kernel, and run code in your new environment. 🎉
