---
layout: docs
title:  "Share a Notebook"
description: "Export a Zasper notebook as an HTML page, as Markdown or as a script: what each one keeps, and what the HTML export asks first."
date:   2026-09-17 09:30:00 +0530
index: 14
group: Tutorials
categories: docs
permalink: docs/:title
author: Prasun Anand
---

A `.ipynb` file is for someone who has Jupyter. For everyone else — a colleague who wants to read the
result, a reviewer who wants the code, a repository that wants a plain script — Zasper writes the
notebook out in three other shapes.

{% include tut/sprite.html %}

## The Export Menu

The button is at the end of the notebook's toolbar, past the kernel and separated from it: everything
to its left does something to the notebook, and this one takes a copy of it away.

{% include tut/export-menu.html %}

It exports **what is on the screen**, not what is on disk. Unsaved edits and the output the kernel
produced a moment ago are in the file you get, which is usually what you want and worth knowing when
it is not. Nothing is sent anywhere: the conversion happens in the browser and the file lands in your
downloads.

## HTML Page

A page anyone can open, with the code highlighted and the output under it, styled in Zasper's own
light theme so it reads the same on any machine. This is the row to pick when the reader should not
have to install anything.

It is the one format that asks a question first. **Export as HTML** offers two checkboxes:

- **Include code** — off gives a report: prose and results, no source.
- **Include outputs** — off gives the notebook as a blank worksheet, code and no results.

Both off writes nothing worth having, so the dialog will not let you. One thing to know before you
send the page: a figure in it is a picture. Interactive plots stop being interactive and widgets stop
existing altogether, because both need a kernel and a page has none.

## Markdown

The notebook as a document: markdown cells as themselves, code cells as fenced blocks tagged with the
kernel's language, output underneath. This is the shape that drops into a README, a wiki or a pull
request, and the one to pick when the text matters more than the run.

## Script

The code alone, in the kernel's language, with the markdown cells kept as comments so the reasoning
survives. The extension comes from the kernel the notebook ran on rather than from a guess — a Python
notebook gives you `.py`, a Deno one `.ts`.

Use it when a notebook has turned into something that should be a module, or when a reviewer wants to
read the logic without the JSON around it.

## What Stays Behind

Every export is a copy: the notebook itself is untouched, and none of the three can be opened back up
as a notebook. To keep working on it, keep the `.ipynb` — the exports are for the people who are not
going to run it.

[Notebook Support](/docs/notebook-support) lists what renders in a notebook and therefore what can
appear in an export, and [Track Changes with Git](/docs/track-changes-with-git) covers keeping the
notebook itself reviewable.
