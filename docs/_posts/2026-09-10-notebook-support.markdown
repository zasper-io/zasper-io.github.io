---
layout: docs
title:  "Notebook Support"
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
| Plotly figures (`application/vnd.plotly.v1+json`) | ✅ |
| ipywidgets (`application/vnd.jupyter.widget-view+json`) | ✅ |
| `application/json` | ✅ |
| Markdown cells: GFM tables, task lists, raw HTML, LaTeX via KaTeX | ✅ |
| `image/svg+xml` | Not yet |
| `text/latex` | Not yet |
| `image/jpeg` | Not yet |

The three missing types are worth knowing about before you run into them:

- `text/latex` is what SymPy produces after `init_printing()`.
- `image/svg+xml` is what graphviz and networkx produce, and what matplotlib produces under
  `%config InlineBackend.figure_format = 'svg'`.
- `image/jpeg` covers `display()` of a JPEG.

Cells that produce these still run correctly; only the display is missing. These are the first
things planned after 1.0.

## Known Limitations

- **Widget state is not saved in the notebook.** If you reopen a notebook without a running kernel,
  widgets show a placeholder instead of their last state. Run the cell again to draw them.
- **A cell's output area ignores `clear_output`.**
- **Notebooks are not signed or trusted.** Zasper does not yet implement Jupyter's notebook trust
  system. Saved `text/html` output can contain scripts that run when the notebook is opened; that
  is how Plotly and Bokeh outputs draw themselves. Treat a notebook you did not write like any other
  downloaded file, and open one you don't trust in [protected mode](/docs/deploying-on-cloud).
