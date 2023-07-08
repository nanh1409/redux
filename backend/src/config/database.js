import mongoose from "mongoose";
import Blog from "../model/Blog";

const databaseConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connect to MongoDB successfully")
    }).catch(err => {
        console.log(err)
    })
}

// const question3 = new Blog({
//     id: 1,
//     question: "This luggage is quite similar to ........",
//     options: [
//         { id: 'A', text: 'that one' },
//         { id: 'B', text: 'those' },
//         { id: 'C', text: 'in additional' },
//         { id: 'D', text: 'that' }],
//     answer: null,
//     trueAnswer: "A",
// })

// question3.save()

module.exports = databaseConnect;