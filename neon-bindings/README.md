# neon-bindings

Neon bindings (Native Add-On) for electron application

## Repository structure

This repository contains mixed content from JavaScript and Rust. The Rust code is placed under
`native` and the JavaScript code is under `src`.

## How building works

Building the project happens in two steps. First Rust needs to get compiled, this will output a
file called `index.node` which is a native binary which can talk with V8 and contains all the Rust
code, including DB migrations! Then Typescript gets transpiled into JavaScript and the
_package.json_ gets copied alongside both artifacts so `npm` can consume it as a regular dependency.
