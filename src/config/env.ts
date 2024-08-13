import { z } from "zod"
import dotenv from "dotenv"

const envSchema = z.object({
  PORT: z.string().refine(
    (port) => parseInt(port) > 0 && parseInt(port) < 65536,
    "Invalid port number"
  ),
  BASE_URL: z.string().refine(
    (url) => url.startsWith("http") || url.startsWith("https"),
    "Invalid URL format"
  ),
})

type Env = z.infer<typeof envSchema>

function loadSchema(): Env {
  dotenv.config()
  const result = envSchema.safeParse(process.env)
  if (!result.success) {
    throw new Error(result.error.errors.join(", "))
  }
  return result.data
}

export const env = loadSchema()
