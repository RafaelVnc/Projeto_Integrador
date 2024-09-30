const express = require('express');
const cardapioController = require('../controllers/cardapio.controller');

const router = express.Router();

router.post("/cadastrarProduto", cardapioController.addItem);
router.get("/", cardapioController.itens);
router.get("/:id", cardapioController.item);
router.patch("/:id", cardapioController.editItem);
router.delete("/:id", cardapioController.deleteItem);

module.exports = router;