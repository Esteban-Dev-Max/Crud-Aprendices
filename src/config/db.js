require("dotenv").config({ quiet: true })

let prisma = null

/**
 * Crea el cliente de Prisma solo cuando existe DATABASE_URL.
 * Así el servidor puede arrancar sin base de datos configurada.
 */
const obtenerPrisma = () => {
    const url = process.env.DATABASE_URL?.trim()

    if (!url) {
        return null
    }

    if (!prisma) {
        const { PrismaPg } = require("@prisma/adapter-pg")
        const { PrismaClient } = require("@prisma/client")

        const adaptador = new PrismaPg({ connectionString: url })
        prisma = new PrismaClient({ adapter: adaptador })
    }

    return prisma
}

/**
 * Verifica la conexión a PostgreSQL con una consulta simple.
 * Si no hay DATABASE_URL, informa el modo simulado sin fallar.
 */
const verificarConexion = async () => {
    const cliente = obtenerPrisma()

    if (!cliente) {
        return {
            estado: "not_configured",
            mensaje: "DATABASE_URL no está definida; conexión simulada.",
        }
    }

    await cliente.$queryRaw`SELECT 1`

    return {
        estado: "connected",
        mensaje: "Conexión a PostgreSQL verificada.",
    }
}

module.exports = { obtenerPrisma, verificarConexion }
