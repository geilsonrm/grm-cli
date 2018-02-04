
const extend = require('./exemplo.service.extend')
const scheduler = require('./exemplo.scheduler')
const schema = require('./exemplo.schema')
const data = require('./exemplo.data')


module.exports = {

    scheduler,
    extend,
    route: '/exemplo',    
    methodsAuth: ['get', 'post', 'put', 'delete'],
    methods: ['get', 'post', 'put', 'delete'],
    db: {
        data,
        name: 'exemplo',
        schema: schema.sequelize    
    }
    
}
