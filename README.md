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

This technically would turn a JavaScript application into a Native/Hybrid application and the
complexity will possibly be greater, but it allows to keep using web technologies to handle the UI
and handle _most_ of the business logic with Rust.

And although this can also be achieved with C++, Rust has better ergonomics and its technically
easier for new starters to jump into, as well as being
[safer](https://msrc-blog.microsoft.com/2019/07/22/why-rust-for-safe-systems-programming/). And
let's not forget that Rust is the
[most loved language for 5th year in a row](https://insights.stackoverflow.com/survey/2020#most-loved-dreaded-and-wanted).

## About the data

The data is about 300MB of league of legends data (in a SQLite DB), which was gotten originally from
[kaggle](https://www.kaggle.com/paololol/league-of-legends-ranked-matches) but the data used here
is a bit modified to adapt it into SQLite, but the information itself should be the exact same.

And _why league of legends?_ you might ask. Well, I like the game, and might as well find some
interesting statistics now that I'm doing this (⌐■_■)

## Repository structure

Note: **bold** items are the applications (which is the part that this projects measures). And the
_italic_ items are only meant for supporting the main code, could be considered a kind of
boilerplate or base for the _Electron.js_ applications.

- **js-app:** TBD...
- **neon-app:** _Electron.js_ application using the Native _Add-Ons_
- **webassembly-app:** TBD...
- _rust-core:_ Code that is used in _Add-Ons_ and WebAssembly implementation for rust.
- _neon-bindings:_ Native _Add-Ons_ (bindings) to be used in a _Node.js_ or _Electron.js_
  application.

## How to run tests locally

TBD...

## Results

TBD...
