const models = require('../models');

//Post novo item do cardápio
function addItem(req, res){
    const item = {
        nome:req.body.nome,
        descricao:req.body.descricao,
        preco:req.body.preco,
        fotoUrl: req.file ? `/assets/img/uploads/${req.file.filename}` : null,
        ativo:true,
        categoryId:req.body.categoria
    }

    models.itemCardapio.create(item).then(result => {
        res.status(201);
        if (res.statusCode === 201) {
            res.redirect('/');
        }
    }).catch(error => {
        res.status(500).json({
            mensagem: "Algo deu errado!",
            erro: error
        });
    });
}

//Get apenas um item
function item(req, res){
    const id = req.params.id;

    models.itemCardapio.findByPk(id).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Algo deu errado!"
        })
    });
}

//Get de todos os itens do cardápio
function itens(req, res) {
    models.itemCardapio.findAll().then(result => {
        const produtos = result.map(produto => ({
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            fotoUrl: produto.fotoUrl, 
            ativo: produto.ativo
        }));

        res.status(200).json(produtos);
    }).catch(error => {
        res.status(500).json({
            message: "Algo deu errado!"
        });
    });
}

//Update de um item do cardápio
function editItem(req, res){
    const id = req.params.id;
    const updatedItem = {
        nome:req.body.nome,
        descricao:req.body.descricao,
        preco:req.body.preco,
        fotoUrl:req.body.foto
    }

    models.itemCardapio.update(updatedItem, {where: {id:id}}).then(result =>{
        res.status(200).json({
            message: "Item atualizado!",
            item: updatedItem
        });
    }).catch(error => {
        res.status(500).json({
            message: "Algo deu errado!",
            error: error
        });
    });
}

//Delete de um item do cardápio
function deleteItem(req, res){
    const id = req.params.id;

    models.itemCardapio.destroy({where:{id:id}}).then(result => {
        if(result) {
            res.status(200).json({
                message: "Item deletado com sucesso!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Algo deu errado!",
            error: error
        });
    });
}

module.exports= {
    addItem: addItem, 
    item: item,
    itens: itens, 
    editItem: editItem,
    deleteItem: deleteItem
}