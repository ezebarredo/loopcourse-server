// IMPORTS
const express = require("express");
const cors = require("cors");
import LevelRouter from "./router/level";
import SublevelRouter from "./router/sublevel";
import AnswerRouter from "./router/answer";
import CardRouter from "./router/card";
import AuthRouter from "./auth/auth";

// const nanoid = require("nanoid").nanoid;
const morgan = require("morgan");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");

//SWAGGER
const fs = require("fs");
const path = require("path");
const YAML = require("js-yaml");
const swaggerDocument = YAML.load(
  fs.readFileSync(path.resolve(__dirname, "./swagger/swagger.yaml"), "utf8")
);
const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//PRISMA
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// DATA
let cards = require("../data/cards.js");

// Middleware as callback function
const validateCardId = function (request, response, next) {
  const {
    params: { cardId },
  } = request;
  const cardExists = cards.find(({ id }) => id === cardId);
  cardExists
    ? next()
    : response.status(400).json({ msg: "Card with this id doesn't exist." });
};

// Middleware - middleware functions that are loaded first are also executed first.
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());
app.use("/api/levels", LevelRouter);
app.use("/api/sublevels", SublevelRouter);
app.use("/api/answers", AnswerRouter);
app.use("/api/cards", CardRouter);
app.use("/api/user", AuthRouter);

// Classic pattern for REST API creation:

// GET /api/levels -- ALL LEVELS
// GET /api/levels/:id -- ONE LEVEL
// POST /api/levels -- CREATE
// PUT/PATCH /api/levels/:id -- UPDATE
// DELETE /api/levels/:id -- DELETE by id

// API 1 | GET hello world
app.get("/hello", (request, response, next) => {
  response.json({ msg: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
