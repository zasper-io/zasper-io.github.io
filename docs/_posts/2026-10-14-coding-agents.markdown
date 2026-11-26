---
layout: docs
title:  "Coding Agents"
description: "Work with Claude Code, Codex, Antigravity CLI, OpenCode or another ACP agent in a panel beside the editor, and review or undo what each turn changed."
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

Step by step: [Work with an AI Agent](/tutorials/work-with-an-ai-agent).

## What You Need

| Agent | Install | Then |
| --- | --- | --- |
| Claude Code | `npm install -g @agentclientprotocol/claude-agent-acp` | Sign in from the panel, or by running `claude` in a terminal |
| Codex | `npm install -g @agentclientprotocol/codex-acp`, beside the `codex` CLI | Sign in once by running `codex` in a terminal |
| Antigravity CLI | Google's install script, below | Sign in from the panel, or by running `agy` in a terminal |
| OpenCode | OpenCode's install script, below, or its desktop app | Nothing for its free models; `opencode auth login` connects a provider's |

Antigravity CLI and OpenCode install with their own scripts. On Windows, Antigravity CLI has
`install.ps1` at the same address, and OpenCode has a download on its site.

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash   # Antigravity CLI
curl -fsSL https://opencode.ai/v2/install | bash             # OpenCode
```

Claude Code is started as `claude-agent-acp` when that is on your `PATH`. Without it, but with `npx`
and `claude` both installed, Zasper starts the adapter through `npx`. That first start downloads the
adapter and can take a minute or two; later starts take seconds. Codex is started as `codex-acp`,
Antigravity CLI as `agy acp`, and OpenCode as `opencode acp`: from your `PATH`, else from
`~/.opencode/bin`, where its script puts it, else from inside its desktop app on a Mac.

Gemini CLI is not in the list: it has not served personal Google accounts since 18 June 2026, and
Antigravity CLI signs in with those, a Gemini API key or a business account alike. Gemini CLI still
works as any other agent, started by its command line: `gemini --experimental-acp`.

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

## Signing In

An agent that is installed but not signed in says so when it starts, and the panel lists the ways it
offers to sign in, in its own words:

- **A way in a terminal**, such as Claude Code's **Claude Subscription**: Zasper opens a terminal in the
  project with the agent's sign-in command typed in. Finish there, often in your browser, then press
  **Try again**.
- **A way the agent carries out itself**, such as Antigravity CLI's **Log in with Google**: the agent
  opens your browser and the chat starts once you are signed in. A way that takes an API key asks for
  it in the panel, and Zasper keeps the key in your keychain.

A message the agent refused for want of a sign-in waits in the field of the next chat. **More**, under
the message field, shows who the agent is signed in as, and **Sign out** where the agent has one. The
sign-in is the agent's own, kept where the agent keeps it; Zasper stores none of it.

## A Chat

Type in the field at the bottom and press Enter to send; Shift+Enter starts a new line. While the agent
works the send button becomes **Stop**, which cancels the turn.

A `/` at the start of a message lists the agent's own commands, such as Claude Code's `/compact`.
Typing narrows the list, `Tab` completes a command, and `Enter` sends one typed in full.

The conversation streams in as the agent works: its messages, its thinking folded under **Thinking**,
its plan, and a row for each tool call. A row opens to what the call did: the output of a command and
how it exited, or the change it made to a file. Pressing the row's file opens it. A command still
running when the turn ends says so. When the agent compacts the conversation to free up context, or
sends a notice, the chat shows it where it happened.

The panel's title is the chat's title, as the agent names it, and beside it a meter shows how full
the agent's context is.

A document the agent writes for you, such as Antigravity CLI's plan, opens from the chat as a read-only
tab; to change it, reply in the chat. Other links in an answer open the file in the project, or the
web page in a new browser tab.

When the agent asks you something, such as Antigravity CLI's questions, the question is a form in the
chat, under the call that asked it. Answer it, or press **Skip**.

A subagent's calls are listed under the row that sent it off, and its report is that row's output. An
OpenCode subagent works in the background after the turn ends; its row says so until it reports back.

Antigravity CLI and OpenCode take a message while they work: **Send** stays beside **Stop**, and the
message joins the turn under way. With other agents, wait for the turn to end, or stop it.

The chat is kept on the server, not in the tab. A reload or a second tab shows the same conversation,
and a turn carries on with no tab open. **New chat** in the panel's title stops this chat's agent and
goes back to the list of agents.

## The Agent's Settings

Under the message field, the agent's own settings for the chat are chips, as the agent words them: its
model, its effort and its mode. Its other settings are under **More**. A setting lasts for the chat; a
new chat starts with the agent's defaults.

The mode decides what the agent asks you before it acts. When it asks, the question appears in the chat
with the agent's options as buttons, and the agent waits for your answer. Claude Code's modes:

| Mode | What Claude Code asks first |
| --- | --- |
| **Manual** | Every change: an edit, a command, or one of Zasper's notebook tools, even one that only reads |
| **Accept edits** | Commands and notebook tools; file edits go ahead |
| **Plan** | It makes a plan before it changes anything |
| **Auto** | Claude decides which actions need your yes. Its default, when your model offers it |
| **Bypass permissions** | Nothing. Listed only when your Claude Code settings allow it |

An agent with no modes of its own gets Zasper's, as a chip labelled **What the agent may do without
asking**:

| Mode | Answered without asking |
| --- | --- |
| **Ask every time** | Nothing |
| **Allow edits** | Edits, moves and deletes of files |
| **Allow edits and commands** | Those, and commands |

A question that mode answered says *Allowed by this chat's mode*. Every tab showing the chat sees a
setting change.

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
- **The agent fails to start**: it may need signing in; see [Signing In](#signing-in), or run the agent
  once in a terminal, as its card says.
- **No files listed under a turn**: git is not installed, or the turn changed only files that are not
  snapshotted.
- **The field says the agent has stopped**: its process ended. Start a new chat.
