// IMPORTS
const express = require("express");
const cors = require("cors");
const nanoid = require("nanoid").nanoid;
const morgan = require("morgan");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
require("dotenv").config();
//PRISMA
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// DATA
let cards = require("../data/cards.js");

// Middleware as callback function
const validateCardId = function (request, response, next) {
  console.log("Using Middleware ValidateCardId");
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

// Classic pattern for REST API creation
// GET /api/levels -- ALL LEVELS
// GET /api/levels/:id -- ONE LEVEL
// POST /api/levels -- CREATE
// PUT/PATCH /api/levels/:id -- UPDATE
// DELETE /api/levels/:id -- DELETE by id

// API 1 | GET hello world
app.get("/hello", (request, response, next) => {
  response.json({ msg: "Hello World" });
});

// API 2 | GET cards
// 1. Copy file cards.js from Next.js app into server project and import here.
//  GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
app.get("/api/cards", (request, response, next) => {
  response.status(200).json({ cards });
});

// API 3
// 2. Make another API: /api/cards/:cardId -- SINGLE CARD
//
app.get("/api/cards/:cardId", validateCardId, (request, response) => {
  // const cardId = request.params.cardId;
  const {
    params: { cardId },
  } = request;
  const getCardId = cards.find((card) => card.id === cardId);
  getCardId
    ? response.status(200).json(getCardId)
    : response.status(404).json({ msg: "id not found" });
});

// Example POST
// app.post("/api/cards", (request, response) => {
//   const {
//     body: { front, back, image },
//   } = request;
//   response.status(201).json({ front });
// });

// how to do fetch with post and json.
// fetch syntax

// fetch('https://example.com/api/data', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     key1: 'value1',
//     key2: 'value2'
//   })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));

// 3. Create a new card with front, back, image and nanoid and generate id with it and push new card to cards.
// read about: delete and patch and http codes.
// 201 created | POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.

// import prisma client
// /api/cards -> /api/:subLevelId/cards
// req.params.subLevelId

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

//Create new level
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

//Get question
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

//get 1 Level
app.get("/api/levels/:levelId", async (request, response) => {
  const {
    params: { levelId },
  } = request;

  const getLevel = await prisma.level.findUnique({
    where: { id: Number(levelId) },
  });
  response.status(200).json({ getLevel });
});

// GET all levels
app.get("/api/levels", async (request, response) => {
  const getAllLevels = await prisma.level.findMany();
  response.status(200).json({ getAllLevels });
});

// -practice prisma GET.
// -sublevel with questions and answers. Try it!
//
//get subLevel
TODO: app.get("/api/sublevels/:sublevelId", async (request, response) => {
  const {
    params: { sublevelId },
  } = request;

  const getSublevel = await prisma.subLevel.findUnique({
    where: { id: Number(sublevelId) },
    include: {
      question: { include: { answers: true } },
    },
  });
  response.status(200).json({ getSublevel });
});

// EXPRESS
// app.post("/api/cards", (request, response) => {
//   const { body } = request;
//   const newCard = { ...body, id: nanoid() };
//   cards.push(newCard); // prisma.create...
//   response.status(201).json({ newCard });
// });

// PATCH method applies partial modifications to a resource send only data to be modified.
app.patch("/api/cards/:cardId", validateCardId, (request, response) => {
  // const {params: {cardId}, body} = request;
  const {
    params: { cardId },
    body,
  } = request;
  if (body.front || body.back || body.image) {
    cards = cards.map((card) =>
      card.id === cardId
        ? {
            ...card,
            ...body,
          }
        : card
    );
    response.status(200).json({ cards });
  } else {
    response.status(400).json({ msg: "Please enter the correct data" });
  }
});

// PUT method replaces all current representations of the target resource with the request payload.
// For example: Need to send no-modified data and modified data in the body.
// TODO: Validation for params | update DELETE and PATCH with validation | unified card.id === cardId function and convert it to middleware function
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

// HOMEWORK 29th March
// Validation for params | update DELETE and PATCH with validation | unified card.id === cardId function and convert it to middleware function
// check PUT and PATCH (check difference) and write additional PUT endpoint
