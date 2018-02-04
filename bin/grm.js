#!/usr/bin/env node

const package = require('../package.json')
const program = require('commander')
// const Grm = require('./grm.class')
const GRM = require('./grm.class')

require('./grm.functions')()

program
.version(package.version)
.description('** Comandos para auxilia na utilização das aplicações GRM **')
// .option('a, api', 'Cria nova API.')

program.on('--help', function(){
    c.info(
    `
    Usage: grm [options] [names] [args]

    Examples:
    
     $ grm api financeiro               "Cria uma api com todos os arquivos possíveis"
     $ grm api financeiro --comment     "Coloca a api como comentário no código"
     $ grm api financeiro --uncomment   "Remove a api do comentário"
     $ grm api financeiro --remove      "Remove a api do código"
     $ grm api financeiro,estoque       "Cria duas ou mais api no mesmo comando"
     `
    )
})

program.parse(process.argv)

// evita erro quando argv[4] (options) for nulo
process.argv[3] = process.argv[3] || ""
process.argv[4] = process.argv[4] ? process.argv[4] : ""


var p = {
    cmd: process.argv[2],
    names: process.argv[3].split(','),
    options: process.argv[4],
    nameFileIsValid: true
}

const grm = new GRM(p)


/* Checa se existe nome de arquivo */
if(!!!p.names[0]) {
    p.nameFileIsValid = false
    c.error('Comando incompleto, digite grm --help para obter ajuda.')
    return
}


/* Checa se os nomes dos arquivos são válidos */
p.names.forEach(name => {
    if( name.exist('-') || name.exist('.') || name.exist(' ') ) {
        c.error(`O nome do arquivo "${name}" é inválido.`)
        p.nameFileIsValid = false
        return
    }
})


if(process.argv[2]) {
    if(p.nameFileIsValid) {
        switch(p.cmd) {
            case 'api': grm.init()
            break

            default: 
            c.error(`O Comando "${p.cmd}" é desconhecido.`)
        }
    }
} else {
    c.error('Comando incompleto, digite grm --help para obter ajuda.')
}






// https://www.npmjs.com/package/commander
