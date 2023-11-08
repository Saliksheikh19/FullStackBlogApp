import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    desc: {
        type: String,
        max: 500
    },
    postImage: {
        type: String,
    },
    categories: {
        type: Array,
        default: [], 
        required:false
    },
    username: {
        type: String, 
        required:true
    }
},
    { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema)