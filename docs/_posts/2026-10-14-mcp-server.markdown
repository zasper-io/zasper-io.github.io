---
layout: docs
title:  "MCP Server"
description: "Let a coding agent such as Claude Code, Codex or Cursor read, edit and run your notebooks through the Zasper you have open."
date:   2026-10-14 09:00:00 +0530
index: 9.8
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

Zasper is an MCP server. A coding agent that speaks the Model Context Protocol can list the
notebooks in your project, read their cells and outputs, change cells, and run them in the
notebook's live kernel. A notebook you have open in Zasper shows each change and each run as it
happens, in the cell it is for, under the agent's name.

Files, search and git are left to the agent's own tools. What Zasper adds is the kernel, and outputs
the agent can see: plots come back as images.

The agent is your own, signed in with your own account. Zasper sends nothing anywhere; the agent
talks to the server on your machine.

## Connecting an Agent

Start Zasper in the project as usual. `zasper mcp` needs a running server; it does not start one.
Then register `zasper mcp` with the agent, run from inside the project:

| Agent | How |
| --- | --- |
| Claude Code | `claude mcp add zasper -- zasper mcp` |
| Codex | in `~/.codex/config.toml`: `[mcp_servers.zasper]` with `command = "zasper"` and `args = ["mcp"]` |
| Gemini CLI, Cursor and others | an `mcpServers` entry, as below |
| Anything else | a stdio MCP server whose command is `zasper mcp` |

Agents configured with JSON take this entry:

```json
{
  "mcpServers": {
    "zasper": { "command": "zasper", "args": ["mcp"] }
  }
}
```

The agent panel inside Zasper needs none of this. An agent started from it is given `zasper mcp` as
it starts. See [Coding Agents](/docs/coding-agents).

## How It Finds Zasper

There is no port or token to configure. A running Zasper records its address and access token in
`~/.zasper/runtime/server-<pid>.json`, readable by you alone. `zasper mcp` reads those files, keeps
the servers that still answer, and picks the one whose project holds the folder it was started in.
When projects are nested, the deepest wins. When only one server is running, it uses that one.

It then signs in with the recorded token and relays MCP messages between the agent, on standard
input and output, and the server. When it cannot connect, it says why on standard error:

- **No Zasper server is running**: start `zasper` in the project.
- **Several Zasper servers are running and none is for this folder**: run the agent from inside one
  of the projects it lists.

An agent that speaks streamable HTTP can use `POST /mcp` on the server directly, signed in like any
`/api` request.

## Tools

| Tool | What it does |
| --- | --- |
| `list_notebooks` | The project's notebooks, and whether each has a kernel running. |
| `read_notebook` | A notebook's cells with their ids, sources and outputs, and the notebook's hash. Plots come back as images. |
| `edit_notebook` | Insert, edit, delete and move cells by id, written in one save. Takes the hash from `read_notebook`, so a notebook changed since is not written over. |
| `run_cell` | Runs a code cell and returns its outputs, starting the notebook's kernel if none is running. |
| `run_all` | Runs every code cell in order, stopping at the first that fails. |
| `run_code` | Runs code in the kernel to inspect its state. It goes in no cell and is not saved. |
| `restart_kernel` | Replaces the kernel with a fresh one of the same kind. An open notebook follows it. |
| `list_kernelspecs` | The kernels the project can start, with their languages. |
| `interrupt_kernel` | Stops the cell the kernel is running. |
| `list_variables` | The kernel's variables, with types and shapes. Python kernels only. |
| `describe_dataframe` | A dataframe's or array's columns, their types and statistics, and its first rows. |

The run tools wait 60 seconds by default, and the agent can ask for up to 10 minutes. A run still
going after that carries on in the kernel; its output reaches the notebook as it comes, and the agent
is told to read it with `read_notebook` or stop it with `interrupt_kernel`.

## What You See

**Edits arrive in the open tab.** A cell you have not touched takes the agent's version in place. A
band over the notebook names who made the change, such as *claude-code changed drift.ipynb*. A cell
you were editing at the same time is not overwritten: it asks you, on the cell, to **Compare**,
**Keep mine** or **Take theirs**.

**Runs show in their cell.** While an agent's run is going, the cell's timer reads
*running · claude-code · 4s*, and the stop button interrupts it, whoever started it. A cell an agent
ran carries a small bot mark beside its timing; hovering it says who ran it. Running the cell
yourself clears the mark.

**No tab is needed.** A cell runs on the server whether or not the notebook is open. With no tab
open, its output is written to the notebook file.

The name shown is the one the agent gives when it connects.

## Limits

- **Nothing runs in a restricted folder.** The run tools, and `restart_kernel`, are refused until
  you trust the project, as a kernel started any other way is. See
  [Trusted Folders](/docs/trusted-folders).
- **`input()` cannot be answered** in a run an agent starts. It fails at once rather than waiting.
- **`list_variables` is for Python kernels.** The other tools work with any kernel.
