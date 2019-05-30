const {obtenerPromedio, argv} = require('./datos')
const express = require('express')
const app = express()
 

if(argv._[0] == 'promedio'){
    texto = ("el promedio de " + argv.n  )
}else{
    console.log("Promedio no calculado")
}
app.get('/', function (req, res) {
  res.send(texto)
})
 
app.listen(3000)