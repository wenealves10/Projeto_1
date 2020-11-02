const express = require('express')
const app = express()
const port = 8080

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req, res) => {
    res.render('index')
})

app.get('/perguntar', (req, res) =>{
    res.render('perguntar')
})

app.post('/salvarpergunta',(req, res) => {
    res.send('Enviado com sucesso!')
})

app.listen(port, () =>{
    console.log('Servidor rodando.....')
})
