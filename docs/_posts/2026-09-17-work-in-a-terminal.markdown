---
layout: docs
title:  "Work in a Terminal"
description: "Open a terminal inside Zasper, which shell it runs, and the two things to know: terminals are not restored, and are unavailable on Windows."
date:   2026-09-17 09:20:00 +0530
index: 13
group: Tutorials
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Not everything is a notebook. Installing a package, running the tests, checking what `git log` says —
those are a shell, and Zasper has one built in so you do not have to leave the window to use it.

{% include tut/sprite.html %}

## Open One

The terminal button is in the status bar, at the bottom of the window, next to the branch name. It is
there whatever tab is in front, because starting a shell is not something that belongs to the notebook
you happen to have open.

To start one somewhere other than the project root, right-click a folder in the file explorer and
choose **Open Terminal Here**. The shell starts in that folder.

{% include tut/terminal.html %}

A terminal opens in the **Terminals** panel under the editor, beside Problems and References, so the
notebook you are working on stays in view above it. **Toggle Terminal** in the command palette shows
and hides the panel. Open as many as you want, with the **+** in the panel's header; each one is its
own shell, and the list beside it says where each was started and switches between them. Close one
from its row in that list.

## Which Shell It Runs

Your own: Zasper starts whatever `$SHELL` names, as a login shell, so your prompt, aliases and `PATH`
are the ones you already have. If `$SHELL` is empty or names something that is not installed, it falls
back to the shell your account lists, and then to `/bin/sh`.

That is also why a conda or uv environment you activate in a terminal behaves exactly as it does
outside Zasper — [Working with Conda](/docs/working-with-conda) and [Working with
UV](/docs/working-with-uv) cover making those environments into kernels.

The text scales with the rest of the window: **Increase / Decrease Font Size** from the command
palette changes code, output and terminal text together.

## What A Terminal Is Not

**It does not come back.** Zasper reopens the tabs you had, but not terminals: a new connection is a
new shell, so a restored terminal would be an empty prompt wearing the name of the one you had.
Anything you want to keep, keep in a script.

**It is not available on Windows.** When the Zasper server runs on Windows there is no terminal
button and no **Open Terminal Here**, because the terminal backend is built on a Unix pseudo-terminal.
Running the server under WSL gives you both, and is the recommended way to use Zasper on Windows —
[Installation](/docs/installation) has the details.
