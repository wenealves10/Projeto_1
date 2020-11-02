const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const port = 8080

connection
    .authenticate()
    .then(() => {
      console.log('Conexão fei com sucesso!')      
    }).catch((err) => {
          console.log('Aconteceu o erro ao se conectar com banco de dados: '+ err)  
    });

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/',(req, res) => {
    Pergunta.findAll({raw: true, order: [
        ['id','DESC']
    ]}).then(perguntas =>{
        res.render('index',{
            perguntas
        })
    })
})

app.get('/perguntar', (req, res) =>{
    res.render('perguntar')
})

app.post('/salvarpergunta',(req, res) => {
   let title = req.body.title
   let description = req.body.description
   Pergunta.create({
       title,
       description
   }).then(() =>{
       res.redirect('/')
   })
})

app.get('/pergunta/:id', (req, res) =>{
    let id = req.params.id
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta =>{
        if(pergunta != undefined){
            res.render('pergunta',{
                pergunta
            })
        }else{
            res.redirect('/')
        } 
    })
})

app.listen(port, () =>{
    console.log('Servidor rodando.....')
})
