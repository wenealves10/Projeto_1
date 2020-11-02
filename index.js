const express = require('express')
const app = express()
const port = 8080

const produtos = [
    {nome: 'Hamburger', preco: 20},
    {nome: 'Batata-Fritas', preco: 15},
    {nome: 'Sanduíche', preco: 25},
    {nome: 'Pizza de calabresa', preco: 45},
    {nome: 'Refrigerante coca-cola', preco: 6},
    {nome: 'Suco de laranja', preco: 10},
    {nome: 'Coxinha de frango', preco: 12},
    {nome: 'Pastel de queijo', preco: 14},
    {nome: 'Macarronada', preco: 27},
    {nome: 'Açaí', preco: 13},
]

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
        mostraHora: (horaCerta.getHours() >= 18 && horaCerta.getHours() <= 23) ? true : false,
        produtos,
    })
})

app.listen(port, () =>{
    console.log('Servidor rodando.....')
})
