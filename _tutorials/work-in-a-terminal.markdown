---
layout: tutorial
title: "Work in a Terminal"
description: "Open a terminal inside Zasper, which shell it runs, and the two things to know: terminals are not restored, and are unavailable on Windows."
order: 3
track: zasper
cover: open-here
cover_width: 454
cover_height: 351
author: Prasun Anand
---

Zasper has a terminal built in, so you can install a package, run the tests or check `git log`
without leaving the window.

## Open One

The **Terminal** button is in the status bar, at the bottom of the window, after the branch name and the
problem counts. It is there whatever tab is in front. The first click starts a shell in the project root;
after that, it shows the shells you have.

{% include tut/shot.html name="status-terminal" width="478" height="97" alt="The left end of the status bar: the branch, main, then the problem counts, then a Terminal button, ringed and labelled Opens a terminal." caption="**Terminal**, in the status bar." %}

To start one somewhere other than the project root, right-click a folder in the file explorer and
choose **Open Terminal Here**. The shell starts in that folder.

{% include tut/shot.html name="open-here" width="454" height="351" alt="The right-click menu of the tutorials folder in the file explorer: Rename, Add file, Add Notebook, Add Folder, Upload, Open Terminal Here, Open as Root, Cut, Copy, Paste, Duplicate, Copy Path and Delete Folder. Open Terminal Here is ringed and labelled A shell in this folder." caption="A folder's right-click menu." %}

A terminal opens in the **Terminals** panel under the editor, beside Problems, References and
Variables, so the file you are working on stays in view above it.

{% include tut/shot.html name="terminal" width="922" height="252" alt="The Terminals tab of the panel under the editor, with a count of 2. The prompt reads tutorials %. git log --oneline shows one commit, Zasper tutorials, and ls lists the tutorial notebooks and helpers.py. The last prompt is ringed and labelled Started in tutorials." caption="A shell opened with **Open Terminal Here** on the tutorials folder." %}

**Toggle Terminal** shows and hides the panel. Its chord is `` ⌃` `` on macOS (Control, not Command)
and `` Ctrl+` `` elsewhere, and it is in the command palette too.

Open as many as you want with **New terminal**, the **+** in the panel's header. Each one is its own
shell, started in the project root. The list beside it names them **Terminal 1**, **Terminal 2** and
so on, and switches between them. Close one with the **×** on its row.

{% include tut/shot.html name="terminal-list" width="260" height="118" alt="The right-hand end of the Terminals panel: the + button, ringed and labelled Another shell, and below it a list of Terminal 1 and Terminal 2, each with a close button. Terminal 2 is selected." caption="**New terminal**, and the list of shells." %}

## Which Shell It Runs

Zasper starts whatever `$SHELL` names, as a login shell, so your prompt, aliases and `PATH`
are the ones you already have. If `$SHELL` is empty or names something that is not installed, it falls
back to the shell your account lists, and then to `/bin/sh`.

That is also why a conda or uv environment you activate in a terminal behaves exactly as it does
outside Zasper. [Working with Conda](/docs/working-with-conda) and [Working with
UV](/docs/working-with-uv) cover making those environments into kernels.

The text scales with the rest of the window: **Zoom In** and **Zoom Out** (`⌘+` / `⌘-` on macOS,
`Ctrl` with the same keys elsewhere) scale code, output and terminal text together.

## What A Terminal Is Not

**It does not come back.** Zasper reopens the tabs you had, but not terminals, because a new
connection starts a new shell with nothing of the old one in it.
Anything you want to keep, keep in a script.

**It is not available on Windows.** When the Zasper server runs on Windows there is no terminal
button and no **Open Terminal Here**, because the terminal backend is built on a Unix pseudo-terminal.
Running the server under WSL gives you both, and is the recommended way to use Zasper on Windows.
[Installation](/docs/installation) has the details.

**Next:** [Share a Notebook](/tutorials/share-a-notebook).
