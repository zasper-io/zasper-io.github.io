---
layout: docs
title:  "Comparing Notebooks"
description: "Read what changed in a notebook under git cell by cell: edited, added, removed and moved cells, their outputs and their metadata."
date:   2026-10-14 09:00:00 +0530
index: 9.5
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

A notebook is JSON, and a line diff of JSON is hard to read. Zasper compares a changed `.ipynb` as
cells instead: each cell that changed is a card with its source, its outputs and its metadata.

## Opening a Diff

Press a notebook's row in the source control panel, under **Changes**, **Staged** or a commit in
**History**. The diff opens in a tab, and its header names the two sides: **Index** and **Working
tree** for a row under Changes, **HEAD** and **Index** for one under Staged, and the commit against
its parent for one in History. [Track Changes with Git](/tutorials/track-changes-with-git) covers the
panel itself.

## Reading It

The line at the top counts the cells that changed, by what happened to them: edited, added, removed
or moved. It also says in how many cells the outputs and the metadata changed.

Each changed cell is a card, its left edge in the colour of the change. The head gives the cell's
position on each side, such as `4 → 5`, with `·` for the side a cell is missing from: `· → 7` is an
added cell and `6 → ·` a removed one. It also gives the cell's type and what changed.

- **Source** is one column of lines with both sides' line numbers. Inside a changed line, the whole
  words that changed are marked, such as `mean` against `median`.
- **Outputs** are open under the source. Text output, such as a stream, an error or a plain-text
  result, is shown as a line diff. Anything else, such as a plot or a table, is rendered on both
  sides, side by side.
- **Metadata** is one line naming the keys that changed, and opens to a line diff of them.

Runs of unchanged cells fold into one line, such as *3 unchanged cells*, which opens to show them.
When the notebook's own metadata changed, such as its kernel, it gets a card of its own at the top.

Two buttons in the tab's header open or close every output change and every metadata change at
once. The refresh button beside them reads the file again.

## How Cells Are Matched

A notebook written with nbformat 4.5 or later gives every cell an id, and a cell is matched to the
cell with the same id on the other side, wherever it went. An older notebook's cells are matched by
their source: identical cells first, then the most similar cell of the same type. A cell that kept
its content but changed its place is shown as moved, not as removed and added.

## What Is Not Counted

Running a notebook again rewrites parts of the file that are not your work. The diff leaves these
out:

- Execution counts, on cells and on results.
- Metadata a frontend writes for itself: `collapsed`, `scrolled`, `execution` and `ExecuteTime`.
- The id Zasper attaches to a DataFrame output, which is new every time the frame is shown.

A notebook that was only run again says *Only outputs changed*, and one with nothing changed says
*No changes*.

## When It Falls Back

A notebook that cannot be read as cells, such as one with a merge conflict left in its JSON, is shown
as a side-by-side text diff, as any other file is. A side larger than 2 MB is not shown. A conflicted
notebook can be compared but not merged in the diff.
