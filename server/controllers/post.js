import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

export const createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).send({
            status: 'Success',
            message: 'Post created successfully',
            post: newPost
        })
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            await post.updateOne({ $set: req.body });
            res.status(200).send({
                status: 'Success',
                message: 'Post updated'
            })
        } else {
            res.status(400).send({
                status: 'Failed',
                message: 'You are not the author of this post'
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            await post.deleteOne();
            res.status(200).send({
                status: 'Success',
                message: 'Post deleted'
            })
        } else {
            res.status(400).send({
                status: 'Failed',
                message: 'You are not the author of this post'
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}



export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).send({
            status: 'Success',
            message: 'here is the post',
            data: post
        })
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}

export const getAllPost = async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
    let posts;
    if(username){
        posts = await Post.find({username})
    }else if (catName){
        posts = await Post.find({categories:{
            $in:[catName]
        }})
    }else{
    posts= await Post.find()}
        
        res.status(200).send({
            status: 'Success',
            data: posts
        })
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}