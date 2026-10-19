//consolida las rutas
const { Router } = require("express")
//importar enrutadores de las entidades
const pruebaRouter = require("./pruebaRouter")
const autenticarRouter = require("./autenticarRouter")
const usuariosRouter = require("./usuariosRouter")
const statusRouter = require("./statusRouter")

const enrutador = Router()

//estado del servidor y de la base de datos
enrutador.use("/status", statusRouter)
//ruta de prueba
enrutador.use("/rutaPrueba", pruebaRouter)
//ruta de autenticación
enrutador.use("/autenticar", autenticarRouter)
enrutador.use("/listado", usuariosRouter)

module.exports = enrutador
