---
layout: docs
title:  "Language Servers"
description: "Errors as you type, completion, go to definition, rename and formatting in files and notebook cells, from a language server you already have installed."
date:   2026-09-22 09:00:00 +0530
index: 9.1
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Zasper uses the Language Server Protocol for what an editor cannot work out on its own: errors as you
type, completion with documentation, hover, go to definition, find references, rename, quick fixes,
symbols and formatting. Files and notebook cells both get them.

Zasper ships no language servers. It starts one you already have, and tells you when you have none.

## What You Need

| Language | Server | Install |
| --- | --- | --- |
| Python | basedpyright, pyright or pylsp | `pip install basedpyright` |
| Go | gopls | `go install golang.org/x/tools/gopls@latest` |
| TypeScript, JavaScript | typescript-language-server | `npm install -g typescript-language-server typescript` |
| Rust | rust-analyzer | `rustup component add rust-analyzer` |
| C, C++ | clangd | `brew install llvm`, or your package manager |
| R | languageserver | `R -e 'install.packages("languageserver")'` |
| Julia | LanguageServer.jl | `julia -e 'using Pkg; Pkg.add("LanguageServer")'` |

For Python, the first of the three that is found is used, in that order. basedpyright and pyright are
type checkers; pylsp is jedi with a set of plugins, so the type-checking setting below does not apply
to it.

Zasper looks on your `PATH` first, then in the project's `.venv/bin`, `venv/bin` and
`node_modules/.bin`, then in `$GOPATH/bin`, `~/go/bin`, `~/.cargo/bin`, `~/.local/bin`,
`~/.juliaup/bin` and Homebrew. An app started from the Dock has a thinner `PATH` than your shell,
and without that list `gopls` in `~/go/bin` would look uninstalled.

## The Status Bar

The item at the right of the status bar names the server for the file or notebook in front, with a
dot for its state: starting, ready, failed or stopped. Its menu restarts the server, shows what it
wrote to standard error (**Show log**), stops it and, for Python, names the interpreter the server
reads imports with. When nothing is installed it says *No server*, and the menu gives the command
that installs one.

The counts beside it are the problems in the project. Pressing them opens the **Problems** panel
under the editor.

## Problems

An error or a warning is a squiggle under the code, a mark in the gutter, a row in the Problems panel
and a number in the status bar. In a notebook, the row names the cell, such as
`analysis.ipynb cell 3, 2:5`. Pressing a row opens the file, or the cell, with the cursor on the
problem.

Some things a server reports are not faults: an unused import, a branch that can never run. Those are
drawn as faded text, with no squiggle and nothing in the gutter, as other editors draw them. They are
listed in the Problems panel but not counted in the status bar.

## Settings

Under **Settings → Language servers**:

- **Use language servers**: off starts nothing at all.
- **Type checking**, for basedpyright and pyright: `off` (the default), `basic`, `standard` or
  `strict`. A change applies at once, without a restart.
- **A command per language**, for when Zasper finds the wrong server or none. Write the command as
  you would type it in a shell, such as `ruff server`.

A project's own configuration wins over the Type checking setting: a `pyrightconfig.json`, or
`[tool.pyright]` or `[tool.basedpyright]` in `pyproject.toml`, is read by the server itself.

### Which Type-Checking Mode

`off` still reports the mistakes worth stopping for: undefined names, imports that cannot be found,
and a module whose type stubs are missing. That is the same set Pylance keeps with its defaults.

The stricter modes also report correct code that uses libraries without type information. The
checker reads the library's source, infers a type it cannot narrow, and faults an attribute that is
there when the code runs. scikit-learn is the common example: under `standard`,
`load_iris(as_frame=True).frame` is reported although it works. Choose `basic` or `standard` for code
you maintain and have types for, and silence a single line with `# type: ignore[attr-defined]`.

## In a Notebook

A notebook's cells are given to the server as one document, so a name defined in one cell is known
in the next.

**IPython's own syntax is hidden from the server.** Line magics, `!` shell escapes and `obj?` are
replaced before the server sees them, line for line, so the server never reports them as errors and
every line keeps its number. `%%time` and its relatives hide only their first line; `%%bash` and other
cell magics hide the whole cell.

**Imports resolve against the kernel's Python.** The server is told which interpreter the notebook's
kernel runs, so a notebook on a conda or uv environment resolves its imports with no configuration. A
plain `.py` file has no kernel, so it is read with **Settings → Python interpreter**. Left on
Automatic, that is the project's `.venv` or `venv`, or the `python` on your `PATH` when there is
neither. The same interpreter runs the file with **Run Python File in Terminal**.

**Completion comes from both the server and the kernel.** The kernel knows what `df` is right now,
because it ran the cell that made it; the server knows the source, including cells that have not run.
While you type, suggestions come from the server alone. After a `.`, on Tab and on Ctrl-Space, both
are asked and merged, and each suggestion is tagged `kernel` or `source`. The kernel is kept out of
typing on purpose: it answers one request at a time, so asking it on every keystroke would queue
behind a running cell.

**Shift+Tab** shows the kernel's documentation for the name at the cursor, as Jupyter does.

## Formatting

**Format Document** formats a file, and **Format Cell** and **Format Notebook** format a notebook;
all three are in the command palette. Settings can also format a file whenever it is saved. A
notebook is formatted a cell at a time, so an edit never reaches across cells, and IPython's lines
are put back untouched.

basedpyright and pyright do not format, and Zasper says so when you ask. To format Python, set a
server that does under Settings → Language servers, such as `ruff server`.

## Not There Yet

- **One server per language per window.** Two notebooks on different environments share a server,
  which uses the interpreter of the notebook that attached last.
- **Rename, go to definition and signature help from a notebook cell.** They work in files.
- **Semantic highlighting, call hierarchy and code lens.**

## When Something Looks Wrong

- **`Import "pandas" could not be resolved`**: the server is reading a different Python than your
  kernel. The status bar item's menu names the interpreter it uses. *No interpreter* means the
  notebook has no kernel attached yet.
- **Squiggles under correct library calls**: see [Which Type-Checking
  Mode](#which-type-checking-mode). A library without type information is the usual cause.
- **Faded code with no squiggle**: an unused import or a branch that never runs. Nothing is wrong
  with the line.
- **The server keeps failing**: **Show log** in its menu has what it wrote to standard error.
- **Nothing at all**: check that **Use language servers** is on, and that a server for the language
  is installed.
