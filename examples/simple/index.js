import json from './test.json' with { type: 'json' }

if (!json.a) {
    json.a = [0]
}

json.a.push(json.a.at(-1) + 1)
