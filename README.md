# # Projeto Integrador

Este projeto tem como objetivo sistematizar os conhecimentos adquiridos pelos alunos durante o desenvolvimento do segundo sementres, como também, oferecer vivência prática na aplicação das capacidades adquiridas.

Unidade curriculares integradas:
* Front-End 
* Back-End
* Banco de Dados

# Sumário
1. [Objetivo](#objetivo)
2. [Business do projeto](#business-do-projeto)
3. [Modulos](#modulos)
4. [Especificações dos Módulos](#especificações-dos-módulos)
5. [Requisitos Funcionais do Modulo 0](#requisitos-funcionais-do-modulo-0)
6. [Requisitos Funcionais do Modulo 1](#requisitos-funcionais-do-modulo-1)
7. [Requisitos Funcionais do Modulo 2](#requisitos-funcionais-do-modulo-2)
8. [Antes de começar a desenvolver](#antes-de-começar-a-desenvolver)
9. [Entrega do projeto](#entrega-do-projeto)
10. [Critérios de Avaliação](#critérios-de-avaliação)


# Objetivo
Desenvolver um projeto para informatizar e controlar uma Pizzaria.

# Business do projeto
A empresa solicitou a você que elaborasse uma tecnologia para automatizar seus principais processos de trabalho.

A empresa pretende entrar a fundo na divulgação de seus produtos através da tecnologia da informação. A nossa pizzaria está localizada na Av. Luis Carlos Berrini, nº 666.

Com o crescimento do mercado mundial pela internet hoje o Brasil tem bilhões de acessos a diversos sites de vendas por ano e milhões de produtos estão sendo comercializados com a população brasileira.

# Modulos
O projeto deverá ser desenvolvido em três grandes módulos, sendo eles:
* Modulo 0: “Projeção no Mercado”;
* Modulo 1: “CMS do site - Catalogo Eletrônico”;
* Modulo 2: "Publicação (deploy)"

# Especificações dos Módulos
## Modulo 0
O objetivo deste é divulgação da empresa no mercado, ou seja, você deverá criar o layout do site afim de promover as informações da empresa no mundo digital.

Deverá ser criado um Site obedecendo os padrões de desenvolvimento Web utilizando (HTML5, CSS3 e Java Script).

## Modulo 1
Este modulo deverá ser para criar um sistema de catalago eletronico de produtos, onde os funcionários da pizzaria consigam alimentar todas as informações que serão apresentadas no Web Site.

Neste módulo somente funcionários autorizados poderão ter acesso.

## Modulo 2
Este modulo tem objetivo de planejar a publicação (deploy) do site e sistema realizado, ou seja, colocar o que foi desenvolvido no ar.

# Requisitos Funcionais do Modulo 0
A criação do nome, logotipo, a escolhadas cores e tipografia fica a critério de cada equipe, porém, tem grande importância no projeto final.

O site deverá ser do tipo [one page](https://hubify.com.br/desenvolvimento/site-one-page-o-que-e-e-quais-as-suas-vantagens/) e com no mínimo 5 seções:

1. Apresentação (O foco é a pizza)
2. Promoção (pizzas que estão na promoção) 
3. Cardápio (3 partes, pizzas favoritas, todas as pizzas, bebidas)
4. Serviços (Serviços prestados pela pizzaria como delivery)
5. Contatos (formulário para o cliente deixar seu comentário e algumas informações da pizzaria)

## Observações:
* A seção de apresentação e promoção poderá ser unificada em uma única seção.
* Os seguintes dados devem ser inseridos no banco de dados:
    * Nome *
    * Telefone
    * Celular *
    * Email *
    * Sugestão/Críticas (opção para mensagem)
    * Mensagem *

>_*campo obrigatório_<br>
*Lembrando que o cliente poderá solicitar novas funcionalidades no decorrer do projeto.*

# Requisitos Funcionais do Modulo 1
O sistema deverá contar com uma área **administrativa** para que o dono do sistema consiga gerenciar o conteúdo da página inicial, chamado de [CMS](https://pt.semrush.com/blog/cms/), que tem por objetivo facilitar a gestão do conteúdo por parte da sua própria empresa.

## Gestão de Conteúdo do Site
* Deverá ser criado o CRUD (**C**reate, **R**ead, **U**pdate e **D**elete) dos CARDS já desenvolvidos na página inicial.
* Deverá ser criado toda a estrutura funcional para o banco dados do sistema, o projeto deverá ser baseado em uma estrutura relacional do banco de dados.
* Funcionalidades que devem ser implementadas:
    1. Dashboard
        * Administração de Produtos (CRUD completo)
        * Administração de Categorias; (CRUD)
        * Usuários. (CRUD)
        * Contatos. (Apenas listagem, Visualizar e Excluir)
    2. Autenticação (login) 
        * O sistema contará com uma área de autenticação (login), o dono do sistema deverá digitar a URL do site a palavra **“admin”** para entrar no dashboard.<br>
        `Ex: http://www.nomeprojeto.com.br/admin`
        * Ao digitar a palavra admin, automaticamente deverá abrir uma tela de autenticação, solicitando usuário e senha.
        * Caso a autenticação seja realizada com sucesso o sistema deverá redirecionar o usuário para o Dashboard do CMS.
        * Os formulários de cadastros deverão ser criados conforme a modelagem do banco de cada projeto.
        * O modulo de autenticação do projeto é obrigatório possuir a implementação de [JWT](https://www.devmedia.com.br/como-o-jwt-funciona/40265) (**J**SON **W**eb **T**oken) para garantir um melhor processo de segurança da aplicação.

# Requisitos Funcionais do Modulo 2
Banco de dados, back-end e front-end devem ser publicados em diferente plataformas. Sugestão de plataformas:
* Banco de dados: Microsoft Azure / AWS
* Back-end: Netfly / Vercel
* Front-end: Github pages / Firebase Hosting

Você deverá publicar o banco de dados, back-end e front-end, dessa maneira o sistema poderá ser acessado de qualquer lugar do mundo.

Poderá ser utilizado o a Microsoft Azure para o banco de dados, o netfly para o back-end e o github pages para o front-end. Porem a equipe tem total liberdade nessa escolha.

# Antes de começar a desenvolver
1. Faça um fork deste repositório;
2. Clone seu fork para o seu computador;
3. Faça as alterações na branch com o nome da equipe;
4. Crie uma pasta como o nome da equipe, onde ficará todos o projeto.

# Entrega do projeto
Para entregar o seu projeto você deverá criar um Pull Request deste repositório, que deverá conter:
- Projeto do banco de dados 
- Projeto do front-end 
- Projeto do back-end
- Arquivo README.md para cada um dos projetos, que deverá conter no mínimo:
    - Explicação do projeto;
    - Tecnologias utilizadas;
    - Links para os recursos, end-points, site, figma, notion, entre outros;
    - Screenshot ou imagens necessários para ter uma previa do projeto.

# Critérios de Avaliação
## Banco de dados
- [x] Deverá ser criado o modelo conceitual do projeto.
- [x] Deverá ser criado o modelo lógico do banco de dados.
- [x] Os scripts para criação do Banco de dados devem ser disponibilizados como um entregável do projeto.
- [x] A utilização de recursos como View, Procedures e Functions é uma boa prática que deve ser levado em consideração no processo de desenvolvimento do projeto.
- [x] O projeto deverá ser publicado.

## Front-end
- [x] Prototipou o site, no figma, conforme requisitos do cliente?
- [x] Criou o site seguinto o planejado?
- [x] O site é responsivo?
- [x] Os produtos são carregado no site dinamicamente?
- [x] O formulário está validando os campos?
- [x] O formulário faz o envio para o servidor back-end?
- [x] O site foi publicado?
- [x] Todas as telas do CMS foram prototipadas?
- [x] As telas foram criadas conforme planejado?
- [ ] A tela de produtos implementa todos os métodos HTTP (get, post, put e delete)?
- [ ] A tela de categorias implementa todos os métodos HTTP?
- [ ] A tela de usuários implementa todos os métodos HTTP?
- [ ] A tela de contados implementa os métodos HTTP get e delete?
- [x] A tela de login faz autenticação utilizando o JWT?
- [x] O CMS foi publicado?


## Back-end
- [x] Deverá ser criada toda a documentação dos EndPoints da API do projeto utilizando Swagger.
- [x] A estrutura do projeto deverá obedecer ao padrão de projeto MVC, para facilitar o processo de documentação e manutenção do projeto.
- [x] Todos os EndPoints deverão estar funcionando no PostMan para testes e validação.
- [x] O projeto deverá ser publicado.
      Obs: Apenas uma das APIs foram postaddas, que no caso foi a que apenas o dono do sistema tem acesso
---
# PROJETO PIZZARIA

<h1> Samuel Matos & Marcelo Sanches </h1>

Projeto construído durante as aulas de BackEnd e FrontEnd, no curso de Desenvolvimento de Sistemas do [SENAI Jandira](https://jandira.sp.senai.br/), com orientação do Prof. [Fernando Leonid](https://github.com/fernandoleonid) e o Prof. Marcel.


 **Tecnologias utilizadas:**

![tecnologias](https://skills.thijs.gg/icons?i=figma,vscode,nodejs,javascript,html,css,git,github,prisma,azure,mysql,netlify,express&theme=light)

<h2> Links do banco de dados: </h2>

[Modelo Conceitual](https://i.imgur.com/UBYzYTC.png)

[Modelo Lógico](https://i.imgur.com/MKs4oRQ.png)

[Link da documentação da API](https://app.swaggerhub.com/apis-docs/xanxes/pizzaria/1.0.0) 

<h2> Links do Front-End: </h2>

<a href="https://www.figma.com/file/hX5Rv8g9IL5lFkW4FxFwqv/pizzaria?node-id=0%3A1&t=lz6Kh4gfPFkG5yel-0">Figma</a>

<a href="https://xanxes.github.io/projeto_pizzaria_front/">Site</a>

> Para entrar no dashboard, um úsuario já está pré-cadastrado.
> E-mail: admin@admin.com
> senha: admin


