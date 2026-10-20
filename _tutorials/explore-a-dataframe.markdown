---
layout: tutorial
title: "Explore a DataFrame and Chart It"
description: "Show a pandas DataFrame as a grid, read its columns, sort and filter it in the kernel, page through a million rows, and turn it into a chart you keep as code."
order: 7
track: zasper
cover: summary
cover_width: 636
cover_height: 446
author: Prasun Anand
---

In this tutorial you show a pandas DataFrame in a notebook and work with it where it is. You read its
columns, sort and filter it, page through a million rows, open it in a tab, and chart it. You write
none of that code yourself. At the end, the chart becomes code you keep.

The notebook is `tutorials/04-data-analysis.ipynb` from
[zasper-tutorials](https://github.com/zasper-io/zasper-tutorials). It loads the Palmer penguins with
pandas: 344 penguins of three species, from three islands. The repository's README sets up its kernel,
**Python (zasper-tutorials)**, which has pandas and plotly in it. This page assumes Zasper is
[installed](/docs/installation) and open on that folder. A DataFrame of your own works the same way, on
any Python kernel.

## A DataFrame Is A Grid

Open the notebook and run its first code cell, under **Load**. It reads `data/penguins.csv` into
`penguins`.

Now show the whole table. Add a cell below `penguins.head()`, and type the name of the DataFrame on a line
of its own:

```python
penguins
```

Run it:

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Run Cell and Select Next | `⇧⏎` | `Shift+Enter` |
| Run Cell | `⌃⏎` | `Ctrl+Enter` |

Instead of a long printed table, you get a grid. Its top line says what it is: a **DataFrame**, with
344 rows × 8 columns.

It shows ten rows at a time. **Next page** and **Previous page**, at the bottom, page through them.
The drop-down beside them shows 25 or 100 rows at once.

{% include tut/shot.html name="grid" width="1495" height="533" alt="The penguins DataFrame as a grid: its top line reads DataFrame, 344 rows × 8 columns, each column's header shows its type and a small chart, and the foot reads Rows 1–10 of 344, ringed and labelled Paged, ten rows at a time." caption="Ten rows a page. The foot says which ten." %}

The grid needs the kernel that printed the frame. After a restart, the output is pandas' own table
again; run the cell to get the grid back. The saved notebook keeps pandas' table, so it reads the same
in JupyterLab and on GitHub.

## Read A Column At A Glance

Each column's header shows its type, a small chart of its values, and how much is missing. You can see
them in the grid above. Body mass has a few gaps: `body_mass_g` is a `float64`, and its header says 1%
missing. Hover the small chart for the numbers behind it.

Click a header for its menu. At the top are the actions: sort, filter, chart, hide and move the column.
At the bottom is a **Summary** of the column: **Rows**, **Missing**, **Distinct**, **Min**, **Max**,
**Mean** and **Std dev**. For `body_mass_g`, **Missing** reads 2 (0.6%): two of the 344 penguins have no
body mass. **Min** and **Max** give the range: from 2,700 to 6,300 grams.

{% include tut/shot.html name="summary" width="636" height="446" alt="The menu of the body_mass_g header, over the grid. Its actions are Sort ascending, Sort descending, Filter this column…, Chart this column, Hide column, Move left and Move right. Below them the Summary heading is ringed, labelled A summary of body_mass_g, and lists Rows 344, Missing 2 (0.6%), Distinct 94, Min 2,700, Max 6,300, Mean 4,201.75 and Std dev 801.955." caption="The **Summary** at the bottom of a column's menu." %}

A text column, such as `species`, lists its commonest values instead, under **Summary · commonest**.

## Sort And Filter

In the same menu, choose **Sort descending**. The heaviest penguins come first. The sorting happens in
the kernel, not in your browser.

To keep only some rows, add a filter. Press **Filter rows**, the funnel in the grid's bar. Pick a
column, a comparison and a value, and press **Apply**. Here, the penguins on Biscoe island: `island`,
`=`, `Biscoe`. A text column also offers **contains**, **does not contain** and **starts with**, which
ignore case.

The filter shows above the grid, and the count drops to 168. The sort still holds, so the heaviest
penguins on Biscoe come first. Remove the filter any time with its cross.

{% include tut/shot.html name="filter" width="1495" height="577" alt="The penguins grid filtered: a chip reading island = Biscoe with its cross ringed, the top line reading 168 of 344 rows × 8 columns, Gentoo penguins sorted by body mass from 6300 down, and the foot Rows 1–10 of 168 ringed, labelled 168 penguins on Biscoe." caption="The filter is a chip above the rows. Its cross removes it." %}

## A Million Rows, Still Fast

That was 344 rows. Here's a million. Add a cell below the grid that makes a DataFrame with a million
numbers and their squares:

```python
big = pd.DataFrame({"n": range(1_000_000)})
big["square"] = big.n ** 2
big
```

Run it. The grid appears straight away, because only the ten rows on screen come to the browser.

Sorting a million rows is just as quick. Click the `square` header and choose **Sort descending**. The
kernel sorts, and sends back one page.

{% include tut/shot.html name="million" width="1495" height="576" alt="The big DataFrame as a grid: 1,000,000 rows × 2 columns, sorted by square, with 999998000001 in the first row and the foot reading Rows 1–10 of 1,000,000. The square header is ringed, labelled Largest first, sorted in the kernel." caption="One page of a million rows, sorted in the kernel." %}

## Open It In A Tab

For a closer look, press **Open in a tab**, the last button in the grid's bar. The table opens in a
tab of its own, named `Out[n]` after the cell's count, with the filters, sort and columns it had. There
it scrolls, all the way through. It reads rows as they come into view, so the far end of a million
rows is as quick to reach as the start.

The **Variables** panel, under the editor, lists everything the kernel holds, with each one's type and
size. Open it from its tab in the dock, or with **Variables** in the command palette. Any table there
opens the same way: click its row.

{% include tut/shot.html name="variables" width="807" height="208" alt="The Variables tab of the dock under the editor. It lists big, DataFrame · 1,000,000 × 2 · n, square, and penguins, DataFrame · 344 × 8, with its column names. The penguins line is ringed and labelled Every variable in the kernel, with its type and size." caption="**Variables** lists what the kernel holds, and opens any table in a tab." %}

## Chart It, And Keep The Chart As Code

Back in the notebook, any grid can become a chart. Press **Show as a chart** in the `penguins` grid's
bar. The chart uses the same rows as the grid, filter included. The kernel counts them, and the grid's
sort does not apply.

The buttons at the left of the chart pick its kind: **Histogram**, **Bar**, **Line**, **Scatter** or
**Box**. Pick **Scatter**, choose the columns for **X** and **Y**, and set **Colour** to `species`.
With the Biscoe filter on, two species are left: Adelie and Gentoo.

When the chart is right, **Insert as code** writes the Plotly code for it into a new cell below, with
the filter. It does not run it. Run that cell, and the notebook draws the chart again by itself.

{% include tut/shot.html name="chart" width="1391" height="479" alt="The penguins output shown as a scatter chart: its top line reads DataFrame, 168 of 344 rows × 8 columns, with the island = Biscoe chip below it, then the chart kinds and the X, Y and Colour choices. bill_depth_mm is plotted against bill_length_mm, coloured by species, Adelie in blue and Gentoo in orange. The foot reads bill_depth_mm against bill_length_mm, over 168 of 344 rows, and the Insert as code button at its right is ringed and labelled Insert as code." caption="**Insert as code** turns the chart on screen into a cell of Plotly code." %}

The chart itself is never saved in the notebook; the code is. Insert as code needs a name to write
against, so it works when the cell ends in a bare name such as `penguins`. For an expression such as
`penguins.head()`, the button is disabled and says why.

## Recap

- A displayed DataFrame is a grid
- Headers show type, spread, and gaps
- Sort and filter, computed in the kernel
- A million rows page instantly
- Open tables and variables in a tab
- Chart it, then insert the chart as code

**Next:** [Exploring Data](/docs/exploring-data) has the rest of the grid and the charts for reference,
then [Keep a Run Going When You Close the Browser](/tutorials/keep-a-run-going).
To get a DataFrame out of a database instead, try [Query Data with SQL](/tutorials/query-data-with-sql).
