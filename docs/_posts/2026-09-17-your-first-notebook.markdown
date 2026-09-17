---
layout: docs
title:  "Your First Notebook"
description: "A first notebook in Zasper, step by step: make it, put it on a kernel, run a cell, read the output, write Markdown and save it."
date:   2026-09-17 09:00:00 +0530
index: 11
group: Tutorials
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Make a notebook, put it on a kernel, run something, write down what it was for, and save it. It
assumes only that Zasper is [installed](/docs/installation) and open on a folder you can write to.

{% include tut/sprite.html %}

## Make The Notebook

The file explorer is the first icon in the rail on the left, and the strip under its title names the
folder Zasper was started in. The three buttons at the right-hand end of that strip make a file, a
folder and a notebook. Press the notebook one.

The notebook arrives as `Untitled.ipynb` with its name already selected in the tree. Type a name over
it, keep the `.ipynb` on the end, and press `Enter`; `Escape` keeps the name it came with. To put it
somewhere other than the top of the project, right-click a folder in the tree and choose **Add
Notebook** instead.

{% include tut/file-explorer.html %}

## Pick A Kernel

A notebook made this way does not name a kernel yet, so the first thing it asks is which one to run
on. The list is every kernel installed on this machine — whatever `jupyter kernelspec list` prints.
If the environment you meant is not in it, install `ipykernel` into that environment and open the
notebook again. [Installing Jupyter Kernels](/docs/installing-jupyter-kernels) and [Working with
Conda](/docs/working-with-conda) cover how they are found.

{% include tut/kernel-dialog.html %}

Once the kernel has started, its name and a status dot sit at the right-hand end of the notebook's
toolbar: the dot is grey while the kernel is idle and lit while it is working. Click the name to move
the notebook to a different kernel later.

{% include tut/toolbar.html %}

## Run A Cell

Click into the empty cell and type. Two chords run it, and the difference is where you end up:

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Run Cell and Select Next | `⇧⏎` | `Shift+Enter` |
| Run Cell | `⌃⏎` | `Ctrl+Enter` |

On the last cell of the notebook, `⇧⏎` adds a new one to carry on in.

The number in the left margin is the cell's turn with the kernel. `[ ]` has never run, `[*]` is
queued or running now, and `[7]` was the seventh thing this kernel was asked to do — not the seventh
cell in the file. Restart the kernel and the count starts again from one.

{% include tut/run.html %}

## Read What Comes Back

Anything the cell printed, returned or drew appears under it, in the order it happened: a line of
text, a table, a figure. A cell that ends in an expression shows that expression's value, which is
why `readings.head()` on a line of its own is enough. [Notebook Support](/docs/notebook-support)
lists what Zasper renders and what it does not.

An error arrives in the same place rather than in a dialog. The kernel keeps everything it had — the
variables from the cells that worked are still there — so the usual fix is to correct the line and
run it again.

{% include tut/output.html %}

Output that runs to hundreds of lines is capped at a height you can scroll inside. **Expand or
Collapse Output**, **Clear Cell Output** and **Clear All Outputs** have no key binding; run them from
the command palette (`⇧⌘P` / `Ctrl+Shift+P`), or from the toolbar over a cell.

A cell that will not finish is stopped with **Interrupt**, the square in the notebook toolbar. There
is no binding for that either: interrupting is not something you do in the middle of typing.
**Restart** beside it throws away the variables and starts the kernel again, which is the answer when
interrupting does not take.

## Say What It Was For

A notebook that is only code is a script with gaps in it. Change a cell to **Markdown** — the picker
in the toolbar, or `⌃⇧M` / `Ctrl+Shift+M` — write in it, and run it with `⇧⏎` to render it. `⌃⇧Y` /
`Ctrl+Shift+Y` turns a cell back into code, and double-clicking rendered prose opens its source
again.

{% include tut/markdown.html %}

Headings written this way are what **Table of Contents** lists in the column beside the cells, so a
notebook with a few `##` lines in it becomes something you can jump around in rather than scroll.

## Save It

`⌘S`, or `Ctrl+S`, or the first button in the toolbar. Until you do, a dot sits beside the name in
the tab.

{% include tut/tabs.html %}

What gets written is the cells, the output they produced, and the name of the kernel they ran on.
That last part is why opening the notebook tomorrow does not ask the question in step two again: it
already knows the answer, and only asks when the kernel it names is not installed here.

Tabs, including this one, are remembered between sessions — [Files and Tabs](/docs/files-and-tabs)
covers what reopens and what does not. Every chord Zasper listens for, including the ones this page
skipped, is on [Key Bindings](/docs/key-bindings), and the **Help** tab (`F1`) lists them inside the
app with a filter.
