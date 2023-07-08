import mongoose from "mongoose";
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: [{
        type: Map,
        of: String
    }],
    answer: {
        type: String,
        required: false,
    },
    trueAnswer: {
        type: String,
        required: true,
    }
})

const Blog = model('Blog', blogSchema);

module.exports = Blog;