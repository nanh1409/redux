import mongoose from "mongoose";
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    id: Number,
    question: String,
    options: {
        type: Map,
        of: String
    },
    answer: String,
    trueAnswer: String
})

const testSchema = new Schema({
    question: String,
    answer: String,
})

const Blog = model('Blog', blogSchema);
const Test = model('Test', testSchema);

module.exports = {
    Blog: Blog,
    Test: Test
};