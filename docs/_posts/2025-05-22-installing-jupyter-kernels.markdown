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

Zasper is built on top of the [Jupyter wire protocol](https://jupyter-client.readthedocs.io/en/latest/messaging.html), and is fully compatible with any language that provides a Jupyter kernel.

Whether you're working in Python, R, Julia, Go, or even JavaScript — if the kernel supports kernelspec, Zasper will detect and support it out of the box.



### ✅ Supported Kernels

| Language       | Kernel Name / Package                                               | Notes / Install Links                                          |
| -------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Python**     | `ipykernel`                                                         | Install via `pip install ipykernel`                            |
| **Conda**      | `ipykernel` in env                                                  | Works with `conda create` + `ipykernel`                        |
| **R**          | [IRkernel](https://github.com/IRkernel/IRkernel)                    | Add with `IRkernel::installspec()` in R console                |
| **Julia**      | [IJulia](https://julialang.github.io/IJulia.jl/stable/)             | Add via Julia REPL: `using Pkg; Pkg.add("IJulia")`             |
| **Ruby**       | [IRuby](https://github.com/SciRuby/iruby)                           | Requires Ruby setup and manual install                         |
| **JavaScript** | [Deno Kernel](https://docs.deno.com/runtime/reference/cli/jupyter/) | Install via `deno install --unstable -A -n jupyter_deno ...`   |
| **Go**         | [GoNb](https://github.com/janpfeifer/gonb)                          | Run `gonb install` after installing Go and Gonb                |
| **UV**         | Compatible via `uv + ipykernel`                                     | See [Working with UV](#working-with-uv) section for full guide |


###### 💡 Zasper auto-discovers all installed kernels using Jupyter's standard kernelspec system.


### 🔍 Viewing Installed Kernels

To check which kernels are available on your system, run:

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

⚡ Installing a Python Kernel

If you're just getting started and want a basic Python kernel:


```
pip install ipykernel
```

or

```
pip install jupyter
```


### 🌐 Setting Up Other Language Kernels

Here’s how to get started with a few popular non-Python kernels:

#### R (IRkernel)

Open R and run:

```
install.packages('IRkernel')
IRkernel::installspec(user = TRUE)
```
You’ll see an ir kernel appear in Zasper.

#### Julia (IJulia)

Open the Julia REPL and run:

```
using Pkg
Pkg.add("IJulia")
```

The IJulia package will automatically register the kernel.

#### Go (GoNb)
Install Go and GoNb:

```
go install github.com/janpfeifer/gonb@latest
gonb install
```

The Go kernel will be available in jupyter kernelspec list.

####  JavaScript (Deno)

Follow the official instructions:

[https://docs.deno.com/runtime/reference/cli/jupyter/](https://docs.deno.com/runtime/reference/cli/jupyter/)

Example:

```
deno install --unstable -A -n jupyter_deno https://deno.land/x/jupyter/cli.ts
```

After install, the Deno kernel will be available for use in Zasper.

### 🔧 Troubleshooting

If a kernel doesn’t appear in Zasper, check `jupyter kernelspec list` to confirm it's registered.

Make sure you’ve installed `ipykernel` or the required language-specific runtime.

Restart **Zasper** if you installed a new kernel while it's running.
