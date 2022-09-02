const express = require('express')
const rota_produto = require('./routes/produtos_rotas')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/api/produtos', rota_produto);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})