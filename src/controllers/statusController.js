const { verificarConexion } = require("../config/db")

const TIEMPO_LIMITE_MS = 5000

const conTiempoLimite = (promesa, milisegundos) => {
    let temporizador

    const limite = new Promise((_, rechazar) => {
        temporizador = setTimeout(() => {
            rechazar(new Error("Tiempo de espera agotado al consultar la base de datos."))
        }, milisegundos)
    })

    return Promise.race([promesa, limite]).finally(() => clearTimeout(temporizador))
}

const estadoServidor = async (req, res) => {
    const respuesta = {
        status: "ok",
        server: "running",
        timestamp: new Date().toISOString(),
        uptime: Math.round(process.uptime()),
    }

    try {
        const database = await conTiempoLimite(verificarConexion(), TIEMPO_LIMITE_MS)

        return res.status(200).json({ ...respuesta, database })
    } catch (error) {
        return res.status(503).json({
            ...respuesta,
            status: "degraded",
            database: {
                estado: "disconnected",
                mensaje: error.message?.trim() || "No se pudo conectar a la base de datos.",
            },
        })
    }
}

module.exports = { estadoServidor }
