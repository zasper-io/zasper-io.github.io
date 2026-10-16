---
layout: docs
title:  "Working with Conda"
description: "Make a conda environment into a kernel Zasper can run, so binary packages like PyTorch, TensorFlow and NumPy install cleanly."
date:   2024-12-22 07:39:59 +0530
index: 3
group: Environments
categories: docs
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

Conda installs binary packages such as PyTorch, TensorFlow and NumPy with their compiled libraries,
which is why many data science projects use it. To run notebooks in a conda environment, you create
the environment, install `ipykernel` into it and register it as a Jupyter kernel.

## Create a New Environment

```bash
conda create --name torchEnv
```

This creates an isolated environment named `torchEnv`. To pin a Python version, name it when you
create the environment:

```bash
conda create --name torchEnv python=3.11
```

## Activate the Environment

```bash
conda activate torchEnv
```

From now on, packages you install and code you run in this shell use `torchEnv`.

## Install Required Packages

The `ipykernel` package is what lets the environment run as a Jupyter kernel:

```bash
conda install -c conda-forge ipykernel
```

You can install the other libraries your project needs here too, such as `numpy`, `torch` or
`pandas`.

## Register the Kernel

With `ipykernel` installed, register the environment so Jupyter and Zasper can offer it:

```bash
python -m ipykernel install --user --name=torchEnv
```

`torchEnv` now appears in Zasper's kernel picker, and you can choose it for a notebook from there.

Registering is what makes the environment available wherever you open Zasper. Without it, Zasper
still finds a conda environment that has `ipykernel` when you start Zasper from a shell with that
environment activated, and your base Anaconda, Miniconda or Miniforge install when its Python has
`ipykernel`. Those appear in the Launcher as **Python 3.x (torchEnv)** or **Python 3.x
(miniconda3)** without a kernelspec. See [Installing Jupyter
Kernels](/docs/installing-jupyter-kernels#how-zasper-finds-kernels).

A kernel installed inside an environment, such as `conda install -c conda-forge r-irkernel`, is
found without registering it with `--user` and without activating the environment, because Zasper
reads every environment conda knows about. It runs with that environment's own `R` or other command.
