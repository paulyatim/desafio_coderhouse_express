const Contenedor = require('./Contenedor');
const express = require('express')
const productos = new Contenedor('productos.txt'); 
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`El servidor corre en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor: ${error}`));

app.get('/productos', async (req, res) => {
    const prods = await productos.getAll()
    res.send(prods);
})

app.get('/productoRandom', async (req, res) => {
    const prods = await productos.getAll()
    let randomProd = prods[Math.floor(Math.random()*prods.length)];
    res.send(randomProd);
})