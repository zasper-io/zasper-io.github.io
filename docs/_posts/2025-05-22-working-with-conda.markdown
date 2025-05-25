---
layout: docs
title:  "Working with Conda"
date:   2024-12-22 07:39:59 +0530
index: 2
categories: docs
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

If you're using Conda, setting up an environment for Zasper is simple and robust.
Conda is especially useful for data science projects, where binary packages like PyTorch, TensorFlow,
or NumPy need to be installed efficiently.

Follow the steps below to create a new environment and register it as a Jupyter kernel.


### 🧱 Step 1: Create a new environment

```
conda create --name torchEnv
```

This creates an isolated environment named torchEnv. You can also specify a Python version if needed:

```
conda create --name torchEnv python=3.11
```

### 🔄 Step 2: Activate the environment

```
conda activate torchEnv
```
After activation, any packages you install or code you run will use this environment.


### 📦 Step 3: Install required packages

Install the ipykernel package, which is needed to register the environment as a Jupyter kernel:

```
conda install -c anaconda ipykernel
```

You can also install any additional dependencies here (like numpy, torch, or pandas).


### 🧠 Step 4: Register the kernel

Once ipykernel is installed, run the following to make the environment available in Jupyter and Zasper:

```
python -m ipykernel install --user --name=torchEnv
```

This registers torchEnv as a selectable kernel — perfect for experimenting inside Zasper.

## ✅ You're all set!

Your torchEnv Conda environment is now ready to use as a kernel in Zasper.
Just launch the app, select the environment from the kernel picker, and you're good to go. 🚀
