# Rust Core

This is the base code that can be reused in the _Add-On_ and _WebAssembly_ implementation. It has
the details for the database & basic utilities that can be reused across projects.

## Requirements

-   Rust >= 1.45
-   SQLite >= 3
-   Diesel CLI (More info [here](https://diesel.rs/guides/getting-started/))

## Setup

Duplicate the `.env.example` file and name it `.env`. It contains the environment variables needed
to run the project. Then un-compress `data.zip` and place it in the current directory. Make sure
that there's no nested path in the uncompressed path and the `.csv` files are in the top-most
directory of `data`.

For Linux an Mac OSX

```bash
./scripts/init.sh
```

For Windows

```powershell
.\scripts\init.bat
```

## Specifications

### Database model

Here's the Entity Relation model for the database.

![Database Entity Relation Diagram](../svg/db.svg)
