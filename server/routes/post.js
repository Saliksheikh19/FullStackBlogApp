import express from "express";
import { createPost, updatePost, deletePost,  getPost , getAllPost} from "../controllers/post.js";

const postsRoutes = express.Router();

// get a post
postsRoutes.get('/:id', getPost);

// create post
postsRoutes.post('/', createPost);

// update post
postsRoutes.put('/:id', updatePost);

// delete post
postsRoutes.delete('/:id', deletePost);

postsRoutes.get('/', getAllPost);



export default postsRoutes