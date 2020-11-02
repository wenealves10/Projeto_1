const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('perguntas',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
},{})

Pergunta.sync({force: false}).then(() => {
    console.log('Tabela criada com sucesso!')
}).catch((err) => {
    console.log('Erro na criação da tabela!: '+err)
});

module.exports = Pergunta