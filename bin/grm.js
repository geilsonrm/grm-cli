#!/usr/bin/env node

const program = require('commander')
const Grm = require('./grm.class')

require('./grm.functions')()

// Usage: pizza [options]

program
// .version('0.1.12')
.description('** Auxilia na utilização da API GRM Express **')
.option('a, api', 'Cria nova API completa (todos os arquivos).')
.option('s, schema', 'Cria um novo arquivo dentro da API.')
.option('v, service', 'Cria um novo arquivo dentro da API.')
.option('e, extend', 'Cria um novo arquivo dentro da API.')
.option('f, functions', 'Cria um novo arquivo dentro da API.')
.option('h, scheduler', 'Cria um novo arquivo dentro da API.')
.option('d, data', 'Cria um novo arquivo dentro da API.')
.option('n, new', 'Cria novo projeto.')

program.on('--help', function(){
    console.log(
    `
    Examples:
    
     $custom-help --help
     $custom-help --help
    `
    )
})

program.parse(process.argv)

// const commando = process.argv[2]
// const cpFile = require('cp-file')

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
