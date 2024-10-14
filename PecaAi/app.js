const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const cardapioRoute = require('./routes/cardapio');
const indexRoute = require('./routes/index');

app.use(bodyParser.json());

app.use("/", indexRoute);
app.use("/cardapio", cardapioRoute);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;