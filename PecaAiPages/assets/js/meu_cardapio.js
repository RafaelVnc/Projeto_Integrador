function carregarProdutos() {
    fetch('./assets/js/produtos/produtos.json')
        .then(resposta => resposta.json())
        .then(json => carregaProdutosNaPagina(json));
}

function carregaProdutosNaPagina(json) {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; 

    for (let produto of json) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('row');

        itemDiv.innerHTML = `
        <h2 id="produto-nome">${produto.nome}</h2>
        <img src="${produto.foto}" alt="${produto.nome}" id="produto-img">
        <div class="checkbox-wrapper-8">
            <input class="tgl tgl-skewed" id="${produto.nome}" type="checkbox" ${produto.ativo ? 'checked' : ''}/>
            <label class="tgl-btn" data-tg-off="OFF" data-tg-on="ON" for="${produto.nome}"></label>
        </div>
        <p id="desc-breve">${produto.descricao}</p>
        <h3 id="produto-preco">R$ ${produto.preco.toFixed(2)}</h3>
        <button id="editar-${produto.id}" class="btn-editar"><i class='bx bxs-edit'></i>Editar</button>
        `;

        grid.appendChild(itemDiv);

        const btn_editar = document.getElementById(`editar-${produto.id}`);
        btn_editar.onclick = function () {
            abrirModalEdicao(produto); 
        };
    }
}

function abrirModalEdicao(produto) {
    const modal_edit = document.getElementById("modal-edit");
    modal_edit.style.display = "block";
    
    const btn_close_edit = document.getElementById("btn-close-edit");
    btn_close_edit.onclick = function () {
        modal_edit.style.display = "none";
    };

    document.getElementById('edit-produto-nome').value = produto.nome;
    document.getElementById('edit-produto-preco').value = produto.preco;
    document.getElementById('edit-produto-desc').value = produto.descricao;
}

function modalAddInteractions() {
    const btn_adicionar = document.getElementById("btn-add");
    const modal_add = document.getElementById("modal-add");
    const btn_close_add = document.getElementById("btn-close-add");

    btn_adicionar.onclick = function () {
        modal_add.style.display = "block";
    };

    btn_close_add.onclick = function () {
        modal_add.style.display = "none";
        document.getElementById("form-add").reset();
    };
}

function inicializarPaginaMeuCardapio() {
    carregarProdutos();
    modalAddInteractions();
}

inicializarPaginaMeuCardapio();
