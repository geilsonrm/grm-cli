
//const extend = require('./exemplo.extend')
const Schema = require('./exemplo.schema')


module.exports = {
    schema: Schema,
    methods: ['get', 'post', 'put', 'delete'],
    //extends: [ extend.resumo, extend.teste, extend.stopAgenda ],
    erros: []
}
