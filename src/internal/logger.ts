/**
 * Logger class
 * Handles logging of messages for the application
 * @class
 */
class Logger {
  /**
   * Log a message
   * @param message - message to log
   * @param attributes - message attributes
   */
  info(message: string, attributes?: { [key: string]: any }) {
    const params = [
      message,
      attributes ? JSON.stringify(attributes, null, 2) : "",
    ]
    console.log("[INFO]", ...params)
  }

  /**
   * Log a warning message
   * @param message 
   * @param attributes 
   */
  warn(message: string, attributes?: { [key: string]: any }) {
    const params = [
      message,
      attributes ? JSON.stringify(attributes, null, 2) : "",
    ]
    console.warn("[WARN]", ...params
    )
  }

  /**
   * Log an error message
   * @param message 
   * @param attributes 
   */
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
