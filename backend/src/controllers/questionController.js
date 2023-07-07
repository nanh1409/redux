import Blog from "../model/Blog";
import questionService from "../services/questionService";

let handleGetAllQuestions = async (req, res) => {
    let questions = await questionService.getAllQuestions()
    // res.send("Testt")

    res.send(questions)
}

let test = (req, res) => {
    res.send("Test")
}

let getBlog = async (req, res) => {
    Blog.find()
        .then(blogs => {
            res.json(blogs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
}

module.exports = {
    handleGetAllQuestions: handleGetAllQuestions,
    test: test,
    getBlog: getBlog,
}