---
layout: docs
title:  "Trusted Folders"
description: "Decide which folders may run their own code, so opening a project you downloaded runs nothing until you say so."
date:   2026-10-14 09:00:00 +0530
index: 9.6
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Opening a folder someone else wrote should not run their code until you say so. A notebook's kernel
can be the folder's own `.venv/bin/python`, a language server can come from its `node_modules`, and a
repository's `.git/config` can name hooks and filters that git runs. Any of these would run as soon
as the folder opened.

So Zasper asks once per folder whether you trust the authors of its files. Until you do, the folder
is **restricted**: you can read every file, notebook and saved output in it, and nothing the folder
controls runs.

## Restricted and Trusted

| | Restricted | Trusted |
| --- | --- | --- |
| Files, notebooks, saved outputs, search, diffs, git status | ✓ | ✓ |
| A notebook's kernel | not started; Run asks | starts when the notebook opens |
| The folder's own `.venv` | not listed as a kernel or used to run a file | ✓ |
| Run Python File, Set up a Python kernel | asks | ✓ |
| SQL cells' connections | asks | ✓ |
| Starting a coding agent | asks | ✓ |
| Language servers | only basedpyright, pyright and clangd, found outside the folder | every server |
| Git stage, commit, discard, checkout, branch delete, fetch, pull, push | asks | ✓ |
| Terminals | ✓ | ✓ |

basedpyright, pyright and clangd read code without running it, so they keep working in a restricted
folder. Zasper looks for them outside the folder, never in its `.venv` or `node_modules`. Terminals
stay open because a command you type into one is already your decision.

A kernel that is already running keeps running if its folder becomes restricted, since stopping it
would lose what it holds. Nothing new starts.

## Being Asked

The first time a window opens an untrusted folder, before anything in it has run, Zasper asks **Do
you trust the authors of the files in this folder?** and names the folder. The choices are **Trust
folder** and **Stay restricted**. The **Trust everything in** checkbox trusts the folder that holds
this one instead, for when you clone repositories into one place you trust. **Stay restricted**,
Escape and the close button never trust, and the question is not asked again in that browser tab.

While a folder is restricted, three places say so, and each one asks again:

- **Restricted** with a shield, as the first item in the status bar.
- A band over every notebook, with **Trust folder…**.
- The notebook's kernel pill.

Pressing Run or Run all in a restricted notebook asks **Trust this folder to run its code?** Its
**Trust and run** button trusts the folder, starts the kernel and runs the cell in one step.

Every folder is asked about, including the one `zasper` was started in. Starting Zasper in a folder
means you meant to open it, not that you trust it.

## Where Trust Is Kept

Trust is stored on the server, in `~/.zasper/config.json`, because the server is what starts
processes:

```json
{
  "trusted_folders": [
    { "path": "/home/me/src", "since": "2026-10-07T09:00:00Z" }
  ],
  "trust_all": false
}
```

Trusting a folder trusts everything under it. Paths are compared with symlinks resolved, so `/tmp/x`
and `/private/tmp/x` are the same folder.

**Settings → Trust** lists the trusted folders. **Remove** stops trusting one, and the project is
restricted again at once if that folder covered it.

## Skipping the Question

| | Applies to | Saved |
| --- | --- | --- |
| `zasper --trust` | the folder this run serves | no |
| **Settings → Trust every folder**, or `trust_all` in config | every folder | yes |
| `ZASPER_TRUST_ALL=1` in the environment | every folder | no |

`--trust` is for scripts and servers that open a folder you already know. **Trust every folder** is
for a server that only opens your own files. The Docker image sets `ZASPER_TRUST_ALL=1`, because the
folder a container serves belongs to its user; while it is set, Settings shows every folder as trusted
and cannot turn that off.

## Enforced by the Server

The prompt is only the UI's side. The server itself refuses to start a kernel, run a file, start an
agent or change a git repository in a restricted folder, and answers `403` with
`{"error": "untrusted"}`. A script that talks to the API directly meets the same rule.

## Modules Beside a Notebook

This applies to trusted folders too. A Python kernel starts with the notebook's folder off
`sys.path`, so a file such as `pathlib.py` or `json.py` beside the notebook is not imported, and run,
while the kernel starts up. Once the kernel is running the folder is back on `sys.path`, and a cell
can still `import` a module that sits beside the notebook.
