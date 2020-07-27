# electronjs-with-rust-performance

Performance test for Electron.js using:

- Only JavaScript
- Native _Add-Ons_ with Rust
- WebAssembly with Rust

## Motivation

_Electron.js_ application's performance can degrade over time, specially when dealing with a lot of
data or intensive computations. This repository attempts to test possible performance gains using
Rust in various flavors: Using native _Add-Ons_ using [neon](https://neon-bindings.com/) and using
[WebAssembly](https://webassembly.org/).

## Repository structure

- **rust-core:** Code that is used in _Add-Ons_ and WebAssembly implementation for rust.
- **js-app:** TBD...
- **neon-bindings:** TBD...
- **neon-app:** TBD...
- **webassembly-app:** TBD...

## How to run tests locally

TBD...

## Results

TBD...
