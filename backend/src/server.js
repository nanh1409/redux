import express from "express";
import bodyParser from "body-parser";
import webRoutes from "./route/web";
import databaseConnect from "./config/database";

require('dotenv').config();

let app = express();

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

webRoutes(app)
databaseConnect()

let port = process.env.PORT;

app.listen(port, () => {
    console.log("Backend is running on port", port);
})