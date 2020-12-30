const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (err.errors.number && err.errors.number.kind === 'regexp') {
    return res.status(400).send({ error: 'Number must be in this format: (123) 123-1234' })
  }
  else if(err.errors.name && err.errors.name.kind === 'unique') {
    return res.status(400).send({ error: 'Name must be unique' })
  }
  else if(err.errors.name && err.errors.name.kind === 'regexp') {
    return res.status(400).send({ error: 'Name must be at least 3 characters long and not have numbers' })
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}