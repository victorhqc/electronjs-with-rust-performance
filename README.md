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
-   Bundle size

## About the data

The data is about 192MB of imdb data (in a SQLite DB), which was gotten originally from
[kaggle](https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset) but the data used here
is a bit modified to adapt it into SQLite, but the information itself should be the exact same.

And _why imdb?_ you might ask. Well I first tried with a
[league of legends data set](https://www.kaggle.com/paololol/league-of-legends-ranked-matches), but
the data was incomplete/broken so I went with the second option (╯°□°）╯︵ ┻━┻)

![Database schema](./svg/db.svg)

## About the Applications

The applications built use the data previously described and make two different queries:

-   Search movies using a person's name.
-   Search movies where actresses are taller than the person being searched.

Both queries are simple enough and try to imitate a regular application usage. No pagination is
being used and no joins (this is suggested
[here](https://github.com/petehunt/rowrm#why-cant-i-do-joins)), which may be a bad idea in some
scenarios, but in this case I was trying to put some pressure in the application to get significant
enough numbers.

## Repository structure

Note: **bold** items are the applications (which is the part that this projects measures). And the
_italic_ items are only meant for supporting the main code, could be considered a kind of
boilerplate or base for the _Electron.js_ applications.

-   **electron-js-app:** Application using only JavaScript Code
-   **electron-neon-app:** _Electron.js_ Application using the Native _Add-Ons_
-   **electron-webassembly-app:** Not implemented yet. As I'm unable to compile the WebAssembly
    code, I'm having [this exact same issue](https://stackoverflow.com/questions/58681067/how-can-i-link-a-rust-wasm-application-with-libpq-via-wasm-pack)
-   _rust-core:_ Code that is used in _Add-Ons_ and WebAssembly implementation for rust.
-   _neon-bindings:_ Native _Add-Ons_ (bindings) to be used in a _Node.js_ or _Electron.js_
    application.
-   _wasm_: Code that binds the _rust-core_ crate and exposing functions with WebAssembly, similar
    to _neon-bindings_

## About the Results

Unfortunately, at this moment I'm unable to compile the WebAssembly that would had been used by
an Electron.js Application to add its results. I'm sure it will be possible at some point and I
can run the tests again.

The machine being used to run the tests is:

-   Intel i7-10750H
-   16GB RAM
-   Windows 10 Pro version 2004

## CPU Results

The two exact queries were performed in the JavaScript-Only Application as well as the one with
Native Add-Ons. And as a small bonus, the second application has a mode to run the same queries but
in a concurrent mode, so it uses all the available processors of the machine.

### Searching movies by person's name

![Movies with "brad"](./svg/movies-with-brad.svg)

| Native Add-Ons | Native Add-Ons - Concurrent | JavaScript |
| -------------- | --------------------------- | ---------- |
| 9890.4769      | 3657.691101                 | 10554.9466 |
| 9698.7768      | 3490.093799                 | 10647.4766 |
| 9691.6619      | 3575.6203                   | 10801.0811 |
| 9712.681001    | 3547.391                    | 10388.4984 |
| 10425.1839     | 3600.420301                 | 10812.1244 |
| 10219.8552     | 3526.210801                 | 10403.3364 |
| 9542.7405      | 3642.2527                   | 10478.2087 |
| 10040.4237     | 3561.4919                   | 10518.9474 |
| 9807.135701    | 3597.577101                 | 10679.4689 |
| 9750.325899    | 3504.295499                 | 10811.4593 |

|                | Native Add-Ons | Native Add-Ons - Concurrent | JavaScript  |
| -------------- | -------------- | --------------------------- | ----------- |
| Average        | 9877.92615     | 3570.30445                  | 10609.55478 |
| Std. Error     | 86.32669508    | 17.58467292                 | 52.13697275 |
| Median         | 9778.7308      | 3568.5561                   | 10601.2116  |
| Std. Deviation | 272.9889793    | 55.60761833                 | 164.8715842 |

![Movies with "liam"](./svg/movies-with-liam.svg)

| Native Add-Ons | Native Add-Ons - Concurrent | JavaScript |
| -------------- | --------------------------- | ---------- |
| 48355.1691     | 18280.4115                  | 53680.7399 |
| 50028.1172     | 18348.628                   | 54262.0856 |
| 48975.7689     | 17966.7487                  | 56517.916  |
| 48948.9278     | 18038.946                   | 54641.7099 |
| 48605.985      | 18042.8897                  | 57513.1606 |
| 48164.2627     | 18016.8138                  | 53404.0558 |
| 48459.2217     | 18102.3908                  | 52818.5657 |
| 49531.2646     | 18238.5962                  | 53046.4708 |
| 48232.757      | 17639.6456                  | 54260.6677 |
| 48219.9884     | 17926.4406                  | 53648.8698 |

|                | Native Add-Ons | Native Add-Ons - Concurrent | JavaScript  |
| -------------- | -------------- | --------------------------- | ----------- |
| Average        | 48752.14624    | 18060.15109                 | 54379.42418 |
| Std. Error     | 196.8411749    | 64.24030646                 | 479.309379  |
| Median         | 48532.60335    | 18040.91785                 | 53970.7038  |
| Std. Deviation | 622.4664501    | 203.145686                  | 1515.709341 |

### Searching movies that have taller actresses than the person being searched

![Taller than "brad"](./svg/taller-actress-than-brad.svg)

| Native Add-Ons | Native Add-Ons - Concurrent | JavaScript |
| -------------- | --------------------------- | ---------- |
| 6412.4916      | 2225.0276                   | 23008.5187 |
| 6342.671999    | 2228.833                    | 22901.4271 |
| 6220.8864      | 2075.388199                 | 22879.6727 |
| 6302.608       | 2293.710299                 | 22826.5945 |
| 6443.8645      | 2022.4796                   | 23573.8683 |
| 6215.3509      | 2262.663099                 | 22926.8324 |
| 6156.849999    | 2247.973699                 | 22805.2626 |
| 6270.728699    | 2018.042                    | 22841.7861 |
| 6213.1538      | 2025.265701                 | 23468.1868 |
| 6489.611099    | 2047.954399                 | 23488.6185 |

|                | Native Add-Ons | Native Add-Ons - Concurrent | JavaScript  |
| -------------- | -------------- | --------------------------- | ----------- |
| Average        | 6306.8217      | 2144.73376                  | 23072.07677 |
| Std. Error     | 35.43091788    | 36.47284476                 | 97.636869   |
| Median         | 6286.668349    | 2150.207899                 | 22914.12975 |
| Std. Deviation | 112.0424001    | 115.3372622                 | 308.7548897 |

![Taller than "liam"](./svg/taller-actress-than-liam.svg)

| Native Add-Ons | Native Add-Ons - Concurrent | JavaScript  |
| -------------- | --------------------------- | ----------- |
| 46918.7758     | 12495.4708                  | 134704.4015 |
| 46854.9269     | 12381.2896                  | 132002.4221 |
| 48377.2593     | 12663.7297                  | 132027.742  |
| 46810.4516     | 14748.7409                  | 131829.5005 |
| 46078.6811     | 12392.9971                  | 131275.9725 |
| 46166.6999     | 14852.0568                  | 132384.8728 |
| 46489.685      | 12561.9989                  | 132484.1969 |
| 46536.0451     | 14927.9749                  | 131810.9864 |
| 46547.2312     | 12506.2245                  | 132480.4566 |
| 46653.3388     | 12511.0832                  | 132395.8015 |

|                | Native Add-Ons | Native Add-Ons - Concurrent | JavaScript  |
| -------------- | -------------- | --------------------------- | ----------- |
| Average        | 46743.30947    | 13204.15664                 | 132339.6353 |
| Std. Error     | 201.2621772    | 358.7335495                 | 289.062178  |
| Median         | 46600.285      | 12536.54105                 | 132206.3074 |
| Std. Deviation | 636.4468869    | 1134.415089                 | 914.0948678 |

## RAM Results

Measuring RAM Usage may need some improvements and measure again. For now, only the RAM usage in
V8 is measured. This because I'm not sure how to _accurately measure it_.

The measurements were done by doing the same set of queries in the same order, so there could be a
somewhat similar scenario. Also, the data is captured as soon as the results of the queries is
gotten in the Node.js thread. Measurements in the Chromium side were not done, as it should be the
exact same.

![RAM Usage](./svg/ram-usage.svg)

## Disk Usage

The disk is measured by checking the size of the artifacts produced by: Bundling the code &
packaging the final binary for installation.

![Disk Usage](./svg/disk-usage.svg)

## Conclusions

Rust can be used to improve performance in an Electron.js Application. There are two possible ways
of doing that: Using Native Add-Ons or WebAssembly. The former has better support, as it uses the
same API that Node.js uses to consume its native dependencies, so using this method, it's possible
to use any native dependency and all the cores of a computer. The latter is newer and it's easier
to integrate in JavaScript as it can be used in Node.js or Chromium, but there's a lot of rough
edges as today (August 13th 2020). Using native sub-dependencies is tricky (I can't compile this
code for WebAssembly for example) and there's plan to have multi-thread support, but is not possible
today.

For a Node.js Application or if a native sub-dependency is used, then using Native Add-Ons is
recommended. If the implementation needs to be used in Chromium or if the crate has no
native sub-dependencies, then WebAssembly is fine.

The performance gains that is significant enough is in the CPU, both RAM & Disk usage didn't seem
to have huge benefits. However, in some cases V8 had almost the exact same performance as Rust,
unless the code is using a multi-threaded approach. In the best case scenario, Rust is able to have
a 10x performance gain (A whole order of magnitude!) and in the worst case it's a 3x performance
gain. Of course this numbers may change depending on specific implementation, but it's something
noticeable.

## How to run locally

1.  The first thing to do is to create the database itself. Go to [rust-core](./rust-core) and
    follow the instructions to initialize database.
1.  Run electron js application following instructions in [electron-js-app](./electron-js-app)
1.  Run neon application following instructions in [electron-neon-app](./electron-neon-app)

## Applications Architecture

### electron-js-app

![Electron.js Application](./svg/electron-js-app.svg)

### electron-neon-app

![Electron.js Application using native AddOns](./svg/electron-neon-app.svg)

### electron-wasm-app

![Electron.js Application using WebAssembly](./svg/electron-wasm-app.svg)

## References

Some research papers/articles/talks with different numbers & applications can be read in:

-   [https://sci-hub.tw/https://doi.org/10.1007/978-3-319-92375-8_15](https://sci-hub.tw/https://doi.org/10.1007/978-3-319-92375-8_15)
-   [https://mnt.io/2018/08/22/from-rust-to-beyond-the-webassembly-galaxy/](https://mnt.io/2018/08/22/from-rust-to-beyond-the-webassembly-galaxy/)
-   [https://www.youtube.com/watch?v=lLzFJenzBng](https://www.youtube.com/watch?v=lLzFJenzBng)
-   [http://www.sable.mcgill.ca/publications/techreports/2018-2/techrep.pdf](http://www.sable.mcgill.ca/publications/techreports/2018-2/techrep.pdf)

## Honorable mentions

There's an existing project that uses Web Technologies for the Front-End & Rust for the Back-End to
build Desktop Applications. It's worth checking it out:
[https://tauri.studio](https://tauri.studio)
