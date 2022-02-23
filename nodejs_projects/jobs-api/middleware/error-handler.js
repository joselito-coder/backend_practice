const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    // Set defaults
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong, try again later",
  }

  if (err.name === 'ValidationError') {
    // console.log(err.errors)
    console.log(Object.values(err.errors))
    customError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
    customError.statusCode = 400

  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate Value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = 400
  }

  if (err.name == 'CastError') {
    customError.msg = `No item with Id ${err.value} Found`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
