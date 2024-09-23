const express = require('express');
const cardapioController = require('../controllers/cardapio.controller');

const router = express.Router();

router.post("/cadastrarProduto", cardapioController.addItem);

module.exports = router;