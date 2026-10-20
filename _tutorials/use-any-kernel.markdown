---
layout: tutorial
title: "Use R, Julia or Any Kernel"
description: "Find your kernels in the Launcher, register a uv environment as a new one, move a notebook to another kernel, and run the same penguins in R and in Julia."
order: 11
track: zasper
cover: r-plot
cover_width: 1506
cover_height: 831
author: Prasun Anand
---

Zasper runs any Jupyter kernel. In this tutorial you find the kernels you have, register a uv
environment as a new one, move a notebook to another kernel, and run the same penguins in R and in
Julia.

The notebooks are `live-talk/06-r.ipynb` and `live-talk/05-julia.ipynb` from
[zasper-tutorials](https://github.com/zasper-io/zasper-tutorials). Its README sets up their kernels:
**R (zasper-tutorials)**, with dplyr and ggplot2, and IJulia for Julia. This page assumes Zasper is
[installed](/docs/installation) and open on that folder. With only R or only Julia, skip the other's
chapter.

## Find Your Kernels In The Launcher

The Launcher is the tab Zasper opens on. Under **Notebook** it has a tile for each kernel it finds.
Your project's own environment comes first, under **This project**, if it has one. Python kernels
come next, under **Python**. A language with several kernels gets a group of its own. The rest share
**Other languages**.

Zasper finds a kernel by its kernelspec, the folder with a `kernel.json` that each kernel's installer
writes. It looks in the same places Jupyter does. It also lists two kinds of kernel that have no
kernelspec: your project's own `.venv`, and the Pythons it finds that have `ipykernel` installed.
[Installing Jupyter Kernels](/docs/installing-jupyter-kernels) lists every place it looks. Run
`jupyter kernelspec list` to see what is registered on your machine.

Click a tile to start a new notebook on that kernel.

{% include tut/shot.html name="launcher" width="883" height="316" alt="The Launcher's Notebook section. Under Python, one tile: Python (zasper-tutorials). Under Other languages, tiles for Deno, Go (gonb), Julia 1.13, Ruby 3.4.3 and R (zasper-tutorials). The R tile is ringed and labelled Click a tile to start a notebook on it." caption="One machine's kernels: one Python, and five other languages." %}

## Register A uv Environment

A uv project becomes a kernel in three commands: make the project, add `ipykernel` to it, and register
it. Run them in a terminal, in Zasper's own or any other:

```sh
uv init demo && cd demo
uv add ipykernel
uv run python -m ipykernel install --user --name=demo
```

The last command prints `Installed kernelspec demo in` and the folder it wrote. The kernel is called
**demo**. To show a different name in the Launcher, add `--display-name "Python (demo)"`.

Run them outside any other uv project. Inside one, `uv init` adds `demo` to that project's workspace
instead of making a project of its own.

Zasper reads the list of kernels when it loads. Reload the page, and **demo** has a tile under
**Python**.

{% include tut/shot.html name="launcher-demo" width="883" height="156" alt="The top of the Launcher's Notebook section after a reload. Under Python, two tiles: demo, ringed, and Python (zasper-tutorials)." caption="The new kernel's tile shows its name, **demo**." %}

It also appears in every notebook's kernel picker. A conda environment works the same
way: install `ipykernel` into it and register it. See [Working with Conda](/docs/working-with-conda).

## Switch A Notebook's Kernel

Every notebook runs on one kernel. Its name, with a status dot, is at the right-hand end of the
notebook's toolbar. The dot is green while the kernel is idle.

{% include tut/shot.html name="kernel-name" width="468" height="318" alt="The right-hand end of a notebook's toolbar: a pill reading Python (zasper-tutorials) with a green dot, ringed and labelled The notebook's kernel. Its tooltip reads Change Kernel." caption="The kernel's name is also the button that changes it." %}

Click the name. A dialog called **Switch Kernel** opens. It says which kernel the notebook is on now,
under **Current Kernel**. Pick another from the **Kernel** list and press **Switch Kernel**.

{% include tut/shot.html name="switch-kernel" width="828" height="278" alt="The Switch Kernel dialog. Current Kernel: Python (zasper-tutorials). The Kernel list is set to R (zasper-tutorials) and ringed, labelled Pick a kernel. The Switch Kernel button below it is ringed too." caption="The list holds the same kernels as the Launcher." %}

Zasper stops the old kernel and starts the new one. The name in the toolbar changes to the new kernel.
Your code and outputs stay, but the variables were in the old kernel, so run the cells again. `Escape`
closes the dialog and leaves the kernel as it was. **Change Kernel** in the command palette opens the
same dialog.

The notebook remembers its kernel. Saving writes the kernel's name into the `.ipynb` file, and opening
the file again starts that kernel. If a notebook names a kernel you don't have, as one from another
machine might, Zasper asks which kernel to use instead.

## Run The Penguins In R

Open `live-talk/06-r.ipynb`. It is saved on **R (zasper-tutorials)**, so that kernel starts by itself.
Run its cells from the top:

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Run Cell and Select Next | `⇧⏎` | `Shift+Enter` |
| Run Cell | `⌃⏎` | `Ctrl+Enter` |

The second code cell loads dplyr and ggplot2 and reads `../data/penguins.csv`. The third groups the
penguins by species with dplyr and prints the averages as a table. The fourth draws flipper length
against body mass with ggplot2, one colour and one fitted line per species.

{% include tut/shot.html name="r-plot" width="1506" height="831" alt="An R cell of ggplot2 code and its output below it: a scatter chart of body mass in grams against flipper length in millimetres, with points and a straight fitted line for each species, Adelie in red, Chinstrap in green and Gentoo in blue." caption="ggplot2's chart, drawn by the R kernel, shown as an ordinary output." %}

Nothing here is special to R. The cells, the outputs, the toolbar and the keys are the same as in a
Python notebook. The kernel does the work and sends back what to show.

## Run Them Again In Julia

Open `live-talk/05-julia.ipynb`. It is saved on **Julia 1.13**. Your Julia may be another version;
if Zasper asks for a kernel, pick yours. Run the cell under **Fast loops, no vectorising needed**. It
estimates pi from 100 million random points, in a plain loop, and times it with Julia's `@time`.

{% include tut/shot.html name="julia-time" width="1506" height="334" alt="A Julia cell defining estimate_pi with a for loop, then calling estimate_pi(10) and @time estimate_pi(100_000_000). Its output is ringed: the run time on the first line, about 0.14 seconds, and the estimate under it, 3.14157664." caption="`@time` prints the run time first. The estimate comes after it." %}

The time comes first because it is printed as the call runs. The estimate is the cell's value. Your
time and your estimate will differ a little; the points are random. Further down, the notebook reads
the same `penguins.csv` and draws the average body mass by species as an SVG bar chart.

The same goes for Deno, Go and Ruby. If a language has a Jupyter kernel, install it as its project
says, and it gets a tile in the Launcher. [Installing Jupyter Kernels](/docs/installing-jupyter-kernels)
has the commands for each one.

## Recap

- Every kernel you register is in the Launcher
- A uv environment is three commands
- Switch kernels from the notebook toolbar
- R, Julia, or anything that speaks Jupyter

**Next:** [Installing Jupyter Kernels](/docs/installing-jupyter-kernels) has every kernel's install
command and the full list of places Zasper looks. For more on the penguins, in Python this time, try
[Explore a DataFrame and Chart It](/tutorials/explore-a-dataframe).
