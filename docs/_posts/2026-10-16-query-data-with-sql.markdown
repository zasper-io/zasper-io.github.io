---
layout: docs
title:  "Query Data with SQL"
description: "Build a SQLite database of New York's taxi trips, connect Zasper to it, ask it a question in a SQL cell, and chart the answer in Python."
date:   2026-10-16 09:00:00 +0530
index: 15
group: Tutorials
categories: docs
permalink: docs/:title
author: Prasun Anand
---

A SQL cell runs a query and leaves the answer in the kernel as a pandas DataFrame, for the Python
cells after it. This tutorial builds a database of every yellow taxi trip in New York in January 2024,
about three million of them, connects Zasper to it, and asks it which boroughs the trips start in and
what they cost.

You need a Python kernel with pandas in it. [Your First Notebook](/docs/your-first-notebook) covers
getting one.

## Get the Data

New York's Taxi and Limousine Commission publishes every trip as a Parquet file. Make a notebook at the
root of your project. The build reads the Parquet file with DuckDB, so install it first, in a cell of
its own:

```
%pip install duckdb
```

Then run this. It downloads January 2024 and the list of taxi zones, and writes them to
`data/nyc_taxi.db`, a SQLite database of about 400 MB:

```python
import csv, io, os, sqlite3, urllib.request

import duckdb

TLC = "https://d37ci6vzurychx.cloudfront.net"
os.makedirs("data", exist_ok=True)
urllib.request.urlretrieve(f"{TLC}/trip-data/yellow_tripdata_2024-01.parquet", "data/yellow_2024-01.parquet")
with urllib.request.urlopen(f"{TLC}/misc/taxi_zone_lookup.csv") as response:
    zones = list(csv.reader(io.TextIOWrapper(response)))[1:]

db = sqlite3.connect("data/nyc_taxi.db")
db.executescript("""
CREATE TABLE zones (location_id INTEGER PRIMARY KEY, borough TEXT, zone TEXT, service_zone TEXT);
CREATE TABLE payment_types (payment_type INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE trips (
  vendor_id INTEGER, pickup_at TEXT, dropoff_at TEXT, passenger_count INTEGER, trip_distance REAL,
  rate_code_id INTEGER, store_and_fwd_flag TEXT, pickup_location_id INTEGER, dropoff_location_id INTEGER,
  payment_type INTEGER, fare_amount REAL, extra REAL, mta_tax REAL, tip_amount REAL, tolls_amount REAL,
  improvement_surcharge REAL, total_amount REAL, congestion_surcharge REAL, airport_fee REAL);
INSERT INTO payment_types VALUES (0, 'Flex fare'), (1, 'Credit card'), (2, 'Cash'), (3, 'No charge'),
  (4, 'Dispute'), (5, 'Unknown'), (6, 'Voided trip');
""")
db.executemany("INSERT INTO zones VALUES (?, ?, ?, ?)", zones)
trips = duckdb.sql("""
  SELECT VendorID, strftime(tpep_pickup_datetime, '%Y-%m-%d %H:%M:%S'),
         strftime(tpep_dropoff_datetime, '%Y-%m-%d %H:%M:%S'), passenger_count, trip_distance,
         RatecodeID, store_and_fwd_flag, PULocationID, DOLocationID, payment_type, fare_amount, extra,
         mta_tax, tip_amount, tolls_amount, improvement_surcharge, total_amount, congestion_surcharge,
         Airport_fee
  FROM 'data/yellow_2024-01.parquet'
  WHERE tpep_pickup_datetime >= '2024-01-01' AND tpep_pickup_datetime < '2024-02-01'
  ORDER BY tpep_pickup_datetime""")
while batch := trips.fetchmany(200_000):
    db.executemany(f"INSERT INTO trips VALUES ({', '.join('?' * 19)})", batch)
db.execute("CREATE INDEX trips_pickup_at ON trips (pickup_at)")
db.commit()
db.close()
os.remove("data/yellow_2024-01.parquet")
```

It takes a few minutes, most of them downloading. The database has three tables:

| Table | Holds |
| ----- | ----- |
| `trips` | one row per trip: pickup and dropoff times and zones, distance, fare, tip, tolls and surcharges |
| `zones` | the 265 taxi zones, by `location_id`, with their borough |
| `payment_types` | the names of the `payment_type` codes |

## Add a Connection

Open **Settings** from the gear in the sidebar, go to **Data connections**, and press **Add…**. Fill
in:

- **Name**: `taxi`. A SQL cell names the connection it runs on by this.
- **Type**: SQLite.
- **File**: `data/nyc_taxi.db`. A path that is not absolute is read from the project's root.
- **Kept for**: **This project**, so the connection is saved in the project's
  `.zasper/connections.json` and can be committed with it. SQLite has no password. For a database
  that does, the password goes into your system keychain, never into that file.

**Test** opens the database and says how quickly it answered. Then **Save**.

