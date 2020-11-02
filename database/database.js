const Sequelize = require('sequelize')
const connect = new Sequelize('sistemapr','root','04091605',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connect