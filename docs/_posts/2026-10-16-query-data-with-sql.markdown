---
layout: docs
title:  "Query Data with SQL"
description: "Connect a SQLite database of penguins to Zasper, look at its tables in the Data panel, query it from a SQL cell, and use the answer in Python."
date:   2026-10-16 09:00:00 +0530
index: 15
group: Tutorials
categories: docs
permalink: docs/:title
author: Prasun Anand
---

A SQL cell runs a query on a database and leaves the answer in the kernel as a pandas DataFrame. In
this tutorial you connect a database to Zasper, look at its tables, query it from a SQL cell, write a
query of your own, and use the answer in Python.

The database holds the Palmer penguins: 344 penguins of three species, from three islands. The data is
`data/penguins.csv` in [zasper-tutorials](https://github.com/zasper-io/zasper-tutorials). Its README
sets up the kernel, **Python (zasper-tutorials)**, which has pandas in it. This page assumes Zasper is
[installed](/docs/installation) and open on that folder.

## Connect A Database

Start a new notebook at the root of the folder: on the Launcher, pick **Python (zasper-tutorials)**.

First, make the database. SQLite keeps a whole database in one file, and Python can write one with
no extra installs. Run this in the notebook's first cell:

```python
import sqlite3
import pandas as pd

penguins = pd.read_csv("data/penguins.csv")
with sqlite3.connect("data/penguins.sqlite") as db:
    penguins.to_sql("penguins", db, index=False, if_exists="replace")
```

It writes `data/penguins.sqlite`, with one table, `penguins`, holding every row of the CSV.

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Run Cell and Select Next | `⇧⏎` | `Shift+Enter` |

Connections are set up once, in **Settings**. Open it from the gear in the sidebar, just above Help.
Search for `connection`, and press **Add…** beside **Add a connection**. Fill in the form:

- **Name**: `penguins`. You'll see it in every SQL cell that uses this connection.
- **Type**: **SQLite**. The list also has PostgreSQL, MySQL, DuckDB, Snowflake and more.
- **File**: `data/penguins.sqlite`. A path like this is read from your project's folder.
- **Kept for**: **This project**. The connection is saved in `.zasper/connections.json`, in the
  project, so anyone who opens the project gets it too. Passwords are never saved there. A database
  that has one keeps it in your system's keychain. SQLite has none.

**Test** connects with what's in the form. It tells you which database answered, and how quickly. It
works, so press **Save**.

{% include tut/shot.html name="connection" width="1040" height="334" alt="The Add a connection dialog: Name penguins, Type SQLite, File data/penguins.sqlite, Kept for This project. The line Connected · SQLite 3.47.1 · 210 ms is ringed and labelled The database answered, above the Test, Cancel and Save buttons." caption="**Test** says which database answered, and how quickly." %}

## Explore Its Tables

Your connections are listed in the **Data** panel. Open it from the database icon in the sidebar.
**penguins** is there, under **Connections**.

Open a connection to see its tables. Open a table to see its columns, and the type of each one,
before you write any SQL. Here there is one table, `penguins`. Its `species`, `island` and `sex` are
`TEXT`, the measurements are `REAL`, and `year` is an `INTEGER`. The last figure on this page shows the
whole tree.

## Query It In A SQL Cell

Click your notebook's tab, so the notebook is in front again. Now the `penguins` table's row in the
Data panel has a button at its end. Hover over it, and its tooltip reads **Query penguins in a new SQL
cell**. Press it. Zasper writes a SQL cell for you, below the cell you're in. It reads the table's
first hundred rows.

{% include tut/shot.html name="query-button" width="565" height="73" alt="The penguins table's row in the Data panel, under the penguins connection. The button at the end of the row is ringed and labelled Query this table, and its tooltip reads Query penguins in a new SQL cell." caption="The button at the end of a table's row writes the query for you." %}

A SQL cell has a head. On the left is the connection it runs on: **penguins**. On the right is the
name of the DataFrame its answer goes into: `df_penguins`. Click either one to change it.

Run it like any other cell, with **Shift+Enter**. The first line of the output tells you where the
rows came from: the DataFrame, the connection, how many rows, and how long the query took.

The answer itself is a grid, like any other DataFrame. Each column's header shows how its values are
spread out, and how many are missing. Here, `body_mass_g` is missing for 1% of the hundred rows.

{% include tut/shot.html name="sql-cell" width="1484" height="631" alt="A SQL cell whose head reads penguins SQLite, then an arrow and df_penguins, over the query SELECT * FROM penguins LIMIT 100. The output's first line, df_penguins · penguins · 100 rows · 0.1 s, is ringed and labelled DataFrame · connection · rows · time. Below it is a grid of 100 rows × 8 columns, each header with its type and a small chart; body_mass_g says 1% missing." caption="The output's first line says where the rows came from." %}

## Write Your Own Query

Now a question of your own: how heavy is each species, on each island? Replace the query in the cell
with this one. As you type, Zasper suggests the table's columns.

```sql
SELECT species, island,
count(*) AS penguins,
round(avg(body_mass_g)) AS mass_g
FROM penguins
GROUP BY species, island
ORDER BY mass_g DESC
```

Give the answer a name that says what it holds. Click `df_penguins` in the cell's head, and type
`mass_by_island`.

Run it. Five rows come back: one for each species on each island, the heaviest first. Gentoo live
only on Biscoe, Chinstrap only on Dream, and Adelie on all three islands.

{% include tut/shot.html name="own-query" width="1484" height="575" alt="The SQL cell now writes to mass_by_island and holds the GROUP BY query. Its first line, mass_by_island · penguins · 5 rows, is ringed and labelled 5 rows, in mass_by_island. The grid shows Gentoo on Biscoe, 124 penguins at 5076 grams, then Chinstrap on Dream at 3733, and Adelie on Biscoe, Torgersen and Dream, around 3700." caption="The cell writes its five rows into `mass_by_island`." %}

The query runs in the database, and only its answer comes back. On a table of millions of rows, that
is the difference between five rows and millions.

## Use The Answer In Python

The answer is an ordinary pandas DataFrame in the kernel. So the next cell can use it straight away.
Add a code cell below, and keep only the Adelie penguins:

```python
mass_by_island[mass_by_island.species == "Adelie"]
```

The Data panel lists `mass_by_island` under **Dataframes**, beside every other frame the kernel
holds.

{% include tut/shot.html name="data-panel" width="492" height="401" alt="The Data panel: the penguins connection, SQLite, with its penguins table open, listing species, island and sex as TEXT, the four measurements as REAL and year as INTEGER. Below, under Dataframes, df_penguins and mass_by_island; mass_by_island is ringed and labelled Frames the kernel holds." caption="**Dataframes** in the Data panel lists the frames the kernel holds." %}

In the notebook file, a SQL cell is a code cell whose first line is a cell magic,
`%%zasper_sql penguins --out mass_by_island`. Zasper hides that line and shows the cell's head
instead, so the notebook stays an ordinary `.ipynb`. JupyterLab does not know the magic, so the cell
runs only in Zasper.

## Recap

- Add a connection once, in Settings
- See tables and columns in the Data panel
- Query writes a SQL cell for you
- The cell's head names the DataFrame
- Use it from Python in the next cell

**Next:** [SQL Cells](/docs/sql-cells) has the rest for reference: PostgreSQL, MySQL and the other
databases, **Load all** for answers bigger than the limit, querying the kernel's own DataFrames, and
the answer cache. Then [Work with an AI Agent](/docs/work-with-an-ai-agent).
