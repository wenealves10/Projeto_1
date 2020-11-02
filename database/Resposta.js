const Sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define('respostas',{
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false}).then(() => {
    console.log('Tabela criada com sucesso!')
}).catch((err) => {
    console.log('Erro na criação da tabela!: '+err)
});

module.exports = Resposta