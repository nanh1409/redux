import mongoose from "mongoose";
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    id: Number,
    question: String,
    options: [{
        id: String,
        text: String,
    }],
    answer: String,
    trueAnswer: String
})

const Blog = model('Blog', blogSchema);

module.exports = Blog;