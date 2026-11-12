---
layout: docs
title:  "Accessibility"
description: "Use Zasper from the keyboard alone or with a screen reader: moving between the window's parts, menus and dialogs, cells and outputs, the terminal, and forced colours."
date:   2026-11-12 09:00:00 +0530
index: 7.5
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Since 2.2.0, everything in Zasper can be reached from the keyboard, and a screen reader is told what
each part of the window is, what a cell holds and when a run ends. This page covers what works and
how. [Key Bindings](/docs/key-bindings) lists every shortcut.

## Moving Around the Window

`F6` moves the focus to the next part of the window and `Shift+F6` to the previous one, in this order:
the editor, the panel under it, the agent panel, the activity bar and the sidebar. Parts that are
hidden are skipped, and each part gets back the place the focus last had in it, so `F6` into the
terminal and back lands in the same cell.

`F6` is the way out of a terminal or a code editor, which keep `Tab` for themselves: the terminal
sends it to the shell, and an editor indents with it.

The parts are landmarks, so a screen reader's landmark keys jump between them too. The window's title
names the file in front.

## Menus, Dialogs and Lists

- **Menus** take the focus when they open. `↑` and `↓` move through them, `Home` and `End` go to the
  first and last item, and typing a letter goes to the next item that starts with it. `Escape` or
  `Tab` closes the menu and gives the focus back to what opened it.
- **A file tree row's menu** opens with `Shift+F10` or the menu key, as a right-click would.
- **Dialogs** keep the focus inside them while open, so `Tab` does not wander into the window behind,
  and give it back to what opened them when they close. Window shortcuts do nothing while a dialog is
  open.
- **The command palette** is a combobox: a screen reader hears each option, its group and how many
  results the search found.
- **The tab strip** is a tab list. `←` and `→` move along it, `Home` and `End` go to its ends,
  `Enter` or `Space` brings the focused tab forward, and `Delete` closes it.
- **Toolbars** are a single `Tab` stop; the arrow keys move between their buttons.
- `Escape` closes one thing at a time: the tooltip, the menu or the dialog on top, never two at once.

## Notebooks

- **Each cell is named** by its position, its type and its run, such as "Cell 3, code, run 5", and
  its editor as "Source of cell 3". A screen reader hears when a cell finishes or fails, and when the
  kernel starts, restarts, dies or comes back.
- **Only the focused cell's controls** are in the `Tab` order, so `Tab` does not walk through every
  cell's toolbar. One `Escape` leaves a cell's editor.
- **A long output** is a `Tab` stop while it scrolls: the arrow keys and `Page Down` move through it.
  `Shift+O` in command mode expands or collapses a cell's output.
- **An image output** is described by its `text/plain`, such as matplotlib's `<Figure size …>`.
- **`input()`'s reply box** is labelled with its prompt, and `getpass()` is masked.
- **A data grid** is a `Tab` stop. Arriving by keyboard selects its first cell, the arrow keys move
  the selection, and `⌘C` / `Ctrl+C` copies it. A column's edge can be focused, and `←` and `→`
  resize the column.

Saves, an agent's replies and a setting that failed to save are announced as well.

## The Terminal

**Settings → Terminal → Screen reader mode** puts what a terminal prints where a screen reader reads
it. It is off by default, as in VS Code, because it keeps a hidden copy of the terminal's rows. It
applies to terminals already open as well.

## Seeing the Focus

There is one focus ring, the same everywhere, and it meets WCAG's 3:1 contrast for non-text on every
surface it lands on, in every theme. Text, the edges of fields and git's colours meet WCAG AA contrast
in every theme, with a few exceptions still being worked on, such as accent-coloured text in the dark
themes and some terminal colours in the light orange theme. Links in prose are underlined.

Under **forced colours**, such as Windows' contrast themes, the selection, a control's state and
dialogs stay visible: Zasper's accent colour becomes the system's highlight colour.

## Reporting a Problem

If something cannot be reached from the keyboard, or a screen reader misses or misreads something,
please [open an issue](https://github.com/zasper-io/zasper/issues) saying which screen reader and
browser you use.
