---
layout: post
title:  "Zasper: a modern IDE for Data Science."
date:   2024-12-22 07:39:59 +0530
categories: usage
permalink: /:title
author: Prasun Anand
banner: /static/images/logo.svg
---

Zasper is an IDE designed from the ground up to support massive concurrency. It provides a minimal memory footprint, exceptional speed, and the ability to handle numerous concurrent connections.

It's perfectly suited for running REPL-style data applications, with Jupyter notebooks being one example.

**Zasper uses one fourth of RAM and one fourth of CPU used by Jupterlab. While Jupyterlab uses around 104.8 MB of RAM and 0.8 CPUs, Zasper uses 26.7 MB of RAM and 0.2 CPUs.**

<img class="blog-img" src="/static/images/zasper-intro.png">

Currently Zasper is supported on Linux and Mac.

# Why I built Zasper ?

There are several proprietary JupyterLab-like frontend tools available in the market, such as Databricks Notebooks and Deepnote Notebooks. However, none of them are free or open-source, and most require users to work in the cloud. Even the modest personal computers these days are typically equipped with at least 8 GB of RAM, an 8-core CPU, and a decent 4 GB GPU, I saw an opportunity to create a solution that works seamlessly on local machines. That’s why I decided to build Zasper which can effectively utilize the resources available and guarantee maximum efficiency.

Originally I wrote https://github.com/zasper-io/zasper_py (now in Private mode) to build a new frontend around Jupyter. During the process I realized, Go is the ideal choice to rebuild the Jupyter project. Go has excellent support for REST, RPC, WS protocols. Concurrency and Performance are the areas where Go shines.

Go's Concurrency: Better suited for applications requiring both concurrency and parallelism, as it leverages multiple cores effectively. It's easier to handle blocking operations without freezing the system.

Python's Event Loop: Ideal for I/O-bound applications that need to handle a lot of asynchronous tasks without blocking. However, it struggles with CPU-bound tasks and lacks native parallelism unless additional worker threads are used.


## Architecture

Zasper backend is written in Gorilla. The ipython kernel is reused from Project Jupyter. Zasper backend communicates with ipython kernel via zeromq sockets.

<img class="blog-img" src="/static/images/zasper.drawio.svg">

(About Zeromq: ZeroMQ (also known as ØMQ, 0MQ, or zmq) looks like an embeddable networking library but acts like a concurrency framework. It gives 
you sockets that carry atomic messages across various transports like in-process, inter-process, TCP, and multicast.)

## Messaging

Zasper follows [the Wire Protocol](https://jupyter-client.readthedocs.io/en/stable/messaging.html) as established by Jupyter community. 

## How is it different ?

Jupyter server is reimplemented in Go. Every Jupyter Notebook runs with a Jupyter kernel (IPython kernel, IJulia kernel). The JupyterLab Server 
is responsible for managing the Jupyter kernels and serves as a broker between  Jupyter Notebook running in LabApp(frontend) and Jupyter Kernel. 
Zasper replaces Jupterlab by reimplementing most of the implementations. 

Jupterlab's  wire protocol is built using Tornado server and AsyncIO. Python's AsyncIO runs on a single core and gets problematic when scaling.

Zasper on the other hand uses Gorilla and coroutines that easily scales to multiple cores. Coroutines are light weight and work independently.

Even if you read the code, Zasper's implementation is much more easier to understand compared to Jupyterlab. You wouldn't get lost in Future and callbacks.

I will publish a separate blog post regarding this.




# Extensibilty

Zasper is designed with extensibility at its core. For example, if you want to create an internal, Google Colab-like interface within your private cloud and store your notebook files on Google Drive, this can be easily accomplished by modifying the content_manager module of Zasper. By implementing custom content readers and writers for Google Drive, you can seamlessly integrate it as a storage backend. 

Similarly, many organizations prefer using MinIO for object storage, and they can achieve a Google Colab-like experience by adapting the same approach.

# Future Roadmap

Data Scientists and AI Engineers spend most of their time running Notebooks on IDEs and hence need a robust ecosystem. Zasper aspires to be a full fledged IDE and the future development will be along making it more efficient by:

* Allowing custom data apps support rather than just Jupyter Notebooks.
* Easier integration with the existing tools.
* Zasper Hub for Self Hosted deployment in the cloud.


