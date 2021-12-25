
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { Base, Drive } = require('deta');
const Post = Base('post')
const app = express()
app.use(bodyParser.json({
    limit: '500mb'
  }));

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true
  }));
  app.use(express.json());
  app.use(cors())


app.get('/', (req, res) => res.redirect("https://blog.mundrawala.ml"))

app.post('/post', async (req, res) => {
    var token = req.get('token')
    if (token === 'mUrtAzA11mUnIrA22') {
        const { title, content,tags } = req.body;
        const date = new Date().getDate() + "-" + (parseInt(new Date().getMonth())+1).toString() + "-" + new Date().getFullYear();
        const toCreate = { title, date, content,tags }
        const key = title.replace(' ', '-').toLowerCase();;
        const insertedPost = await Post.put(toCreate, key)
        res.status(201).json(insertedPost);
    }
    else {
        res.status(401).json({ "error": "Unauthorized" });
    }
})

app.get('/posts', async (req, res) => {
    var token = req.get('token')
    if (token === 'mUrtAzA11mUnIrA22') {
        const posts = await Post.fetch()
        res.status(200).json(posts);
    }
    else {
        res.status(401).json({ "error": "Unauthorized" });
    }
})

app.get('/post/:title', async (req, res) => {
    var token = req.get('token')
    if (token === 'mUrtAzA11mUnIrA22') {
        const { title } = req.params;
        const post = await Post.get(title)
        res.status(200).json(post);
    }
    else {
        res.status(401).json({ "error": "Unauthorized" });
    }
})



// export 'app'
module.exports = app
