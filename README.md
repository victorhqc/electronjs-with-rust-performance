# electronjs-with-rust-performance

Performance test for Electron.js using:

- Only JavaScript
- Native _Add-Ons_ with Rust
- WebAssembly with Rust

## Motivation

_Electron.js_ application's performance can degrade over time, specially when dealing with a lot of
data, intensive computations or just keep adding more and more features to an app. This repository
attempts to test possible performance gains using Rust in various flavors: Using native _Add-Ons_
using [neon](https://neon-bindings.com/) and using [WebAssembly](https://webassembly.org/).

This technically would turn a JavaScript into a Native/Hybrid application and the complexity will
possibly be greater, but it allows to keep using the DOM & CSS to handle the UI and leave JS to
worry only about user events.

## Repository structure

Note: **bold** items are the applications (which is the part that this projects measures). And the
_italic_ items are only meant for supporting the main code, could be considered a kind of
boilerplate or base for the _Electron.js_ applications.

- _rust-core:_ Code that is used in _Add-Ons_ and WebAssembly implementation for rust.
- **js-app:** TBD...
- _neon-bindings:_ Native _Add-Ons_ (bindings) to be used in a _Node.js_ or _Electron.js_
  application.
- **neon-app:** _Electron.js_ application using the Native _Add-Ons_
- **webassembly-app:** TBD...

## How to run tests locally

TBD...

## Results

TBD...
