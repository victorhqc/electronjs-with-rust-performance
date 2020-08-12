## Wasm bindings

For now, I'm not able to properly compile this project, as it depends on `sqlite3` native
dependency. I found
[this issue](https://stackoverflow.com/questions/58681067/how-can-i-link-a-rust-wasm-application-with-libpq-via-wasm-pack)
in stackoverflow that highlights a very similar scenario of what I'm facing.

```
error: linking with `rust-lld` failed: exit code: 1
  |
  = note: "rust-lld" "-flavor" "wasm" "--no-threads" "-z" "stack-size=1048576" "--stack-first" "--allow-undefined" "--fatal-warnings" "--no-demangle" "--export-dynamic" "--no-entry" "-L" ...

...

= note: rust-lld: error: unable to find library -lsqlite3

error: aborting due to previous error; 3 warnings emitted

error: could not compile `wasm`.

To learn more, run the command again with --verbose.
Error: Compiling your crate to WebAssembly failed
Caused by: failed to execute `cargo build`: exited with exit code: 101
  full command: "cargo" "build" "--lib" "--release" "--target" "wasm32-unknown-unknown"
```

## Development

```bash
wasm-pack build --target nodejs
```
