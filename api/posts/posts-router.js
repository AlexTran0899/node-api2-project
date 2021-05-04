const router = require('express').Router()
const Posts = require('./posts-model')

router.get('/', (req,res)=>{
    Posts.find()
    .then(posts =>{
        res.status(200).json(posts);
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message: 'The posts information could not be retrieved'
        })
    })
})

router.get('/:id', (req,res)=>{
    Posts.findById(req.params.id)
    .then(post =>{
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({message:`post number ${req.params.id} not found`});
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'The posts information could not be retrieved'
        })
    })
})

router.get('/:id/comments', (req,res)=>{
    Posts.findCommentById(req.params.id)
    .then(post =>{
        if(post){
            res.status(200).json(post.text);
        } else {
            res.status(404).json({message:`post comment with id of ${req.params.id} not found`});
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message:'The posts information could not be retrieved'
        })
    })
})

router.post('/', (req,res)=>{
    if(!req.body.title || !req.body.contents){
        res.status(400).json({message: `please provide both title and contents`});
    } else {
        Posts.insert(req.body)
        .then(post =>{
            res.status(201).json(post);
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                message:'There was an error while saving the post to the database'
            })
        })
    }
})

router.put('/:id', (req,res)=>{
    if(!req.body.title || !req.body.contents){
        res.status(400).json({message: `please provide both title and contents`});
    } else {
        Posts.update(req.params.id, req.body)
        .then(post =>{
            if(post){
                res.status(200).json(`${post} changes`);
            } else {
                res.status(404).json({message: `user with id ${req.params.id} not found`});
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message:'The post information could not be modified'
            })
        })
    }
})

router.delete('/:id', (req,res)=>{
    Posts.remove(req.params.id)
    .then(post =>{
        if(post) {
            res.status(200).json({message: `the user with id of ${req.params.id} have been removed`});
        } else {
            res.status(404).json({message: `the user with id of ${req.params.id} doesn't exist`});
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message:'The post could not be removed'
        })
    })
})

module.exports = router;