---
layout: docs
title:  "Key Bindings"
date:   2025-02-05 07:39:59 +0530
index: 7
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Every action here is also in the command palette (`⇧⌘P` / `Ctrl+Shift+P`), which shows each
command's key binding beside it. If you forget a shortcut, the palette is the place to look.

Where a row gives two macOS bindings, both work. `⌘` is the usual editor convention; `⌃` is what
Zasper used first, and it still works.

### Global

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Show All Commands | `⇧⌘P` or `⌃⇧P` | `Ctrl+Shift+P` |
| Go to File | `⇧⌘O` or `⌃⇧O` | `Ctrl+Shift+O` |
| Zoom In | `⌘=` or `⌘+` | `Ctrl+=` or `Ctrl++` |
| Zoom Out | `⌘-` | `Ctrl+-` |
| Reset Zoom | `⌘0` | `Ctrl+0` |

Zoom scales the whole window, including toolbars and menus. To change only the size of code,
terminal text and cell output, use **Increase / Decrease Font Size** from the palette. Those have
no key binding.

### Notebook

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Save Notebook | `⌘S` or `⌃S` | `Ctrl+S` |
| Run Cell | `⌃⏎` | `Ctrl+Enter` |
| Run Cell and Select Next | `⇧⏎` | `Shift+Enter` |
| Insert Cell Above | `⌃⇧A` | `Ctrl+Shift+A` |
| Insert Cell Below | `⌃⇧B` | `Ctrl+Shift+B` |
| Move Cell Up | `⌃⇧↑` | `Ctrl+Shift+Up` |
| Move Cell Down | `⌃⇧↓` | `Ctrl+Shift+Down` |
| Delete Cell | `⌃⇧D` | `Ctrl+Shift+D` |
| Undo Cell Operation | `⇧⌘Z` | `Ctrl+Shift+Z` |
| Change Cell to Code | `⌃⇧Y` | `Ctrl+Shift+Y` |
| Change Cell to Markdown | `⌃⇧M` | `Ctrl+Shift+M` |

Cell operations use `⌃⇧` rather than a bare `⌃` on purpose. `⌃A`, `⌃B`, `⌃E` and `⌃K` are the
system text-editing bindings on macOS, and `Ctrl+A` is select-all everywhere else, so a bare
binding would be caught before the cell's editor received it.

**Undo Cell Operation** is the notebook's own history. It undoes an inserted, deleted, cut, pasted
or retyped cell, and a cleared output. `⌘Z` inside a cell still undoes the text you typed there.

**Move Cell Up / Down** reorders the notebook. It is not the same as **Select Next / Previous
Cell**, which only moves the selection. A cell's hover toolbar has both: the chevrons move the
selection and the arrows move the cell. Focus moves with the cell, so you can hold the binding to
move one cell several places.

These actions have no key binding; run them from the palette: **Run All Cells**, **Cut / Copy /
Paste Cell**, **Select Next / Previous Cell**, **Change Cell to Raw**, **Expand or Collapse
Output**, **Clear Cell Output**, **Clear All Outputs**, **Interrupt Kernel**, **Restart Kernel**,
**Restart Kernel and Run All Cells**, **Reconnect to Kernel** and **Change Kernel**. The notebook
toolbar and a cell's hover toolbar reach most of them in one click.

### Inside a Cell

These keys belong to the editor rather than to a command, because what they do depends on where
the cursor is.

| Key | What it does |
| --- | --- |
| `Tab` | Accepts the highlighted completion; with a word to the left of the cursor, asks the kernel for completions; otherwise indents |
| `↑` on the first line, `↓` on the last | Moves to the cell above or below |
| Double-click, or `Enter` on a selected markdown cell | Opens its source for editing |
| `Escape`, or running the cell, in a markdown cell | Renders it again |

A single click on a rendered markdown cell only selects it; it stays rendered.
