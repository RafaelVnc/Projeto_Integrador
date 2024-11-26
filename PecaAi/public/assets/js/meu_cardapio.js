function carregarProdutos() {
    fetch('/cardapio/')  
        .then(resposta => resposta.json())  
        .then(json => carregaProdutosNaPagina(json))
        .catch(erro => console.error('Erro ao carregar produtos:', erro));  
}


function carregaProdutosNaPagina(json) {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; 

    for (let produto of json) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('row');

        itemDiv.innerHTML = `
        <h2 id="produto-nome">${produto.nome}</h2>
        <img src="${produto.fotoUrl}" alt="${produto.nome}" id="produto-img">
        <div class="checkbox-wrapper-8">
            <input class="tgl tgl-skewed" id="checkbox-${produto.id}" type="checkbox" ${produto.ativo ? 'checked' : ''}/>
            <label class="tgl-btn" data-tg-off="OFF" data-tg-on="ON" for="checkbox-${produto.id}"></label>
        </div>
        <p id="desc-breve">${produto.descricao}</p>
        <h3 id="produto-preco">R$ ${produto.preco.toFixed(2)}</h3>
        <button id="btn-editar-${produto.id}" class="btn-editar"><i class='bx bxs-edit'></i>Editar</button>
        <div class="btn-excluir">                       
            <button class="btn-open-excluir" id="btn-open-excluir-${produto.id}">Excluir produto</button>
        </div>
        `;

        grid.appendChild(itemDiv);

        const btn_editar = document.getElementById(`btn-editar-${produto.id}`);
        btn_editar.onclick = function () {
            abrirModalEdicao(produto); 
        };

        const btn_open_excluir = document.getElementById(`btn-open-excluir-${produto.id}`);
        btn_open_excluir.onclick = function () {
            modalConfirmDelete(produto.id); 
        };

        const checkbox = document.getElementById(`checkbox-${produto.id}`);
        checkbox.addEventListener('change', () => {
            atualizarDisponibilidade(produto.id, checkbox.checked, produto.nome);
        });
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
    document.getElementById('edit-produto-foto-preview').src = produto.fotoUrl;

    const btnSalvarEdit = document.getElementById('btn-salvar-edit');
    btnSalvarEdit.onclick = function(){
        atualizarProduto(produto.id);
    }
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

function modalConfirmDelete(id) {
    const modal_excluir = document.getElementById("modal-confirm-excluir");
    modal_excluir.style.display = "block";
    
    const btn_close_excluir = document.getElementById("btn-close-excluir");
    btn_close_excluir.onclick = function () {
        modal_excluir.style.display = "none";
    };
    
    const btn_cancelar = document.getElementById("btn-cancelar");
    btn_cancelar.onclick = function () {
        modal_excluir.style.display = "none";
    };

    const btn_excluir = document.getElementById("btn-excluir");
    
    // Remova qualquer ouvinte anterior e defina um novo
    btn_excluir.onclick = null; // Remove qualquer manipulador anterior
    btn_excluir.onclick = function () {
        deletarProduto(id);
    };
}

function deletarProduto(id){
    fetch(`/cardapio/deletarProduto/${id}`, {
        method: 'DELETE'
    })
        .then(res =>{
            if (res.ok){
                window.location.href = '/';
            }
        })
        .catch(erro => console.error('Erro ao deletar produto:', erro));  
}

function atualizarProduto(id) {
    const formData = new FormData(document.getElementById('form-edit'));
    
    fetch(`/cardapio/editarProduto/${id}`, {
        method: 'PATCH',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Item atualizado!") {
            location.reload();
        }
    })
    .catch(error => console.error('Erro ao atualizar produto:', error));
}

function atualizarDisponibilidade(id, ativo, nome) {
    fetch(`/cardapio/editDisponibilidade/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ativo })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Disponibilidade atualizada!") {
            alert(`Produto ${nome} atualizado para: ${ativo ? 'Ativo' : 'Inativo'}`);
        }
    })
    .catch(error => console.error('Erro ao atualizar disponibilidade:', error));
}

function inicializarPaginaMeuCardapio() {
    carregarProdutos();
    modalAddInteractions();
}

inicializarPaginaMeuCardapio();
