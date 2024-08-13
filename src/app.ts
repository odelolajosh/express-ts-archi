import express from "express"
import { errorHandler } from "./http/middlewares/error"

const app = express()

app.get("/ping", (_req, res) => {
  res.send("pong")
})

// Add error handler middleware
app.use(errorHandler)

export default app
