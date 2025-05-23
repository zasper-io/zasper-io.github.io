---
layout: docs
title:  "Installing Jupyter Kernels"
date:   2024-12-22 07:39:59 +0530
index: 2
categories: docs
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

# Jupyter Kernels Supported

* Python Kernels
* Conda environments
* R kernels [(iR)](https://github.com/IRkernel/IRkernel)
* Julia Kernels [(iJulia)](https://julialang.github.io/IJulia.jl/stable/)
* Ruby kernels [(iRuby)](https://github.com/SciRuby/iruby)
* Javascript kernels [(Deno)](https://docs.deno.com/runtime/reference/cli/jupyter/)
* Go Kernels ([GoNb](https://github.com/janpfeifer/gonb))
* Compatible with all Jupyter kernels
* Also works with UV. See the section on "Working with conda environments".

## Jupyter kernels

Please ensure you have jupyter kernels installed.

```
prasunanand@Prasuns-Laptop examples % jupyter kernelspec list
Available kernels:
  deno          /Users/prasunanand/Library/Jupyter/kernels/deno
  firstenv      /Users/prasunanand/Library/Jupyter/kernels/firstenv
  gonb          /Users/prasunanand/Library/Jupyter/kernels/gonb
  ir            /Users/prasunanand/Library/Jupyter/kernels/ir
  julia-1.11    /Users/prasunanand/Library/Jupyter/kernels/julia-1.11
  ruby3         /Users/prasunanand/Library/Jupyter/kernels/ruby3
  python3       /Users/prasunanand/Library/Python/3.9/share/jupyter/kernels/python3
```
The simplest way to install a Python 3 Jupyter kernel is

```
pip install ipykernel
```

or

```
pip install jupyter
```
