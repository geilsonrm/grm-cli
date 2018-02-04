
var Sequelize = require('sequelize')


const schema = {
    name: { type: Sequelize.STRING, field: 'nome' },
    month: { type: Sequelize.INTEGER, field: 'month' },
    year: { type: Sequelize.INTEGER, field: 'year' }
}


module.exports = schema