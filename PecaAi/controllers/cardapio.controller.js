const models = require('../models');

function addItem(req, res){
    const item = {
        nome:req.body.nome,
        descricao:req.body.descricao,
        preco:req.body.preco,
        fotoUrl:req.body.foto,
        ativo:true,
        categoryId:req.body.categoria
    }

    models.itemCardapio.create(item).then(result => {
        res.status(201).json({
            mensagem: "Item criado com sucesso.",
            item: result
        });
    }).catch(error => {
        res.status(500).json({
            mensagem: "Algo deu errado!",
            erro: error
        });
    });
}

module.exports= {
    addItem: addItem
}