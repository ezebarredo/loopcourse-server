// IMPORTS
const express = require("express");
const cors = require("cors");
import LevelRouter from "./router/level";
import SublevelRouter from "./router/sublevel";
import AnswerRouter from "./router/answer";
import CardRouter from "./router/card";

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

//POST

// Create new card
app.post("/api/:subLevelId/cards", async (request, response) => {
  // request.params.subLevelId;
  const {
    params: { subLevelId },
    body,
  } = request;

  const newCard = await prisma.card.create({
    data: {
      subLevelId,
      ...body,
    },
    select: { id: true },
  });

  response.status(201).json({ newCard });
});

// Create new level
app.post("/api/levels", async (request, response) => {
  const { body } = request;

  const newLevel = await prisma.level.create({
    data: {
      title: body.title,
    },
  });
  response.status(201).json({ newLevel });
});

//Create new sublevel
app.post("/api/levels/:id/sub-levels", async (request, response) => {
  const {
    params: { id },
    body,
  } = request;
  //
  const newSubLevel = await prisma.subLevel.create({
    data: {
      // we always connect with IDs
      level: { connect: { id: Number(id) } },
      ...body,
    },
  });
  response.status(201).json({ newSubLevel });
});

// Create a new Question
app.post("/api/:subLevelId/questions", async (request, response) => {
  const {
    params: { subLevelId },
    body,
  } = request;

  const newQuestion = await prisma.question.create({
    data: {
      subLevelId: Number(subLevelId),
      ...body,
    },
  });
  response.status(201).json({ newQuestion });
});

// Create new answer
app.post("/api/:questionId/answers", async (request, response) => {
  const {
    params: { questionId },
    body,
  } = request;

  const newAnswer = await prisma.answer.create({
    data: {
      questionId: Number(questionId),
      ...body,
    },
  });
  response.status(201).json({ newAnswer });
});

//GET

// GET all levels
app.get("/api/levels", async (request, response) => {
  const getAllLevels = await prisma.level.findMany();
  response.status(200).json({ getAllLevels });
});

//Get 1 question with 3 answers
app.get("/api/sub-levels/:questionId", async (request, response) => {
  const {
    params: { questionId },
  } = request;

  const getQuestion = await prisma.question.findUnique({
    where: { id: Number(questionId) },
    include: {
      answers: true,
    },
  });
  response.status(200).json({ getQuestion });
});

//GET 1 subLevel with cards, questions and answers
app.get(
  "/api/levels/:levelId/sublevels/:sublevelId",
  async (request, response) => {
    const {
      params: { levelId, sublevelId },
    } = request;

    const getSublevel = await prisma.subLevel.findUnique({
      where: { id: Number(sublevelId) },
      include: {
        question: { include: { answers: true } },
        cards: true,
      },
    });
    response.status(200).json({ getSublevel });
  }
);

// GET all cards
app.get("/api/sublevels/:sublevelId/cards", async (request, response) => {
  const {
    params: { sublevelId },
  } = request;

  const getAllCards = await prisma.card.findMany();

  response.status(200).json({ getAllCards });
});

//GET 1 Card with cardId
app.get("/api/cards/:cardId", async (request, response) => {
  const {
    params: { cardId },
  } = request;

  const getCard = await prisma.card.findUnique({
    where: { id: Number(cardId) },
  });
  response.status(200).json({ getCard });
});

// GET all answers from a question ID
app.get("/api/questions/:questionId/answers", async (request, response) => {
  const getAllAnswers = await prisma.answer.findMany();
  response.status(200).json({ getAllAnswers });
});

// PATCH

// PATCH CARDS
app.patch("api/sublevels/:sublevelId/cards/", async (request, response) => {
  const {
    params: { subLevelId },
    body,
  } = request;

  const updateCards = body.cards.map((card) => {
    return prisma.card.update({
      where: { id: card.id },
      data: { front: card.front, back: card.back },
    });
  });

  const [
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
    card10,
  ] = await prisma.$transaction([...updateCards]);

  response.status(200).json({
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
    card10,
  });
});

// PUT method replaces all current representations of the target resource with the request payload.
// For example: Need to send no-modified data and modified data in the body.
// Validation for params | update DELETE and PATCH with validation | unified card.id === cardId function and convert it to middleware function

// check PUT and PATCH (check difference) and write additional PUT endpoint
app.put("/api/cards/:cardId", validateCardId, (request, response) => {
  const {
    params: { cardId },
    body,
  } = request;
  if (body.front || body.back || body.image) {
    cards = cards.map((card) => (card.id === cardId ? body : card));
    response.status(200).json({ cards });
  } else {
    response.status(400).json({ msg: "Please enter the correct data" });
  }
});

// DELETE
app.delete("/api/cards/:cardId", validateCardId, (request, response) => {
  const {
    params: { cardId },
  } = request;
  cards = cards.filter((card) => card.id !== cardId);
  response.status(200).json({ msg: "Card deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
