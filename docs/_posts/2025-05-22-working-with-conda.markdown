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


### Create an environment

```
conda create --name torchEnv
```

### Activate the environment

```
conda activate torchEnv
```

### Install the necessary packages and ipykernel

```
conda install -c anaconda ipykernel
```

### Create `kernelspec` file and you are done! 🚀

```
python -m ipykernel install --user --name=torchEnv
```
