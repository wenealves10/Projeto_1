const express = require('express')
const app = express()
const port = 8080

app.set('view engine','ejs')

app.get('/',(req, res) => {
    let nome = 'Wene Alves'
    let lang = 'JavaScript'
    let mostraHora = false
    let horaCerta = new Date()
    res.render('index',{
        nome,
        lang,
        musica: 'Drown lang',
        mostraHora: (horaCerta.getHours() >= 18 && horaCerta.getHours() <= 23) ? true : false
    })
})

app.listen(port, () =>{
    console.log('Servidor rodando.....')
})
