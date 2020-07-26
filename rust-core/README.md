# Rust Core

This is the base code that can be reused in the _Add-On_ and _WebAssembly_ implementation. It has
the details for the database & basic utilities that can be reused across projects.

## Requirements

- Rust >= 1.45
- SQLite >= 3
- Diesel CLI (More info [here](https://diesel.rs/guides/getting-started/))

## Setup

Duplicate the `.env.example` file and name it `.env`. It contains the environment variables needed
to run the project.

```bash
diesel migration run

sqlite3 lol_matches.db
```
