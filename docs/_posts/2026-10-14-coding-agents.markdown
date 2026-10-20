---
layout: docs
title:  "Coding Agents"
description: "Work with Claude Code, Gemini CLI, Codex or another ACP agent in a panel beside the editor, and review or undo what each turn changed."
date:   2026-10-14 09:00:00 +0530
index: 9.7
group: Guides
categories: docs
permalink: docs/:title
author: Prasun Anand
---

The agent panel runs a coding agent you already have inside the project, and holds the conversation
with it. Zasper speaks the [Agent Client Protocol](https://agentclientprotocol.com) (ACP) to the
agent, so the agent does its own thinking and Zasper shows the conversation and does what the agent
asks of the editor.

The agent is yours, signed in with your own account and subscription. The conversation stays between
the agent and the Zasper on your machine, which sends none of it anywhere.

## What You Need

| Agent | Install | Then |
| --- | --- | --- |
| Claude Code | `npm install -g @agentclientprotocol/claude-agent-acp` | Sign in once by running `claude` in a terminal |
| Gemini CLI | `npm install -g @google/gemini-cli` | Sign in once by running `gemini` in a terminal |
| Codex | `npm install -g @zed-industries/codex-acp` | Sign in once by running `codex` in a terminal |

Claude Code is started as `claude-agent-acp` when that is on your `PATH`. Without it, but with `npx`
and `claude` both installed, Zasper starts the adapter through `npx`. That first start downloads the
adapter and can take a minute or two; later starts take seconds. Gemini CLI is started as
`gemini --experimental-acp` and Codex as `codex-acp`.

Claude Code is the agent tested most so far. Any other agent that speaks ACP can be started by its
command line.

The project folder must be trusted, because an agent acts in it: it edits files and runs commands. See
[Trusted Folders](/docs/trusted-folders).

## Opening the Panel

The bot button in the top bar opens the agent panel on the right of the editor. With no chat open it
lists the agents Zasper knows:

- **Ready**: the installed ones, each with a button that starts it.
- **Not installed**: the others, with the command that installs each and a button to copy it. After
  installing, press **Check again**.
- **Use another ACP agent**: a field for the command line that starts any other agent, such as
  `my-agent --acp`.

While an agent starts, the panel shows how long it has taken. **Cancel** gives up and stops the
agent's process.

## A Chat

Type in the field at the bottom and press Enter to send; Shift+Enter starts a new line. While the agent
works the send button becomes **Stop**, which cancels the turn.

The conversation streams in as the agent works: its messages, its thinking folded under **Thinking**,
its plan, and a row for each tool call. A row opens to what the call did: the output of a command and
how it exited, or the change it made to a file. Pressing the row's file opens it.

The chat is kept on the server, not in the tab. A reload or a second tab shows the same conversation,
and a turn carries on with no tab open. **New chat** in the panel's title stops this chat's agent and
goes back to the list of agents.

## What the Agent May Do Without Asking

The agent decides what to ask about. Claude Code asks before it edits a file, runs a command or uses
one of Zasper's notebook tools, even one that only reads a notebook. The question appears in the chat
with the agent's options as buttons, and the agent waits for your answer. The menu above the chat sets
which questions are answered for you:

| Mode | Answered without asking |
| --- | --- |
| **Ask every time** | Nothing |
| **Allow edits** | Edits, moves and deletes of files |
| **Allow edits and commands** | Those, and commands |

Any other question, such as one about a notebook tool, is asked in every mode. A question the mode
answered says *Allowed by this chat's mode*. The mode belongs to the chat, and every tab showing the
chat sees it change.

## Mentioning a File, a Cell or an Output

`@` in the message field finds a file by name, or by its folder: `@data/` lists what is in `data`.
Files that `.gitignore` leaves out are listed too, dimmed and after the rest, since a dataset often is
one of them. The agent is sent a link to the file
and reads it itself.

In a notebook, a cell's menu has **Add Cell to Chat** and **Add Output to Chat**; both are also in the
command palette. The cell's source, or its output as text, goes with the next message as it is on
screen, unsaved edits included.

What a message mentions shows as chips above the field, and in the message once sent.

## Notebooks

Every agent is given Zasper's own MCP server, through `zasper mcp`, with no setup. With it the agent
can read a notebook's cells and outputs, change cells, run them in the notebook's live kernel, and look
at the kernel's variables and dataframes. The tools are listed in
[Zasper's MCP Server](/docs/mcp-server), which also covers using them from an agent you run outside
Zasper.

A notebook open in Zasper shows the agent's work as it happens. A cell the agent is running names the
agent beside its running time, and a cell it ran carries a bot mark in its gutter. A file the agent
writes reaches open tabs as a save does, and the tab says the agent wrote it.

When the agent reads a file you have open with unsaved edits, it is given the tab's text, so it sees
what you see rather than what is on disk.

## Reviewing and Undoing a Turn

When a turn ends, the files it changed are listed under it, each marked A, M or D for added, modified
or deleted. Pressing a file opens a diff of it, **Before the turn** against **Now**: the file as it is
on disk, so it holds anything changed since the turn too, and the tab says so when it does.

You can put back as much or as little as you want:

- **A change inside a file.** In the diff, each changed block of a text file has an undo between the
  two sides, and each changed cell of a notebook has one at the end of its head. It is written to the
  file straight away, checked against the version shown, so undoing one change and then another builds
  on the last. A cell the turn only moved stays where it went.
- **A file.** The undo at the end of a file's row puts that file back. A file the turn made or removed
  is put back this way, whole, rather than a block at a time.
- **The whole turn.** **Undo this turn** puts back every file not put back yet: a file the turn added
  is removed, and one it deleted comes back.

A file put back is struck through in the list and still opens, to show what the turn had done to it.
If a file has changed since the turn, Zasper names it first and asks; **Undo anyway** loses the later
change, **Keep them** leaves everything as it is.

The changes are found by snapshotting the project at the start and end of each turn, so every change
counts, however it was made: the agent's own edits, a command it ran, a notebook tool, and any edit you
made in the meantime. This needs git installed. The snapshots are kept in a repository of Zasper's own
under `~/.zasper/checkpoints/`; your project's repository is never touched. Files that `.gitignore`
leaves out, folders such as `node_modules` and `.venv`, and files over 20 MB are not snapshotted.

A chat's snapshots are kept while it runs and let go when it ends. A project not snapshotted for 30
days has its snapshots removed. Deleting `~/.zasper/checkpoints/` by hand is safe; it loses only the
review and undo of turns already taken.

## Past Conversations

The clock button in the panel's title lists the agent's past conversations in this project, newest
first, and picking one goes on in it. For Claude Code this includes conversations held with `claude`
in a terminal in the project. The button appears only for an agent that can list and reopen its
conversations.

The agent replays the conversation into the panel. What Zasper added and the agent did not keep, such
as its questions and your answers or a command's live output, does not come back. Zasper keeps no
history of its own.

## When Something Looks Wrong

- **An agent is listed as Not installed after installing it**: Zasper looks for its command on the
  `PATH` the server was started with. Press **Check again**; if the install added a new folder to
  your `PATH`, restart Zasper from a shell that has it.
- **The agent fails to start**: sign in once by running the agent in a terminal, as its card says.
- **No files listed under a turn**: git is not installed, or the turn changed only files that are not
  snapshotted.
- **The field says the agent has stopped**: its process ended. Start a new chat.
