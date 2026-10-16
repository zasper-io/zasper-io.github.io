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

uv is a Python package manager written in Rust. It does the work of `pip`, `venv` and `virtualenv`,
and it records a project's exact dependencies in a lockfile, so the project's `.venv` can be built
again the same way on another machine. To run notebooks in that environment, you add `ipykernel` to
the project.

## Create a New Project

Start a new Python project with uv:

```bash
uv init exampleUV
cd exampleUV
uv run main.py   # creates a .venv directory automatically
```

The `.venv` directory is the project's virtual environment. Packages you install there stay out of
your global Python installation.

## Install Packages

Add `ipykernel`, the package that lets the environment run as a Jupyter kernel:

```bash
uv add --dev ipykernel
```

This records `ipykernel` as a development dependency in `pyproject.toml` and installs it into
`.venv`, so the next `uv sync` keeps it. uv commands find the project's `.venv` on their own, so
there is no environment to activate. Add any other libraries your project needs with `uv add`.

If you open the `exampleUV` folder in Zasper and trust it, the environment is already listed. A
project's own `.venv` with `ipykernel` in it appears first in the Launcher as **Python 3.x
(.venv)**, with no registration needed (see [Trusted Folders](/docs/trusted-folders)). Choose it to
run code in the new environment.

When Zasper finds no kernel at all, the Launcher offers **Set up a Python kernel**, which creates
the `.venv` and installs `ipykernel` for you, with `uv venv` and `uv pip install` when uv is
installed. It does not run `uv init` or record `ipykernel` in `pyproject.toml`, so in a uv project
run `uv add --dev ipykernel` afterwards, or the next `uv sync` removes it. See [Installing Jupyter
Kernels](/docs/installing-jupyter-kernels).

## Register the Kernel (Optional)

Register the environment only if you want to use it from other projects too, or from Jupyter itself:

```bash
uv run python -m ipykernel install --user --name=exampleUV
```

This creates a kernelspec named `exampleUV`, which Zasper's kernel picker offers wherever you open
Zasper.
