export class AppError {
  constructor(message, params = null, statusCode = 400) {
    if (params) this.param = params
    this.message = message
    this.statusCode = statusCode
  }
}

export const handleError = async (error) => {
  console.log(error)
  if (error instanceof AppError) throw error

  const message = error.message.toString() ?? error.toString()
  const statusCode = error.statusCode ?? 400

  throw new AppError(message, error?.param, statusCode)
}
