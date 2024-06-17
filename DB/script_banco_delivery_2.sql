create database delivery_2;

use delivery_2;

create table cliente (
id_cliente int primary key auto_increment,
nome varchar(255) not null,
endereco varchar(255) not null,
telefone varchar(20) not null,
email varchar(100) not null
);

SELECT * FROM cliente;

create table estabelecimento (
id_estabelecimento int  primary key auto_increment,
nome varchar(255) not null,
descricao text,
endereco varchar(255) not null,
telefone varchar(20) not null,
email varchar(100) not null
);

select * from estabelecimento;

create table pedido (
id_pedido int primary key auto_increment,
id_cliente int not null,
id_estabelecimento int not null,
status_pedido enum ('pendente', 'em_preparo', 'entregue', 'cancelado') NOT NULL DEFAULT 'pendente',
data_hora_pedido timestamp not null default current_timestamp,
foreign key (id_cliente) references cliente (id_cliente),
foreign key (id_estabelecimento) references estabelecimento (id_estabelecimento)
);

create table itens_cardapio (
id_item int primary key auto_increment,
id_estabelecimento int not null,
nome_item varchar(255) not null,
descricao_item text,
preco_item decimal(10,2) not null,
foreign key (id_estabelecimento) references estabelecimento (id_estabelecimento)
);

select * from itens_cardapio;


ALTER TABLE itens_cardapio
ADD COLUMN foto_item blob,
ADD COLUMN ativo_item tinyint NOT NULL DEFAULT 1;

create table pedidos_itens (
id_pedido int not null,
id_item int not null,
quantidade int not null,
primary key (id_pedido, id_item),
foreign key (id_pedido) references pedido (id_pedido),
foreign key (id_item) references itens_cardapio (id_item)
);

select * from pedidos_itens;

create table avaliacoes (
	id_avaliacao int primary key auto_increment,
    id_estabelecimento int not null,
    id_cliente int not null,
    avaliacao decimal(3,2),
    comentario text,
    data_avaliacao timestamp not null default current_timestamp,
    foreign key (id_estabelecimento) references estabelecimento (id_estabelecimento),
    foreign key (id_cliente) references cliente (id_cliente)
    );
    
    create table loginEstabelecimento (
    id int primary key auto_increment,
    email varchar(60) not null,
    senha varchar(30) not null
    );
    
    
select * from loginEstabelecimento;   

select * from loginCliente;


    create table loginCliente (
    id int primary key auto_increment,
    email varchar(60) not null,
    senha varchar(60) not null
    );
    
ALTER TABLE estabelecimento
ADD COLUMN id_login int,
ADD CONSTRAINT fk_estabelecimento_login
FOREIGN KEY (id_login) REFERENCES loginestabelecimento(id);

 
    
select * from avaliacoes;

select @@hostname;

select USER();

select DATABASE();

