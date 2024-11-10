const express = require('express');
const cardapioController = require('../controllers/cardapio.controller');
const multer = require('multer');

const router = express.Router();

const upload = multer({ dest: 'public/assets/img/uploads' });

router.post("/cadastrarProduto", upload.single('foto'), cardapioController.addItem);
router.get("/", cardapioController.itens); //"/cardapio/"
router.get("/:id", cardapioController.item);
router.patch("/editarProduto/:id", upload.single('foto'), cardapioController.editItem);
router.delete("/deletarProduto/:id", cardapioController.deleteItem);

module.exports = router;