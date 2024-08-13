export class Logger {
  info(message: string, attributes?: { [key: string]: any }) {
    const params = [
      message,
      attributes ? JSON.stringify(attributes, null, 2) : "",
    ]
    console.log("[INFO]", ...params)
  }

  error(message: string, attributes?: { [key: string]: any }) {
    const params = [
      message,
      attributes ? JSON.stringify(attributes, null, 2) : "",
    ]
    console.error("[ERROR]", ...params)
  }
}

const logger = new Logger()

export { logger }