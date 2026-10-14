---
layout: docs
title:  "Exploring Data"
description: "Page, sort, filter and chart a DataFrame in a cell's output or a tab, list what a kernel holds, and see how much memory each kernel uses."
date:   2026-10-14 09:00:00 +0530
index: 9.4
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Zasper reads tables out of the running kernel rather than out of the HTML a library printed. A
DataFrame a cell displays becomes a grid that pages, sorts, filters and charts in place, any table in
the kernel opens in a tab, and the **Variables** panel lists what the kernel holds. The work is done
in the kernel, so a million-row frame is never sent to the browser to be sorted.

This works with Python kernels only. Any other kernel's notebook says that variables can only be read
from a Python kernel.

## The Variables Panel

The panel is the **Variables** tab of the dock under the editor, beside **Problems** and the
terminals. The **Variables** command in the command palette opens it too. It lists the names in the
kernel of the notebook in front, each with its type, its shape or length, and a short summary: a
DataFrame's first column names, an array's dtype, or the value itself, cut short. Names starting
with `_`, modules, functions and classes are left out.

The list is read again after every run, and the refresh button reads it on demand. While a cell is
running the kernel cannot answer, and the panel says it is busy until the cell finishes.

A table-like variable has a table icon; pressing it opens the variable in a tab. These open as tables:

| Type | Needs |
| --- | --- |
| pandas `DataFrame` and `Series` | pandas |
| polars `DataFrame` | pandas, which it is read through |
| NumPy array of one or two dimensions | pandas |

## DataFrames in Cell Output

A pandas `DataFrame` or `Series`, or a polars `DataFrame`, that a cell displays is drawn as a grid of
10 rows a page, or 25, or 100. Each column's header shows its type, a small chart of its
distribution and its share of missing values. Hovering the chart shows the numbers behind it: the
range, mean and standard deviation of a number column, the commonest values of a text column, and
how many rows are missing.

The grid needs the kernel that printed the frame. After a restart, or when a notebook is opened cold,
the output is pandas' own table again, with a line under it saying so; run the cell again to get
the grid back. The kernel holds the last 50 frames it displayed. The saved notebook keeps pandas'
table, so it reads the same in JupyterLab and on GitHub.

## The Grid

The same grid is used in a cell's output and in a tab. A tab scrolls through the whole frame instead
of paging, and reads rows as they come into view. It is read again after each run of its notebook.
**Open in a tab** on a cell's grid opens it as `Out[n]`, with the filters, sort and columns it had.

| To | Do |
| --- | --- |
| Sort | **Sort ascending** or **Sort descending** in the column's menu |
| Filter | **Filter rows** in the grid's bar, or **Filter this column…** in the column's menu |
| See a column's statistics | **Summary** in the column's menu: rows, missing, distinct, min, max, mean, standard deviation, or the commonest values |
| Hide a column | **Hide column** in its menu; **Show N hidden** brings them back |
| Move a column | **Move left** or **Move right** in its menu, or drag its header onto another |
| Resize a column | Drag the right edge of its header |
| Copy a value | Click the cell and press Mod-C; the arrow keys move the selection |

A copied value is the one the kernel sent, not the rounded one on screen.

A filter compares a column with a value. Number and date columns offer `=`, `≠`, `>`, `≥`, `<`, `≤`;
text columns offer **contains**, **does not contain** and **starts with**, which ignore case; every
column offers **is missing** and **is not missing**. Filters show as chips above the rows.

**Copy as CSV** and **Download as CSV** export the rows that match the filters, in the sorted order,
with the columns as they are arranged and hidden ones left out. An export carries at most 100,000
rows, and the message after it says when it was cut.

Filters, sort and column layout are not saved. They go with a reload.

## Charts

The chart button in the grid's bar shows the same rows as a chart, and pressing it again goes back
to the rows. The chart opens on a kind picked from the columns: a category and a number is a bar of
the sum, a date and a number a line, two numbers a scatter, one number or date a histogram. **Chart
this column** in a column's menu draws that column alone.

| Kind | Columns | Drawn from |
| --- | --- | --- |
| Histogram | a number or date | at most 50 bins |
| Bar | a category, and a number or a count | at most 20 bars, the rest as Other |
| Line | a number or date along the bottom, one to three numbers | at most 2,000 points a line |
| Scatter | two numbers | at most 5,000 points, sampled the same way each time |
| Box | a number, and a category | at most 20 boxes |

A bar or line combines the rows at each x by count, sum, mean, median, min or max. A bar, a line of
one number, and a scatter can be coloured by a category column. The chart is counted in the kernel
on the rows the filters keep; the grid's sort does not apply to it.

**Insert as code** writes the `plotly.express` call that draws the chart, with its filters, into a
new cell below the output, without running it. In a tab it is **Copy as code**, and copies the call
instead. The code needs a variable to refer to, so it is offered when the cell ends in a bare name
such as `sales`, or when the tab was opened from the Variables panel. The chart itself is never
saved in the notebook; the code is.

The code is written for pandas. For a polars frame, add `.to_pandas()` to it.

## Kernel Memory

While a notebook with a running kernel is in front, the status bar shows the memory its kernel holds
and, on a machine with NVIDIA GPUs, the GPU memory it holds and how busy that GPU is. Pressing either
figure opens meters for the kernel, the machine and each GPU, and **Restart kernel**. The
**Jupyter info** panel shows the machine's memory and GPUs, and each kernel's memory on its row.

A kernel's figure counts its whole process tree, so DataLoader workers and `multiprocessing` pools
started from a cell are included. Inside a container with a memory limit, the machine figure is the
container's limit, since that is where the kernel would be killed. From 90% full, the figure warns.

GPUs are read through `nvidia-smi`. Memory is not read on Windows.
