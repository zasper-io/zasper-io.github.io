---
layout: docs
title:  "Search and Replace"
description: "Search every file and notebook in the project, preview a replacement before it is written, and find and replace inside one notebook."
date:   2026-09-22 09:10:00 +0530
index: 9.2
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

**Search in Files** looks through the whole project, notebooks included, and can replace what it
finds. Inside one notebook, **Find and Replace** does the same for that notebook alone.

## Search the Project

Open the search view from the magnifying glass in the sidebar, or run **Search in Files** from the
command palette. Results appear as you type, grouped by file, with the line each match is on.

Three buttons beside the search box change what a match is:

- **Aa**, Match case.
- **ab**, Whole word.
- **.\***, Regular expression.

A pattern is matched one line at a time, as the editor's own find is, so no match spans a line break.

**Files to include** and **Files to exclude** narrow the search with comma-separated patterns, such
as `*.py, src/`.

## What Is Searched

The search leaves out what the file explorer leaves out: anything your `.gitignore` files ignore, and
the `.git`, `node_modules`, `__pycache__`, `.ipynb_checkpoints` and `.venv` folders wherever they
are. Files larger than 10 MB are skipped.

A notebook is searched as you see it, a cell at a time, not as the JSON it is stored as. Both the
cells and what they printed are searched.

A file you have open with unsaved changes is searched as it is in the editor, so the results match
what is in front of you.

The results show the first 2,000 matches, and say so when there were more; narrow the pattern or the
files to see the rest.

If [ripgrep](https://github.com/BurntSushi/ripgrep) is installed, Zasper uses it to find the lines,
which is faster on a large project. The answers are the same without it.

## Replace

Type the replacement in the **Replace** box. With **Regular expression** on, the replacement can use
the pattern's groups: `$1` to `$9` for a group, and `$&` for the whole match.

Before anything is written:

- Pressing a match in a file opens a preview of that file as it is and as the replacement would
  leave it. A match in a notebook opens the notebook itself.
- **Leave this out** on a match, or **Leave this file out** on a file, drops it from the replacement.

**Replace in this file** replaces one file's matches, and **Replace** replaces everything that is
left. A file you have open is changed in its editor, where you can undo the change like any other
edit, and is saved as you normally save. Every other file is written straight to disk. If a file
cannot be written, it is listed and the rest are still replaced.

What a notebook's cells printed is searched but never replaced: an output is what the code produced,
and running the cell again is how it changes.

## Find in a Notebook

**Find and Replace** in a notebook's command palette searches that notebook's cells and their
outputs, with the same three options. It replaces in the cells only; the find card says when a
match is in an output and cannot be replaced.
