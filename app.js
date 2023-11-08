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

//Função para manipular as retrições da API
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
//Retorna a listade todos os estados.
app.get('/estados/sigla', cors(), async function(request, response, next){
    let controleEstadosCidades = require('./module/percorrendo.js')
    let listaEstados = controleEstadosCidades.getListaDeEstados()

    if(listaEstados){
        response.json(listaEstados)
        response.status(200)
    }else{
        response.status(404)
    }
})

//Retorna dados do estado filtrando pela sigla.
app.get('/estado/sigla/:uf', cors(), async function(request, response, next){
    let siglaEstado = request.params.uf
    let controleDadosCapital = require('./module/percorrendo.js')
    let dadosCapital = controleDadosCapital.getDadosEstado(siglaEstado)

    if(dadosCapital){
        response.json(dadosEstado)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro: 'Item não encontrado'})
    }
})

//Retorna a capital do estado filtrando pela sigla do estado.
app.get('/capital/estado', cors(), async function(request, response, next){
    let siglaEstado = request.query.uf
    let controleDadosEstado = require('./module/percorrendo.js')
    let dadosEstado = controleDadosEstado.getCapitalEstado(siglaEstado)

    if(dadosEstado){
        response.json(dadosEstado)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro: 'Item não encontrado'})
    }
})

//Retorna os estados de acordo com a região
app.get('/regiao/estados', cors(), async function(request, response, next){
    let regiaoEstados = request.query.regiao
    let controleDadosRegiao = require('./module/percorrendo.js')
    let estadosRegiao = controleDadosRegiao.getEstadosRegiao(regiaoEstados)

    if(estadosRegiao){
        response.json(estadosRegiao)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro: 'Item não encontrado'})
    }
})

//Retorna todas as capitais do pais
app.get('/brasil/capitais', cors(), async function(request, response, next){
    let controleDadosCapitais = require('./module/percorrendo.js')
    let dadosCapitais = controleDadosCapitais.getCapitalPais()

    if(dadosCapitais){
        response.json(dadosCapitais)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro: 'Item não encontrado'})
    }
})

//Retorna todas as cidades de um estado a partir da sigla
app.get('/estado/cidades', cors(), async function(request, response, next){
    let siglaEstado = request.query.uf
    let controleCidades = require('./module/percorrendo.js')
    let dadosCidades = controleCidades.getCidades(siglaEstado)

    if(dadosCidades){
        response.json(dadosCidades)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro: 'Item não encontrado'})
    }
})


app.listen('8080', function(){
    console.log('API FUNCIONANDOOOO')
})