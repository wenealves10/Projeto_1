const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const port = 8080

connection
    .authenticate()
    .then(() => {
      console.log('Conexão fei com sucesso!')      
    }).catch((err) => {
          console.log('Aconteceu o erro ao se conectar com banco de dados '+ err)  
    });

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/',(req, res) => {
    res.render('index')
})

app.get('/perguntar', (req, res) =>{
    res.render('perguntar')
})

app.post('/salvarpergunta',(req, res) => {
    console.log(req.body)
    res.send('Enviado com sucesso!')
})

app.listen(port, () =>{
    console.log('Servidor rodando.....')
})
