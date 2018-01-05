
//const extend = require('./n1.extend')
const Schema = require('./n1.schema')


module.exports = {
    schema: Schema,
    methods: ['get', 'post', 'put', 'delete'],
    methodsAuth: ['get', 'post', 'put', 'delete'],
    //extends: [ extend.resumo, extend.teste, extend.stopAgenda ],
    route: '/n1',
    erros: []
}
