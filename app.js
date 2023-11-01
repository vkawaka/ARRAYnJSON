/**
 * objetivo: criação de uma API para manipular dados de Estados e Cidades.
 * data: 01/11
 * autora: Nathalia Kawakami
 * Versão: 1.0
 */

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//criando um objeto para manipular as requisições da API
const app = express()

//Função para majnipular as retrições da API
app.use((request, response, next) =>{
    //Permite especificar quem poderá acessar a API ('*' = liberar acesso público, 'IP' = liberar acesso apenas ao IP digitado)
    response.header('Access-Control-Allow-Origin', '*')
    //Permite especificar como a API será requisitada ('GET', 'POST', 'PUT', 'DELETE')
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    //Continuar processando outras coisas de dentro da API.
    next()
})

//EndPoints: pontos de paradas (como nossa API escuta os métodos)

//Configurar a forma que o endpoint será acionado. Assinatura do EndPoint
app.get('/estados/sigla', cors(), async function(request, response, next){
    let controleEstadosCidades = require('./module/percorrendo.js')
    let listaEstados = controleEstadosCidades.getListaDeEstados()

    response.json(listaEstados)
    response.status(200)
})

app.listen('8080', function(){
    console.log('API FUNCIONANDOOOO')
})