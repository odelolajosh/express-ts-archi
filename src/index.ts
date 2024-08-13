import { Server } from "http"
import { logger } from "@/internal/logger"
import { database } from "@/internal/database"
import { env } from "@/config/env"
import app from "./app"

let server: Server

database.connect().then(() => {
  logger.info("Database connected")
  server = app.listen(env.PORT, () => {
    logger.info(`Server is running on http://localhost:${env.PORT}`)
  })
})

const errorHandler = (error: Error) => {
  logger.error(error.message, { stack: error.stack })
  if (server) {
    server.close()
  }
}

process.on("unhandledRejection", errorHandler)
process.on("uncaughtException", errorHandler)

process.on("SIGTERM", () => {
  logger.info("SIGTERM received")
  if (server) {
    server.close()
  }
})
