const contactsRouter = require('express').Router()
const Contact = require('../models/contact')

// Get total contacts info
contactsRouter.get('/info', (req, res) => {
  Contact.find({}).then(contacts => {
    res.send(`<p>There are ${contacts.length} contacts in the phonebook. ${new Date()}</p>`)
  })
})

// Get all contacts
contactsRouter.get('/', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts.map(contact => contact.toJSON()))
  })
})

// Get individual contact
contactsRouter.get('/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      contact
        ? res.json(contact)
        : res.status(404).end()
    })
    .catch(err => next(err))
})

// Delete contact
contactsRouter.delete('/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

// Create new contact
contactsRouter.post('/', (req, res, next) => {
  const body = req.body

  const contact = new Contact({
    name: body.name,
    number: body.number
  })

  contact.save()
    .then(savedContact => {
      res.json(savedContact)
    })
    .catch(err => next(err))
})

// Update existing contact
contactsRouter.put('/:id', (req, res, next) => {
  const { number } = req.body

  Contact.findByIdAndUpdate(req.params.id, { number }, { new: true, runValidators: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(err => next(err))
})

module.exports = contactsRouter