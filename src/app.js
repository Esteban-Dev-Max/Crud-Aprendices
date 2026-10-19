require("dotenv").config({ quiet: true })
const express = require("express")
//importar enrutador
const enrutador = require("./routes")
const { estadoServidor } = require("./controllers/statusController")
const manejadorErrores = require("./middleware/manejadorErrores")
const app = express()

//middleware formatear datos del body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ruta raíz: estado del servidor en JSON
app.get("/", estadoServidor)

//ruta por defecto para toda la app
app.use("/api", enrutador)

//ruta no encontrada
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    })
})

//manejador central de errores
app.use(manejadorErrores)

module.exports = app
