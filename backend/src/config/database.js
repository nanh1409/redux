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

module.exports = databaseConnect;