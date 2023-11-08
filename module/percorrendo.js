var estadosInfos = require('./estadosInfos')

var estados_cidades = estadosInfos.estadosCidades
const arrayEstado = estados_cidades.estados

const getListaDeEstados = function(){
    const uf = []
    const quantidade = arrayEstado.length
    let status = false

    arrayEstado.forEach(function(a){
        uf.push(a.sigla)
        status = true
    })
    const jsonEstado = {}
    jsonEstado.uf = uf
    jsonEstado.quantidade = quantidade

    if(status)
        return jsonEstado
    else
        return false 
}

const getDadosEstado = function(nomeEstado){
    const jsonInfos = {}
    let status = false

    arrayEstado.forEach(function(estado) {
        if(estado.sigla == nomeEstado.toUpperCase()){
            jsonInfos.uf = estado.sigla
            jsonInfos.descricao = estado.nome
            jsonInfos.capital = estado.capital
            jsonInfos.regiao = estado.regiao

            status = true
        }
    })
    if(status)
    return jsonInfos
else
    return false 

}

const getCapitalEstado = function(nomeEstado){
    const jsonInfos = {}
    let status = false
    arrayEstado.forEach(function(estado) {
        if(estado.sigla == nomeEstado.toUpperCase()){
            jsonInfos.uf = estado.sigla
            jsonInfos.descricao = estado.nome
            jsonInfos.capital = estado.capital

            status = true
        }
    })
    if(status)
        return jsonInfos
    else
        return false 
}

const getEstadosRegiao = function(regiaoEstado){
    const jsonInfos = {}
    const arrayEstados = []
    let status = false
    arrayEstado.forEach(function(estado) {
        if(estado.regiao.toUpperCase() == regiaoEstado.toUpperCase()){
            const jsonEstado = {}
            jsonEstado.uf = estado.sigla
            jsonEstado.descricao = estado.nome
            arrayEstados.push(jsonEstado)
            status = true
        }
    })
    jsonInfos.regiao = regiaoEstado
    jsonInfos.estados = arrayEstados
    
    if(status)
        return jsonInfos
    else
        return false
}

const getCapitalPais = function(){
    const jsonCapital = {}
    const arrayCapitais = []
    let status = false

    arrayEstado.forEach(function(capital) {
        if(capital.capital_pais != undefined){

        const jsonInfosCapital = {}
        jsonInfosCapital.capital_atual = capital.capital_pais.capital
        jsonInfosCapital.uf = capital.sigla
        jsonInfosCapital.descricao = capital.nome
        jsonInfosCapital.capital = capital.capital
        jsonInfosCapital.regiao = capital.regiao
        jsonInfosCapital.capital_pais_ano_inicio = capital.capital_pais.ano_inicio
        jsonInfosCapital.capital_pais_ano_termino = capital.capital_pais.ano_fim

        arrayCapitais.push(jsonInfosCapital)

        status = true
        }
    })
    jsonCapital.capitais = arrayCapitais
   
    if(status)
        return jsonCapital
    else
        return false
}

const getCidades = function(estadoS){
    const jsonCidades = {}
    const arrayCidades = []
    let status = false

    arrayEstado.forEach(function(estado){

        if(estado.sigla == estadoS.toUpperCase()){
            jsonCidades.uf = estado.sigla
            jsonCidades.descricao = estado.nome
            jsonCidades.quantidade_cidades = estado.cidades.length

            estado.cidades.forEach(function(cidade){
                arrayCidades.push(cidade.nome)
            })
            jsonCidades.cidades = arrayCidades

            status = true
        }
    })

    if(status)
        return jsonCidades
    else
        return false
}
// console.log(getListaDeEstados())
// console.log(getDadosEstado('SP'))
// console.log(getCapitalEstado('AM'))
// console.log(getEstadosRegiao('norte'))
// console.log(getCapitalPais())
// console.log(getCidades('SP'))

module.exports = {
    getListaDeEstados,
    getDadosEstado,
    getCapitalEstado,
    getEstadosRegiao,
    getCapitalPais,
    getCidades
}