<figure class="tut-figure">
  <div class="tut-shot is-image">
    <img src="/static/images/docs/sql-connection.png" alt="The Add a connection dialog, with Name taxi, Type SQLite, File data/nyc_taxi.db, and Kept for set to This project, above the Test, Cancel and Save buttons." width="1200" height="420" loading="lazy" />
  </div>
  <figcaption class="tut-caption">A SQLite connection needs only a name and a file.</figcaption>
</figure>

**Data** in the sidebar now lists **taxi**. Open it to see its tables, and a table to see its columns
and their types.

## Ask a Question

Point at the gap below the cell you ran, and choose **SQL** on the rail that appears. The new cell's
head says where it runs and where the answer goes: on **taxi**, the project's first connection, into
`df_1`. Click `df_1` and rename it `df_boroughs`. Then type the query, and run it with
**Shift+Enter**:

```sql
SELECT z.borough, count(*) AS trips, round(avg(t.total_amount), 2) AS avg_total
FROM trips t JOIN zones z ON z.location_id = t.pickup_location_id
WHERE t.fare_amount > 0 AND t.dropoff_at > t.pickup_at
GROUP BY 1 ORDER BY 2 DESC
```

As you type, the editor completes table and column names from the database. The `WHERE` line leaves
out refunds and corrections, which are recorded as trips with a negative fare, and trips that end
before they start.

The query runs in the database, over all three million trips, and brings back only its eight rows.
The output's first line names the DataFrame and the connection, counts the rows and says how long the
query took. The rows follow as a table you can page, sort, filter and chart.

<figure class="tut-figure">
  <div class="tut-shot is-image">
    <img src="/static/images/screens/sql-cells.png" alt="A SQL cell on taxi writing df_boroughs, with the query above and its 8 rows below: trips and average total by borough, Manhattan first with 2,615,336 trips. The Data panel beside it lists the taxi connection's three tables and the DataFrames the kernel holds." width="1400" height="800" loading="lazy" />
  </div>
  <figcaption class="tut-caption">The query and its answer. Under <strong>Dataframes</strong>, the Data panel lists the frames the kernel now holds.</figcaption>
</figure>

## More Rows Than It Shows

Now ask for every trip, in a SQL cell of its own:

```sql
SELECT * FROM trips
```

A SQL cell reads at most 1,000 rows unless told otherwise, and says when it left rows behind. Press
**Load all** once, and it counts them and estimates the memory reading them would take:

<figure class="tut-figure">
  <div class="tut-shot is-image">
    <img src="/static/images/docs/sql-load-all.png" alt="A SQL cell reading SELECT * FROM trips. Its output line says df_trips, taxi, first 1,000 of 2,964,606 rows, then Load all, about 885 MB, above the first rows of the table." width="2164" height="660" loading="lazy" />
  </div>
  <figcaption class="tut-caption">The first 1,000 of 2,964,606 rows, and what reading them all would take.</figcaption>
</figure>

Pressing it again reads all 2,964,606 rows. Usually you do not want to: a query that groups, counts or
averages in the database, like the one before it, brings back the answer rather than the rows.

## Use the Answer in Python

`df_boroughs` is an ordinary DataFrame. In a code cell below it:

```python
boroughs = df_boroughs[~df_boroughs["borough"].isin(["Unknown", "N/A"])].sort_values("avg_total")
ax = boroughs.plot.barh(x="borough", y="avg_total", legend=False, title="Average paid per trip, by pickup borough")
```

`Unknown` and `N/A` are zones with no borough. The language server knows `df_boroughs` too, so it is
not flagged as undefined, and `df_boroughs.` completes as a DataFrame.

<figure class="tut-figure">
  <div class="tut-shot is-image">
    <img src="/static/images/docs/sql-chart.png" alt="A code cell plotting df_boroughs as horizontal bars: EWR is the most expensive pickup at about 111 dollars a trip, then Queens, Staten Island, the Bronx and Brooklyn, with Manhattan the cheapest at about 23 dollars." width="2164" height="990" loading="lazy" />
  </div>
  <figcaption class="tut-caption">Manhattan has nearly nine trips in ten, and the cheapest. EWR, Newark airport, is the dearest.</figcaption>
</figure>

## In the Notebook File

A SQL cell is saved as a code cell whose first line is a cell magic, so the notebook stays an ordinary
`.ipynb`:

```
%%zasper_sql taxi --out df_boroughs
SELECT z.borough, count(*) AS trips, round(avg(t.total_amount), 2) AS avg_total
...
```

Zasper hides that line and shows the cell's head instead. JupyterLab does not know the magic, so the
cell runs only in Zasper.

[SQL Cells](/docs/sql-cells) has the rest: PostgreSQL, MySQL, Snowflake and the other databases,
querying the kernel's own DataFrames with DuckDB, the answer cache, and the Data panel.
