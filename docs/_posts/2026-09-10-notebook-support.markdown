---
layout: docs
title:  "Notebook Support"
description: "How Zasper reads and writes .ipynb files: saving leaves no unwanted diff, which outputs render, and the limitations worth knowing."
date:   2026-09-10 09:00:00 +0530
index: 8
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Zasper implements Jupyter's wire protocol and reads and writes the `.ipynb` format directly, so
notebooks move between Zasper and JupyterLab unchanged. It makes two guarantees:

- **Saving creates no unwanted diff.** When Zasper opens and saves a notebook, the file comes out
  byte-for-byte as Jupyter would have written it, so saving does not create merge conflicts.
- **A notebook keeps its own nbformat version.** A 4.2 notebook is saved as 4.2 rather than
  silently upgraded to the newest version, which is what JupyterLab does. Notebooks in formats 2
  and 3 are converted to 4.5 when opened.

Saves are atomic: Zasper writes beside the file and then renames over it, so a crash or a full disk
cannot leave a half-written notebook.

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
- **Notebooks are not signed or trusted.** Zasper does not yet implement Jupyter's notebook trust
  system. Saved `text/html` output can contain scripts that run when the notebook is opened; that
  is how Plotly and Bokeh outputs draw themselves. Treat a notebook you did not write like any other
  downloaded file.
