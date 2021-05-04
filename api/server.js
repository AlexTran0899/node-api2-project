const express = require('express');
const posts = require('./posts/posts-router');
const server = express();

server.use(express.json());
server.use('/api/posts', posts);
server.use('*', (req,res)=>{
    res.status(404).send(`
    <h1>can't find resource<h1>`)
})
module.exports = server;