---
layout: docs
---

<p align="center">
  <img src="/static/images/logo.svg" alt="Zasper">
</p>
<p align="center">
    ⚡ High Performance IDE 🚀 Massive concurrency 🐥  Inspired by Jupyter
</p>

<p align=center>
  <a href="https://github.com/zasper-io/zasper" target="_blank">
      <img src="https://img.shields.io/github/last-commit/zasper-io/zasper" alt="Last Commit">
  </a>
  <a href="https://github.com/zasper-io/zasper/stargazers" target="_blank">
      <img src="https://img.shields.io/github/stars/zasper-io/zasper" alt="GitHub Stars">
  </a>
  <a href="https://github.com/zasper-io/zasper/issues" target="_blank">
      <img src="https://img.shields.io/github/issues/zasper-io/zasper" alt="GitHub Issues">
  </a>
  <a href="https://github.com/zasper-io/zasper/actions/workflows/gobuild.yml" target="_blank"><img alt="Github CD status" src="https://github.com/zasper-io/zasper/actions/workflows/gobuild.yml/badge.svg"></a>
</p>

<p>
Zasper is an IDE designed from the ground up to support massive concurrency. It provides a minimal memory footprint, exceptional speed, and the ability to handle numerous concurrent connections.

It's perfectly suited for running REPL-style data applications, with Jupyter notebooks being one example.

Currently Zasper is supported on Linux and Mac.

</p>

<h3> Why I built Zasper ?</h3>
<p></p>
<p>
There are several proprietary JupyterLab-like frontend tools available in the market, such as Databricks Notebooks and Deepnote Notebooks. However, none of them are free or open-source, and most require users to work in the cloud. Even the modest personal computers these days are typically equipped with at least 8 GB of RAM, an 8-core CPU, and a decent 4 GB GPU, I saw an opportunity to create a solution that works seamlessly on local machines. That’s why I decided to build Zasper which can effectively utilize the resources available and guarantee maximum efficiency.
</p>

<p>
Originally I wrote https://github.com/zasper-io/zasper_py (now in Private mode) to build a new frontend around Jupyter. During the process I realized, Go is the ideal choice to rebuild the Jupyter project. Go has excellent support for REST, RPC, WS protocols. Concurrency and Performance are the areas where Go shines.

</p>

<p>

Go's Concurrency: Better suited for applications requiring both concurrency and parallelism, as it leverages multiple cores effectively. It's easier to handle blocking operations without freezing the system.

</p>

<p>

Python's Event Loop: Ideal for I/O-bound applications that need to handle a lot of asynchronous tasks without blocking. However, it struggles with CPU-bound tasks and lacks native parallelism unless additional worker threads are used.

Hence the Go version of Zasper was born!
</p>

<p>
<br>
<h3> 📷 Screenshots</h3><br><br>

<h4> Editor </h4><br>
<img height="400px" width="auto" src="https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main//editor.png"/><br><br>

<h4> Terminal </h4><br>
<img height="400px" width="auto" src="https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/terminal.png"/><br><br>

<h4> Launcher </h4><br>
<img height="400px" width="auto" src="https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/launcher.png"/><br><br>

<h4> Jupyter Notebook </h4><br>
<img height="400px" width="auto" src="https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/notebook.png"/><br><br>

<h4> Version Control </h4><br>
<img height="400px" width="auto" src="https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/git.png"/><br><br>

<h4> Command Palette </h4><br>
<img height="400px" width="auto" src="https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/commandPalette.png"/><br><br>

<h4> Dark Mode </h4><br>
<img height="400px" width="auto" src="https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/dark.png"/><br><br>


<img height="400px" width="auto" src="https://raw.githubusercontent.com/zasper-io/assets/refs/heads/main/darkNotebook.png"/><br><br> 
</p>

<p>
<h4>⚡️ Quick start</h4><br>

Zasper comes in two flavours:

<ol>
<li> Electron App</li>
<li> Web App</li>
</ol>

<h4> Electron App</h4>
</p>



<h4>
Install zeromq
</h4>
On debian
<br>
<pre>
<code class="language-python">
sudo apt-get install libzmq3-dev
</code>
</pre>
<br>
On mac
<br>
<pre>
<code class="language-python">
brew install pkg-config
brew install zeromq
</code>
</pre>
<p>
Go to project home and start the server
</p>
<pre>
<code class="language-python">
go build -o ui/public/zasper
</code>
</pre>
<br>
Go to `ui` and run the app in dev mode
<br>
<pre>
<code class="language-python">
npm run electron-dev       # dev-mode

npm run electron-package   # prod-mode
</code>
</pre>

</p>

<p>

<h4> Webapp</h4>

<h4> Build the frontend</h4>

<pre>
<code class="language-python">
cd ./ui/
npm run build
</code>
</pre>

<h4>Install zeromq</h4>

On debian
<br>
<pre>
<code class="language-python">
sudo apt-get install libzmq3-dev
</code>
</pre>
<br>
On mac
<br>
<pre>
<code class="language-python">
brew install pkg-config
brew install zeromq
</code>
</pre>
<br>
<p>
<h4>Start the backend</h4>

Install zeromq.

Go to project home and start the server
<br>
<pre>
<code class="language-python">
go build -tags webapp
</code>
</pre>
<br>
This will crate a binary called `zasper`. Now add this binary to your path. 
<br>
Run zasper in any directory to see if the installation was done correctly.

<br>
<pre>
<code class="language-python">
% zasper -h
Usage of ../zasper:
  -cwd string
    	base directory of project (default ".")
  -debug
    	sets log level to debug
  -port string
    	port to start the server on (default ":8888")
</code>
</pre>
<br>

Go to any directory you want to serve and run `zasper`. This starts zasper server in the directory.
<br>

<pre>
<code class="language-python">
% zasper 
2024/12/15 20:39:12 Zasper Server started! Listening on port:8888

███████╗ █████╗ ███████╗██████╗ ███████╗██████╗ 
╚══███╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗
  ███╔╝ ███████║███████╗██████╔╝█████╗  ██████╔╝
 ███╔╝  ██╔══██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗
███████╗██║  ██║███████║██║     ███████╗██║  ██║
╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝

</code>
</pre>
<br>

Go to `http://localhost:8888`
</code>
</p>

<p>

<h4>Logging</h4>

By default, the application writes logs to the following locations:

<br>
<pre>
<code class="language-python">
on Linux: ~/.config/zasper/logs/main.log
on macOS: ~/Library/Logs/zasper/main.log
on Windows: %USERPROFILE%\AppData\Roaming\zasper\logs\main.log
</code>
</pre>
</p>