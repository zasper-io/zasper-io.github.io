---
layout: docs
title:  "Notebook Support"
description: "How Zasper reads, runs and writes .ipynb files: cells, runs that outlive the tab, changes made on disk, which outputs render, and its limitations."
date:   2026-09-10 09:00:00 +0530
index: 8
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Zasper implements Jupyter's wire protocol and reads and writes the `.ipynb` format directly, so
notebooks move between Zasper and JupyterLab unchanged.

When Zasper opens and saves a notebook, the file comes out byte-for-byte as Jupyter would have
written it, so saving creates no unwanted diff and no merge conflicts. A notebook also keeps its own
nbformat version. A 4.2 notebook is saved as 4.2, where JupyterLab would silently upgrade it to the
newest version. Notebooks in formats 2 and 3 are converted to 4.5 when opened.

Saves are atomic: Zasper writes beside the file and then renames over it, so a crash or a full disk
cannot leave a half-written notebook.

When a kernel starts, the `language_info` it reports about itself replaces the one in the file, as
Jupyter does, so a notebook records the language version it last ran with.

## Cells

The rail between cells adds a **Code**, **SQL**, **Markdown** or **Raw** cell. Each cell's box is
labelled with its kind. A SQL cell is a code cell underneath; see [SQL Cells](/docs/sql-cells).

A code cell's run button and execution count sit side by side in its gutter. While the cell runs,
the button becomes a stop button; a cell waiting behind another shows `[*]`. The cell's run time,
on its border, counts up while it runs and stays shown after. It is saved in the cell's `metadata.execution`, as
JupyterLab's Record timing writes it, so a notebook opened later still says how long each cell took.
**Settings → Notebook → Keep cell times in the file** turns the saving off; the times are still shown.

Shift-Enter runs a cell and moves to the next, and the next cell stays in view while the output above
it grows.

In a cell, Tab completes from the kernel; **Settings → Notebook → Insert a tab in a cell** makes it
indent instead. **Settings → Notebook → Show the table of contents** puts every notebook's headings
in a column beside its cells; the toolbar's button turns it on for one notebook.

## Runs That Outlive the Tab

A cell's run belongs to the server, not to the browser tab that started it. Start a long cell, close
the tab, and come back: every line it printed is there. (On a laptop running Zasper itself, sleep
pauses the run too.)

- A tab that loses its connection mid-run reconnects by itself, is given what it missed, and follows
  the rest of the run live.
- A run that finishes while no tab has the notebook open has its outputs written into the `.ipynb`,
  so the file is complete the next time anything reads it.
- A run started somewhere else, in a second tab or by a [coding agent](/docs/coding-agents), shows in
  its cell in every open tab, with its output streaming in.
- An `input()` asked while no tab is open waits, and the next tab to open the notebook answers it.

A run keeps at most 8 MB of output, oldest first out, and a single stream keeps its last 1 MB, since
the end of a long log is what gets read.

## When the File Changes on Disk

A notebook can change under an open tab: `git pull`, a script, an agent, or another editor. Zasper
takes the change in cell by cell rather than reloading the whole notebook.

- A cell you have not changed takes the new version in place.
- The cell holding your cursor waits until you leave it, with **Update now** to take it at once.
- A cell changed both on disk and in the tab is not overwritten. A band over the notebook says how
  many cells changed on both sides, and each one offers **Compare**, **Keep mine** and **Take
  theirs**, or **Delete it** when the file no longer has the cell.

When the change came through Zasper, the band names who made it, such as an agent.

A save never writes over a change it has not seen. If the file changed since the tab last read it,
the save is refused, the band says the notebook was not saved, and the cells that differ ask as
above.

## When a Kernel Dies

A kernel that exits on its own, while starting or later, is reported in the notebook with the reason,
such as its exit code, and the last lines it printed, which usually hold the error that killed it.
Start it again from there or pick another kernel. A cell whose kernel died before answering keeps no
execution count. See [Installing Jupyter Kernels](/docs/installing-jupyter-kernels#troubleshooting).

## What Renders

| Output | Status |
|---|:---:|
| `text/plain`, stdout/stderr, tracebacks | ✅ |
| `text/html` | ✅ |
| `image/png` | ✅ |
| `image/jpeg` | ✅ |
| `image/svg+xml` | ✅ |
| `text/latex` | ✅ |
| Plotly figures (`application/vnd.plotly.v1+json`) | ✅ |
| ipywidgets (`application/vnd.jupyter.widget-view+json`) | ✅ |
| `application/json` | ✅ |
| Markdown cells: GFM tables, task lists, raw HTML, LaTeX via KaTeX | ✅ |

`text/latex`, which SymPy produces after `init_printing()` and IPython's `Latex` and `Math` display,
is typeset with KaTeX, the same renderer markdown cells use. `image/svg+xml`, which graphviz and
networkx produce, and matplotlib under `%config InlineBackend.figure_format = 'svg'`, is placed
directly in the page rather than inside an `<img>`, so a figure that sizes itself to the cell still
can. SVG, JPEG and LaTeX output render from 1.1.0.

## Known Limitations

- **Widget state is not saved in the notebook.** Closing and reopening a tab is fine: the kernel
  keeps running, and the widgets redraw from it. But the state lives only in the kernel, so once the
  kernel is gone, for example after the server restarts or when the file is opened somewhere else,
  such as on GitHub, a widget shows a placeholder until you run its cell again. JupyterLab can save
  widget state into the file so it renders without a kernel; Zasper does not do this yet.
- **Saved interactive output needs its cell run again.** HTML output saved in a notebook is
  sanitised when the notebook opens, so its scripts do not run: they would run as you, and Zasper
  does not implement Jupyter's notebook signing to tell a trusted file from any other. Output from
  cells you run in this session is not affected. A Plotly or Bokeh plot saved in the file draws
  itself again once you re-run its cell.
- **Widgets from outside ipywidgets load their code from the internet.** A widget library such as
  bqplot or ipyleaflet gets its code from cdn.jsdelivr.net. With **Settings → Privacy → Load widget
  libraries from the internet** turned off, those widgets are not shown.
