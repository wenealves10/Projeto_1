const express = require('express')
const app = express()
const port = 8080

app.set('view engine','ejs')

app.get('/',(req, res) => {
    let nome = 'Wene Alves'
    let lang = 'JavaScript'
    res.render('index',{
        nome,
        lang,
        musica: 'Drown lang'
    })
})

app.listen(port, () =>{
    console.log('Servidor rodando.....')
})
