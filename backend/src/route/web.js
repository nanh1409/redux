import express from "express";
import questionController from "../controllers/questionController";

let router = express.Router()

let webRoutes = (app) => {
    router.get('/api/questions', questionController.getBlog)
    router.post('/api/answers', questionController.getAnswer)

    return app.use("/", router);
}

module.exports = webRoutes;