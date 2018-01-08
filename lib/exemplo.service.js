
const extend = require('./exemplo.extend')
const Schema = require('./exemplo.schema')


module.exports = {
    schema: Schema,
    methods: ['get', 'post', 'put', 'delete'],
    methodsAuth: ['get', 'post', 'put', 'delete'],
    //extends: extend,
    route: '/exemplo',
    erros: []
}
