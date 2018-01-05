#!/usr/bin/env node

const program = require('commander')
const Grm = require('./grm.class')

require('./grm.functions')()

program
.version('1.0.3')
.description('** Comandos para auxilia na utilização das aplicações GRM **')
// .option('a, api', 'Cria nova API.')

program.on('--help', function(){
    console.log(
    `
    Usage: grm [options] [names] [args]

    Examples:
    
     $ grm api financeiro               Cria uma api com todos os arquivos possíveis.
     $ grm api financeiro --basic       Cria uma api com apenas os arquivos básicos.
     $ grm api financeiro --comment     Coloca a api como comentário no código.
     $ grm api financeiro --uncomment   Remove a api do comentário.
     $ grm api financeiro --remove      Remove a api do código.
     
     $ grm api financeiro --service     Cria arquivo service.
     $ grm api financeiro --schema      Cria arquivo schema.
     $ grm api financeiro --extend      Cria arquivo extend.
     $ grm api financeiro --scheduler   Cria arquivo scheduler.
     $ grm api financeiro --functions   Cria arquivo functions.
     $ grm api financeiro --data        Cria arquivo data.

     $ grm api financeiro,estoque       Cria duas ou mais api no mesmo comando.

     OBS: 
     Comentar ou remover uma api sempre será apenas dentro do código nos arquivos:
     grm.api-data.js, grm.api.scheduler.js e grm.api-service.js.
     Por segurança, para excluir os arquivos da api o usuário deverá deletar manualmente.
     `
    )
})

program.parse(process.argv)

// evita erro quando argv[4] (options) for nulo
process.argv[4] = process.argv[4] ? process.argv[4] : ""

var p = {
    cmd: process.argv[2].split(','),
    nameFiles: process.argv[3].split(','),
    options: process.argv[4].split(','),
}

var grm = new Grm(p)

grm.init()


// https://www.npmjs.com/package/commander
