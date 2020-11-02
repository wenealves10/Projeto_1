const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')
const port = 8080

connection
    .authenticate()
    .then(() => {
        console.log('Conexão fei com sucesso!')
    }).catch((err) => {
        console.log('Aconteceu o erro ao se conectar com banco de dados: ' + err)
    });

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        res.render('index', {
            perguntas
        })
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: {questionID: id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta,
                    respostas
                })
            })
        } else {
            res.redirect('/')
        }
    })
})

app.post('/salvarpergunta', (req, res) => {
    let title = req.body.title
    let description = req.body.description
    Pergunta.create({
        title,
        description
    }).then(() => {
        res.redirect('/')
    })
})

app.post('/resposta', (req, res) => {
    let questionID = req.body.questionID
    let body = req.body.body
    Resposta.create({
        questionID,
        body
    }).then(() => {
        res.redirect('/pergunta/' + req.body.questionID)
    })

})


app.listen(port, () => {
    console.log('Servidor rodando.....')
})
