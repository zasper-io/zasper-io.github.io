---
layout: docs
title:  "Files and Tabs"
date:   2026-09-14 09:00:00 +0530
index: 9
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Everything you open in Zasper, whether a notebook, a file, a terminal, a diff or the Help page, opens
in a tab. This page covers how each kind of file opens, how tabs behave, and what Zasper remembers
between visits.

## How Files Open

| File | Opens in |
| --- | --- |
| `.ipynb` | The notebook editor; see [Notebook Support](/docs/notebook-support) |
| `.md`, `.markdown` | The code editor, with **Edit**, **Preview** and **Side by side** views |
| `.pdf` | Your browser's own PDF viewer, with a **Download** button |
| `.png` | The image viewer |
| Anything else | The code editor |

### Markdown

A Markdown file opens in **Edit**. The buttons in the strip under the file's path switch it to:

- **Preview**, which renders the file the way a markdown cell is rendered, with GitHub Flavored
  Markdown tables and task lists, and LaTeX through KaTeX;
- **Side by side**, which shows the source and the preview together. The preview scrolls along with
  the source, and catches up between keystrokes so typing stays responsive in a long file.

Switching to Preview and back keeps the editor's undo history.

### PDF

A PDF is shown with the viewer built into your browser, so zoom, search and page navigation work
as they do for any PDF there. **Download** saves a copy. A browser without a built-in PDF viewer
still offers the download.

## Tabs

The **Launcher** is always the first tab and has no close button. When you close the tab in front,
the Launcher comes forward; closing a tab behind it leaves the one in front where it is.

A dot on a tab means it has unsaved changes. Closing it asks whether to save, discard or cancel, and
closing several tabs at once asks about all their unsaved changes in one dialog.

Right-click a tab to close it, the others, those to its left or right, the saved ones, or all of
them, or to **Copy Path** and **Reveal in File Explorer**. The close actions have shortcuts too; see
[Key Bindings](/docs/key-bindings#tabs).

**Toggle Sidebar** (`⌘B` / `Ctrl+B`, or the button in the top bar) hides the file explorer and the
other side panels to give the tabs the whole window. Dragging the sidebar narrower than its minimum
also hides it, and choosing a panel brings it back.

## Tabs Are Remembered

Zasper remembers which tabs you had open in each project and reopens them when you come back, even
after closing the browser. A remembered tab reads its file only when you first switch to it, so a
long list of tabs doesn't slow down opening Zasper. A notebook reconnects to its kernel if that
kernel is still running.

Some things are deliberately not brought back:

- **Terminals.** Every terminal connection starts a new shell, so a restored terminal would be empty.
- **Unsaved edits.** A restored tab shows the file as it is on disk.

The list is stored in your browser, separately for each project folder, so opening a different
project doesn't bring back tabs from this one. If two browser windows are open on the same project,
the one that last opened, closed or switched a tab is the one Zasper remembers.

## The Help Tab

Press `F1`, or choose **Keyboard Shortcuts** from the command palette, to open the **Help** tab. It
lists every command that has a shortcut, grouped by category, with a box to filter them. Its
**About** section shows Zasper's version and platform, which is what a bug report needs, and **Copy
details** copies them. It doesn't include your username or any folder names, so it's safe to paste
into an issue.
