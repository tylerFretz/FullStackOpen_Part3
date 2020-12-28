require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// Get total contacts info
app.get('/info', (req, res) => {
  Contact.find({})
})

// Get all
app.get('/api/phonebook', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts.map(contact => contact.toJSON()))
  })
})

// Get individual contact
app.get('/api/phonebook/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      contact
        ? res.json(contact)
        : res.status(404).end()
    })
    .catch(err => next(err))
})

// Delete contact
app.delete('/api/phonebook/:id', (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(err => next(err))
})

// Create new contact
app.post('/api/phonebook', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    // if (nameAlreadyExists(body.name)) {
    //   return res.status(400).json({
    //     error: 'Name already exists in the phonebook'
    //   })
    // }

    const contact = new Contact({
      name: body.name,
      number: body.number
    })

    contact.save().then(savedContact => {
      res.json(savedContact)
    })
})

// Update existing contact
app.put('/api/phonebook/:id', (req, res, next) => {
  const body = req.body

  const contact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(err)
}

app.use(errorHandler)

const nameAlreadyExists = name => {

  Contact.findOne({ name: name}, (obj, err) => {
    console.log(obj);
  })

  // console.log(contactsWithName);

  // if (contactsWithName !== null) {
  //   return true;
  // }
  // return false;
}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 

