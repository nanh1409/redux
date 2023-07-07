import express from "express";
import questionController from "../controllers/questionController";

let router = express.Router()

let webRoutes = (app) => {
    router.get('/', questionController.test);
    router.get('/test', questionController.handleGetAllQuestions)
    router.get('/api/questions', questionController.getBlog)

    return app.use("/", router);
}

module.exports = webRoutes;