
const sequelize = { name: 'sequelize' }
const mongoose = { name: 'mongoose' }


sequelize.schema = require('./exemplo.sequelize')
mongoose.schema = require('./exemplo.mongoose')


module.exports = { sequelize, mongoose }