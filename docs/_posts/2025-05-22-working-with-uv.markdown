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


### Create a project.

```
uv init exampleUV
cd exampleUV
uv run main.py    # This creates a .venv directory
```

### Activate the environment.

```
source .venv/bin/activate
```

### Install the necessary packages and ipykernel

```
uv pip install ipykernel
```

### Create `kernelspec` file and you are done! 🚀

```
uv run python -m ipykernel install --user --name=exampleUV
```
