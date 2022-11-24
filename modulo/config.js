/**************************************************************************************************
 * Objetivo: Arquivo responsavel pela configuracao de variaveis constantes e mensagens do sistema
 * Autor: Marcelo Sanches
 * Data de criaçao: 23/11/2022
 * Versão: 1.0
****************************************************************************************************/

const MESSAGE_ERROR = {
    REQUIRED_FIELDS  : 'Existe campos obrigatório(s) que deve(m) ser enviado(s)!',
    INVALID_EMAIL : 'O e-mail informado não é válido!',
    CONTENT_TYPE : 'O cabeçalho da requisição não possui um content-type válido',
    EMPTY_BODY : 'O body da requisição deve haver conteúdo',
    NOT_FOUND_DB : 'Não foram encontrados registros no banco de dados',
    INTERNAL_ERROR_DB : 'Não foi possível realizar a operação com o Banco de Dados',
    REQUIRED_ID : 'O ID do registro é obrigatório neste tipo de requisição'

}

const MESSAGE_SUCCESS = {
    INSERT_ITEM : 'Item criado com sucesso no banco de dados',
    UPDATE_ITEM : 'Item atualizado com sucesso no banco de dados',
    DELETE_ITEM : 'Item deletado com sucesso no banco de dados'
}

module.exports = {
MESSAGE_ERROR,
MESSAGE_SUCCESS
}