const { Router } = require("express")
const { estadoServidor } = require("../controllers/statusController")

const enrutador = Router()

enrutador.get("/", estadoServidor)

module.exports = enrutador
