require("dotenv").config({ quiet: true })

const app = require("./app")

const PUERTO = Number(process.env.PORT || process.env.PUERTO || 3000)

const servidor = app.listen(PUERTO, () => {
    console.log(`Servidor Express: http://localhost:${PUERTO}`)
    console.log(`Estado de la API: http://localhost:${PUERTO}/api/status`)
})

const cerrar = (senal) => {
    console.log(`\n${senal} recibido. Cerrando servidor...`)
    servidor.close(() => process.exit(0))
}

process.on("SIGINT", () => cerrar("SIGINT"))
process.on("SIGTERM", () => cerrar("SIGTERM"))
