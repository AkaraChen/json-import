# json-import

> JUST A JOKE, DO NOT THINK ABOUT IT

Now you can use json as a store.

```js
import json from './test.json' with { type: 'json' }

if (!json.a) {
    json.a = [0]
}

json.a.push(json.a.at(-1) + 1)
```

```json
// test.json
{
    "a": [0, 1, 2, 3, 4, 5]
}
```

## Installation

```bash
# no, I haven't published it yet
# maybe it shouldn't be published
```

## Usage

At first, you need to configure babel.

See [.babelrc](./examples/simple/.babelrc)

Then, you can import json files.

```js
import json from './test.json' with { type: 'json' }

// you can do anything you want
json.b = {
    c: 1
}

json.a = [0]
json.a.splice(1, 0, 1)
```
