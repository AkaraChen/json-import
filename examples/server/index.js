import json from './test.json' with { type: 'json' }
import express from 'express'

// db seeding
if (!json.posts) {
    json.posts = {}
}

const app = express()

app.get('/', (_req, res) => {
    res.json(json)
})

app.get('/post', (_req, res) => {
    res.json(json.posts)
})

app.get('/post/:id', (req, res) => {
    res.json(json.posts[req.params.id])
})

app.post('/post', (req, res) => {
    json.posts.push(req.body)
    res.json(req.body)
})

app.put('/post/:id', (req, res) => {
    json.posts[req.params.id] = req.body
    res.json(req.body)
})

app.delete('/post/:id', (req, res) => {
    json.posts.splice(req.params.id, 1)
    res.json(req.body)
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
