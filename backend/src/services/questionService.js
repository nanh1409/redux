import Blog from "../model/Blog"

let getAllQuestions = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let questions = '';
            questions = await Blog.find()
            console.log(questions)

            resolve(questions);
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    getAllQuestions: getAllQuestions,
}