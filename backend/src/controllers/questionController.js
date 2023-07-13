import { Blog, Test } from "../model/Blog";

let getBlog = async (req, res) => {
    Blog.find()
        .then(questions => {
            res.json(questions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
}


let getAnswer = async (req, res) => {
    const data = req.body;
    try {
        const newAnswer = new Test({
            question: data.question,
            answer: data.answer,
        });
        await newAnswer.save()
        res.status(200).json({
            "message": "answer was insert successfull"
        })
    } catch (error) {
        console.error("Error inserting answer:", error);

        res.status(500).json({
            "message": "answer was not insert successfull"
        })
    }
}

module.exports = {
    getBlog: getBlog,
    getAnswer: getAnswer
}