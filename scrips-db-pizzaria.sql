-- Active: 1670437710359@@127.0.0.1@3306

## Criar o Banco de dados create database db_pizzaria;

use db_pizzaria;

drop table tbl_pizza;

################################
#Criando a tabela de cliente_contato
create table
    tbl_cliente_contato(
        id int not null auto_increment primary key,
        nome varchar(100) not null,
        email varchar(256) not null,
        tipo_mensagem boolean,
        mensagem text not null,
        telefone varchar(25),
        celular varchar(25) not null,
        unique index(id)
    );

################################
#Criando a tabela de funcionario
create table
    tbl_funcionario(
        id int not null auto_increment primary key,
        nome varchar(100) not null,
        rg varchar(25),
        cpf varchar(25),
        telefone varchar(25),
        email varchar(256) not null,
        senha varchar(100) not null,
        unique index(id)
    );

################################
#Criando a tabela de fabricante da bebida
create table
    tbl_fabricante (
        id int not null auto_increment primary key,
        nome varchar(50) not null,
        telefone varchar(20),
        email varchar(256),
        unique index(id)
    );

################################
#Criando a tabela tipo_bebida
create table
    tbl_tipo_bebida (
        id int not null auto_increment primary key,
        tipo varchar(45) not null,
        unique index(id)
    );

################################
#Criando a tabela tipo_pizza
create table
    tbl_tipo_pizza (
        id int not null auto_increment primary key,
        tipo varchar(20) not null,
        unique index(id)
    );

################################
#Criando a tabela categoria
create table
    tbl_categoria (
        id int not null auto_increment primary key,
        categoria varchar(45) not null,
        unique index(id)
    );

################################
#Criando a tabela de pizza
create table
    tbl_pizza(
        id int not null auto_increment primary key,
        nome varchar(45) not null,
        preco varchar(20) not null,
        imagem varchar(256) not null,
        desconto decimal,
        likes int,
        descricao text,
        id_categoria int not null,
        #atributo para receber a FK
        constraint FK_categoria_pizza #Um nome para FK
        foreign key (id_categoria) #Identifica quem sera a FK
        references tbl_categoria(id),
        #De onde virá a PK
        id_tipo_pizza int not null,
        #atributo para receber a FK
        constraint FK_tipo_pizza_pizza #Um nome para FK
        foreign key (id_tipo_pizza) #Identifica quem sera a FK
        references tbl_tipo_pizza(id),
        #De onde virá a PK
        unique index(id)
    );

################################
#Criando a tabela de bebida
create table
    tbl_bebida (
        id int not null auto_increment primary key,
        nome varchar(45) not null,
        preco varchar(20) not null,
        descricao text,
        desconto decimal,
        imagem varchar(256),
        id_fabricante int not null,
        #atributo para receber a FK
        constraint FK_fabricante_bebida #Um nome para FK
        foreign key (id_fabricante) #Identifica quem sera a FK
        references tbl_fabricante(id),
        #De onde virá a PK
        id_tipo_bebida int not null,
        #atributo para receber a FK
        constraint FK_tipo_bebida_bebida #Um nome para FK
        foreign key (id_tipo_bebida) #Identifica quem sera a FK
        references tbl_tipo_bebida(id),
        #De onde virá a PK
        id_categoria int not null,
        #atributo para receber a FK
        constraint FK_categoria_bebida #Um nome para FK
        foreign key (id_categoria) #Identifica quem sera a FK
        references tbl_categoria(id),
        #De onde virá a PK
        unique index(id)
    );

select
    tbl_ator_diretor.nome as nomeAtor,
    tbl_ator_diretor.nome_artistico,
    tbl_nacionalidade.nome as nomeNacionalidade
from tbl_ator_diretor
    inner join tbl_ator_diretor_nacionalidade on tbl_ator_diretor.id = tbl_ator_diretor_nacionalidade.id_ator_diretor
    inner join tbl_nacionalidade on tbl_nacionalidade.id = tbl_ator_diretor_nacionalidade.id_nacionalidade;

###Inserts###
insert into
    tbl_fabricante (nome, telefone, email)
values (
        'Dell Valle',
        '11-97655125',
        'dellvalle@gmail.com'
    );