# electronjs-with-rust-performance

Performance test for Electron.js using:

-   Only JavaScript
-   Native _Add-Ons_ with Rust
-   WebAssembly with Rust

## Motivation

_Electron.js_ application's performance can degrade over time, specially when dealing with a lot of
data, intensive computations or just keep adding more and more features to an app. This repository
attempts to test possible performance gains using Rust in various flavors: Using native _Add-Ons_
with [neon](https://neon-bindings.com/) and using [WebAssembly](https://webassembly.org/).

This technically would turn a JavaScript application into a Native/Hybrid application and the
complexity will possibly be greater, but it allows to keep using web technologies to handle the UI
and handle _most_ of the business logic with Rust.

And although this can also be achieved with C++, Rust has better ergonomics and its technically
easier for new starters to jump into, as well as being
[safer](https://msrc-blog.microsoft.com/2019/07/22/why-rust-for-safe-systems-programming/). And
let's not forget that Rust is the
[most loved language for 5th year in a row](https://insights.stackoverflow.com/survey/2020#most-loved-dreaded-and-wanted).

## What is measured?

The "easiest" way to test for performance is to build a regular application for each use-case and
check differences in them. This experiment consists in three different applications: One built with
only JS, one with Native _Add-Ons_ using Rust and the last using WebAssembly, also with Rust.

Each application just calls a very big _SQLite_ Database and makes different queries and renders the
data. The idea is to make an application as it was a real thing and not a synthetic test.

The parameters to measure are:

-   Execution time
-   Memory consumed
-   Code complexity (a naïve check for number of lines)
-   Bundle size
-   Application size

## About the data

The data is about 192MB of imdb data (in a SQLite DB), which was gotten originally from
[kaggle](https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset) but the data used here
is a bit modified to adapt it into SQLite, but the information itself should be the exact same.

And _why imdb?_ you might ask. Well I first tried with a
[league of legends data set](https://www.kaggle.com/paololol/league-of-legends-ranked-matches), but
the data was incomplete/broken so I went with the second option (╯°□°）╯︵ ┻━┻)

![Database schema](./svg/db.svg)

## Repository structure

Note: **bold** items are the applications (which is the part that this projects measures). And the
_italic_ items are only meant for supporting the main code, could be considered a kind of
boilerplate or base for the _Electron.js_ applications.

-   **electron-js-app:** Application using only JavaScript Code
-   **electron-neon-app:** _Electron.js_ Application using the Native _Add-Ons_
-   **electron-webassembly-app:** Not implemented yet...
-   _rust-core:_ Code that is used in _Add-Ons_ and WebAssembly implementation for rust.
-   _neon-bindings:_ Native _Add-Ons_ (bindings) to be used in a _Node.js_ or _Electron.js_
    application.
-   _wasm_: Code that binds the _rust-core_ crate and exposing functions with WebAssembly, similar
    to _neon-bindings_

## Applications Architecture

### electron-js-app

![Electron.js Application](./svg/electron-js-app.svg)

### electron-neon-app

![Electron.js Application using native AddOns](./svg/electron-neon-app.svg)

### electron-wasm-app

![Electron.js Application using WebAssembly](./svg/electron-wasm-app.svg)

## How to run tests locally

TBD...

## Results

TBD...
