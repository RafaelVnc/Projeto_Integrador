const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cardapioRoute = require('./routes/cardapio');

app.use(bodyParser.json());

app.use("/cardapio", cardapioRoute);

module.exports = app;