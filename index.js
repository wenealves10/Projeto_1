require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')
const axios = require('axios')
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
    let email = req.body.email
    if(title && description && email){
        Pergunta.create({
            title,
            description,
            email
        }).then(() => {
            res.redirect('/')
        })
    }else{
        res.redirect('/')
    }
   
})

app.post('/resposta', (req, res) => {
    let questionID = req.body.questionID
    let body = req.body.body
    let email = req.body.email
    if(body != ''){
        Resposta.create({
            questionID,
            body
        }).then(() => {
            axios({
                method: 'post',
                url: `http://${process.env.HOST_NAME}/email`,
                data: {
                  email: email,
                  id: questionID
                }
              }).then(resp => console.log(resp.data))
              .catch(err => console.log('erro'))
            res.redirect('/pergunta/' + req.body.questionID)
        })
    }else{
        res.redirect('/pergunta/' + req.body.questionID)
    }
   
})


app.listen(port, () => {
    console.log('Servidor rodando.....')
})
