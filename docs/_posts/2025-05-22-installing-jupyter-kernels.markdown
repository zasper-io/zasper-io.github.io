---
layout: docs
title:  "Installing Jupyter Kernels"
description: "Zasper runs any Jupyter kernel. How to install kernels for Python, R, Julia, Go and JavaScript, and where Zasper looks for the ones you have."
date:   2024-12-22 07:39:59 +0530
index: 2
group: Environments
categories: docs
permalink: docs/:title
author: Prasun Anand
banner: /static/images/logo.svg
---

Zasper is built on the [Jupyter wire protocol](https://jupyter-client.readthedocs.io/en/latest/messaging.html)
and is compatible with any language that provides a Jupyter kernel.

Whether you're working in Python, R, Julia, Go, or JavaScript — if the kernel supports kernelspec,
Zasper detects and supports it out of the box.

### No Kernel Yet? Let Zasper Set One Up

If Zasper finds no kernel at all, the Launcher says so and offers **Set up a Python kernel**. Click
it and Zasper:

1. creates a `.venv` folder in your project, with [uv](https://docs.astral.sh/uv/) if you have it and
   `python3 -m venv` if you don't;
2. installs `ipykernel` into that `.venv`;
3. lists it in the Launcher as **Python 3.x (.venv)**.

The setup's output appears in the Launcher as it runs, and the new kernel shows up when it finishes.

Nothing else is touched. Zasper never installs anything on its own when it starts, never installs
into your system or Homebrew Python, and never writes a kernelspec — a virtual environment is the one
place `pip` is always allowed. If your project already has a `.venv` with `ipykernel` in it, the
setup just checks it; if it has a `.venv` folder with no Python inside, the setup stops and asks you
to remove it rather than replace it.

The setup needs a network connection to download `ipykernel`, and a Python 3 to build the
environment from. If uv finds no Python, it downloads one into its own folder.

### Supported Kernels

| Language       | Kernel Name / Package                                               | Notes / Install Links                                            |
| -------------- | --------------------------------------------------------------------| ------------------------------------------------------------------ |
| Python         | `ipykernel`                                                         | Install via `pip install ipykernel`, or use **Set up a Python kernel** |
| Conda          | `ipykernel` in env                                                  | Works with `conda create` + `ipykernel`                          |
| R              | [IRkernel](https://github.com/IRkernel/IRkernel)                    | Add with `IRkernel::installspec()` in the R console               |
| Julia          | [IJulia](https://julialang.github.io/IJulia.jl/stable/)             | Add via the Julia REPL: `using Pkg; Pkg.add("IJulia")`            |
| Ruby           | [IRuby](https://github.com/SciRuby/iruby)                           | Requires Ruby setup and manual install                           |
| JavaScript     | [Deno Kernel](https://docs.deno.com/runtime/reference/cli/jupyter/) | Install via `deno install --unstable -A -n jupyter_deno ...`     |
| Go             | [GoNb](https://github.com/janpfeifer/gonb)                          | Run `gonb install` after installing Go and GoNb                  |
| UV             | Compatible via `uv` + `ipykernel`                                   | See [Working with UV](/docs/working-with-uv) for the full guide  |

### How Zasper Finds Kernels

Zasper lists three kinds of kernel, and the Launcher shows all of them.

**Registered kernels.** Anything with a kernelspec — a folder holding a `kernel.json`, which is what
`python -m ipykernel install`, `IRkernel::installspec()` and the others create. Zasper looks in the
same places Jupyter does, in the same order:

- if `jupyter` is on your `PATH`, the folders `jupyter --paths` lists, first;
- the folders in `JUPYTER_PATH`;
- your own Jupyter folder: `~/Library/Jupyter` on macOS, `~/.local/share/jupyter` on Linux,
  `%APPDATA%\jupyter` on Windows (or `JUPYTER_DATA_DIR` if you set it);
- the active conda environment or virtualenv, when Zasper is started from a shell with one
  activated — before your own folder inside a virtualenv or a non-base conda environment, as Jupyter
  does, and `JUPYTER_PREFER_ENV_PATH` decides either way;
- the system: `/usr/local/share/jupyter` and `/usr/share/jupyter`, or `%PROGRAMDATA%\jupyter`;
- on Windows, the Microsoft Store's Python, whose own folder is read-only, so `pip install ipykernel`
  puts the kernel under that Python's `LocalCache` folder instead (from 1.1.0);
- Anaconda, Miniconda and Miniforge in your home folder, and on macOS, Homebrew and every Python's
  own folder — each version under `~/Library/Python`, the Command Line Tools' Python and the
  python.org installers.

When two folders hold a kernel of the same name, the first one wins, as it does in Jupyter. Names are
matched without regard to case.

**Pythons with `ipykernel` that were never registered.** If a Python on your `PATH`, your active
environment, a conda install or (on macOS) a Homebrew, Command Line Tools or python.org Python has
`ipykernel` installed but no kernelspec, Zasper offers it anyway — the way Jupyter offers its own
Python. The first is named `python3` when no kernel of that name is installed; the rest are named for
their version and origin, such as `python3.12-homebrew`, and shown as **Python 3.12 (Homebrew)**.
Nothing is written to disk for these, so there is nothing to go stale when an environment is deleted.
Installing `ipykernel` into one of them later is noticed without restarting Zasper.

**Your project's own environment.** If the folder Zasper is open on has a `.venv` or `venv` with
`ipykernel` in it, it is listed first, as **Python 3.x (.venv)**. Its kernel name is `project-venv` in
every project, so a notebook saved on it opens on a collaborator's own `.venv` when they clone the
same repository. It runs as if the environment were activated, so `!pip install` in a notebook
installs into it. Zasper finds it by reading the folder and does not run anything inside it until you
choose it.

A kernelspec that names a bare `python` — which is what ipykernel's own spec does — runs with the
Python that installed it, not whichever `python` comes first on your `PATH`. Installing another
Python, such as Homebrew's, does not take your existing kernels away or run them with the wrong
interpreter.

### Viewing Installed Kernels

To check which kernels are registered on your system, run:

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

This shows registered kernels only. The Launcher also lists unregistered Pythons with `ipykernel`
and your project's `.venv`, which this command does not know about.

### Installing a Python Kernel

If you're just getting started and want a basic Python kernel, use **Set up a Python kernel** in
the Launcher, or install `ipykernel` yourself:

```bash
pip install ipykernel
```

or

```bash
pip install jupyter
```

### Setting Up Other Language Kernels

Here's how to get started with a few popular non-Python kernels.

#### R (IRkernel)

Open R and run:

```r
install.packages('IRkernel')
IRkernel::installspec(user = TRUE)
```

You'll see an `ir` kernel appear in Zasper.

#### Julia (IJulia)

Open the Julia REPL and run:

```julia
using Pkg
Pkg.add("IJulia")
```

The IJulia package automatically registers the kernel.

#### Go (GoNb)

Install Go and GoNb:

```bash
go install github.com/janpfeifer/gonb@latest
gonb install
```

The Go kernel will be available in `jupyter kernelspec list`.

#### JavaScript (Deno)

Follow the [official instructions](https://docs.deno.com/runtime/reference/cli/jupyter/):

```bash
deno install --unstable -A -n jupyter_deno https://deno.land/x/jupyter/cli.ts
```

After installing, the Deno kernel will be available for use in Zasper.

### Troubleshooting

If a kernel doesn't appear in Zasper, check `jupyter kernelspec list` to confirm it's registered,
and make sure you've installed `ipykernel` or the required language-specific runtime.

Zasper reads the kernel list again whenever the Launcher asks for it, so reloading the page picks up
a kernel installed while it was running; **Check again** does the same when the Launcher says there
are no kernels. Restart Zasper if you have installed a new version of Python since it started.

A kernelspec whose `kernel.json` cannot be read, or names no program to run, is left out of the list,
and Zasper logs a `skipping kernelspec` warning saying why.

If **Set up a Python kernel** fails, its output stays in the Launcher. The usual causes are no network
connection, no Python 3 to build the environment from, or a `.venv` folder that is already there with
no Python in it.
