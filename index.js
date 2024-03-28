const cards = require("./data/cards.js");
const express = require("express");
const cors = require("cors");
const id = require("nanoid");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
// middleware
app.use(cors());
app.use(bodyParser.json());

// API 1
app.get("/hello", (request, response, next) => {
  response.json({ msg: "Hello World" });
});

// API 2
// TODO: 1. Copy file cards.js from Next.js app into server project and import here.
//
app.get("/api/cards", (request, response, next) => {
  response.status(200).json({ cards });
});

// API 3
// TODO: 2. Make another API: /api/cards/:cardId -- SINGLE CARD
app.get("/api/cards/:cardId", (request, response) => {
  const cardId = request.params.cardId;
  const getCardId = cards.find((card) => card.id === cardId);
  getCardId
    ? response.status(200).json(getCardId)
    : response.status(404).json({ msg: "id not found" });
});

// app.post("/api/cards", (request, response) => {
//   const {
//     body: { front, back, image },
//   } = request;
//   response.status(201).json({ front });
// });

// TODO: create a new card with front, back, image and nanoid and generate id with it and push new card to cards.
// read about: delete and patch and http codes.
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

// 201 created
app.post("/api/cards", (request, response) => {
  const {
    body: { front, back, image },
  } = request;
  const newCard = { id, front, back, image };
  const cardWithNewCard = cards.push(newCard);
  response.status(201).json({ cards });
});

// TODO: Next lesson delete and patch.

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
