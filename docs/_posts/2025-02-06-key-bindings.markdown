---
layout: docs
title:  "Key Bindings"
description: "Every key binding in Zasper for macOS, Windows and Linux: the window, tabs, the notebook, and the keys a cell's editor keeps for itself."
date:   2025-02-05 07:39:59 +0530
index: 7
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Every action here is also in the command palette (`⇧⌘P` / `Ctrl+Shift+P`), which shows each
command's key binding beside it. The **Help** tab (`F1`) lists every shortcut in one place, with a
filter. If you forget a shortcut, either one is the place to look.

Where a row gives two macOS bindings, both work. `⌘` is the usual editor convention; `⌃` is what
Zasper used first, and it still works.

## Global

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Search Files and Commands | `⌘K` | `Ctrl+K` |
| Show All Commands | `⇧⌘P` or `⌃⇧P` | `Ctrl+Shift+P` |
| Go to File | `⇧⌘O` or `⌃⇧O` | `Ctrl+Shift+O` |
| Toggle Sidebar | `⌘B` | `Ctrl+B` |
| Search in Files | `⇧⌘F` | `Ctrl+Shift+F` |
| Problems | `⇧⌘M` | `Ctrl+Shift+M` |
| Toggle Terminal | ``⌃` `` | ``Ctrl+` `` |
| Keyboard Shortcuts (Help tab) | `F1` | `F1` |
| Focus Next Region | `F6` | `F6` |
| Focus Previous Region | `⇧F6` | `Shift+F6` |
| Zoom In | `⌘=` or `⌘+` | `Ctrl+=` or `Ctrl++` |
| Zoom Out | `⌘-` | `Ctrl+-` |
| Reset Zoom | `⌘0` | `Ctrl+0` |

**Focus Next / Previous Region** moves between the parts of the window: the editor, the panel under
it, the agent panel, the activity bar and the sidebar. It is the way out of a terminal or a code
editor, which keep `Tab` for themselves, and each part gets back the place the focus last had in it.
[Accessibility](/docs/accessibility) has the rest of what works from the keyboard.

Zoom scales the whole window, including toolbars and menus. To change only the size of code,
terminal text and cell output, use **Increase / Decrease Font Size** from the palette. Those have
no key binding.

On Windows and Linux, a shell uses some of these keys itself: `Ctrl+B` moves the cursor back one
character and `Ctrl+K` deletes to the end of the line. While a terminal has focus, shortcuts on those
keys go to the shell rather than to Zasper. Click outside the terminal, or use the search box and the
sidebar button in the top bar. **Search in Files** and **Problems** also do nothing from a focused
terminal on Windows and Linux. **Toggle Terminal** uses `⌃` on macOS too, and works with a terminal
focused.

On Windows and Linux, **Problems** and **Change Cell to Markdown** share `Ctrl+Shift+M`. While a
notebook is the active tab, the chord changes the cell to Markdown and does not open Problems; use
the palette there.

## Tabs

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Close | `⌥W` | `Alt+W` |
| Close Others | `⌥⇧O` | `Alt+Shift+O` |
| Close to the Right | `⌥⇧R` | `Alt+Shift+R` |
| Close to the Left | `⌥⇧L` | `Alt+Shift+L` |
| Close Saved | `⌥⇧S` | `Alt+Shift+S` |
| Close All | `⌥⇧W` | `Alt+Shift+W` |
| Reopen Closed Tab | `⌥⇧T` | `Alt+Shift+T` |

Right-click a tab for the same actions, plus **Copy Path** and **Reveal in File Explorer**. When the
tabs you close have unsaved changes, Zasper asks about all of them in one dialog.

With the focus on the tab strip, `←` and `→` move along it, `Home` and `End` go to its ends, `Enter`
or `Space` brings the focused tab forward, and `Delete` closes it.

## Notebook

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
| Find and Replace | `⌘F` | `Ctrl+F` |
| Format Cell | `⌥⇧F` | `Alt+Shift+F` |

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
Paste Cell**, **Change Cell to Raw**, **Change Cell to SQL**, **Clear Cell Output**, **Clear All Outputs**, **Interrupt Kernel**, **Restart Kernel**, **Restart Kernel and
Run All Cells**, **Reconnect to Kernel**, **Change Kernel**, and **Add Cell to Chat** and **Add
Output to Chat** for the [agent panel](/docs/coding-agents). The notebook toolbar and a cell's hover
toolbar reach most of them in one click.

**Variables** opens the [variables panel](/docs/exploring-data#the-variables-panel), and **What's
New** the release notes; neither has a binding.

## Command Mode

When a cell is selected and its editor does not have focus, the notebook is in command mode. These
keys work only then:

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Select Previous Cell | `↑` | `Up` |
| Select Next Cell | `↓` | `Down` |
| Edit Cell | `⏎` | `Enter` |
| Expand or Collapse Output | `⇧O` | `Shift+O` |

**Edit Cell** opens the selected cell for editing. **Expand or Collapse Output** is JupyterLab's
binding, and is in the palette too. **Run Cell** and **Run Cell and Select Next** work
in command mode as well.

## Inside a Cell

These keys belong to the editor rather than to a command, because what they do depends on where
the cursor is.

| Key | What it does |
| --- | --- |
| `Tab` | Accepts the highlighted completion; with a word to the left of the cursor, asks the kernel for completions; otherwise indents |
| `↑` on the first line, `↓` on the last | Moves to the cell above or below |
| Double-click, or `Enter` on a selected markdown cell | Opens its source for editing |
| `Escape` | Leaves the editor and keeps the cell selected; a markdown cell renders again, as it does when you run it |

A single click on a rendered markdown cell only selects it; it stays rendered.

## File Editor

These work in a file's editor. Go to Definition, Find All References, Rename Symbol, Quick Fix and
Format Document need a [language server](/docs/language-servers) for the file's language.

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Save | `⌘S` | `Ctrl+S` |
| Find | `⌘F` | `Ctrl+F` |
| Find Next / Previous | `⌘G` / `⇧⌘G`, or `F3` / `⇧F3` | `Ctrl+G` / `Ctrl+Shift+G`, or `F3` / `Shift+F3` |
| Select Next Occurrence | `⌘D` | `Ctrl+D` |
| Toggle Comment | `⌘/` | `Ctrl+/` |
| Fold All | `⌃⌥[` | `Ctrl+Alt+[` |
| Unfold All | `⌃⌥]` | `Ctrl+Alt+]` |
| Go to Definition | `F12` | `F12` |
| Find All References | `⇧F12` | `Shift+F12` |
| Rename Symbol | `F2` | `F2` |
| Quick Fix | `⌘.` | `Ctrl+.` |
| Format Document | `⌥⇧F` | `Alt+Shift+F` |
