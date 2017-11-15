# terminal-progress
[![terminal-progress](https://img.shields.io/npm/v/terminal-progress.svg)](https://www.npmjs.com/package/terminal-progress)
[![Build Status](https://travis-ci.org/articulate/terminal-progress.svg?branch=master)](https://travis-ci.org/articulate/terminal-progress)
[![Coverage Status](https://coveralls.io/repos/github/articulate/terminal-progress/badge.svg?branch=master)](https://coveralls.io/github/articulate/terminal-progress?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/articulate/projects/651997de-596c-4e76-8de1-aa4c91568f3a/badge)](https://nodesecurity.io/orgs/articulate/projects/651997de-596c-4e76-8de1-aa4c91568f3a)

![terminal-progress](https://user-images.githubusercontent.com/888052/32856962-53142736-ca14-11e7-8296-90160a1fa221.gif)

Cheap, functional, terminal progress bar.

Next time you're tempted to `process.stderr.write('.')` to track the progress of a script... don't.  Use this instead.

## API

```haskell
progress : Object -> Number -> ()
```

To setup your progress bar, execute the module with an optional options object:

```js
const progress = require('terminal-progress')({ /* options here */ })
```

The following options are accepted:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `label` | `String` | `'progress'` | custom label for your progress bar |
| `stream` | `stream.Writable` | `process.stderr` | output stream for progress |
| `width` | `Number` | `24` | max width of the bar |

The returned function accepts a progress ratio between `0` and `1`, and writes the progress bar to the output stream.  Each time it is called, it will overwrite the previous state of the progress to appear animated in the console.

```js
const progress = require('terminal-progress')()

progress(0.55)
//> progress: ⣠ [==============          ] 55%
```

See [`demo.js`](https://github.com/articulate/terminal-progress/blob/master/demo.js) for a slightly more complex example.
