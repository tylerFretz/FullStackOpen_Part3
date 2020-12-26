require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

morgan.token('body', (req) => JSON.stringify(req.body))

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let phonebook = [
  {
    "name": "John Barron",
    "number": "123-555-4567",
    "id": 1
  },
  {
    "name": "John Miller",
    "number": "321-555-7654",
    "id": 2
  },
  {
    "name": "Carolin Gallego",
    "number": "213-555-5467",
    "id": 3
  },
  {
    "name": "David Dennison",
    "number": "231-555-6754",
    "id": 4
  },
]


const generateId = () => {
    const maxId = phonebook.length > 0
        ? Math.max(...phonebook.map(n => n.id))
        : 0
    return maxId + Math.floor(Math.random() * 1000)
}   


app.get('/api/phonebook', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
})


app.get('/info', (req, res) => {
    let info = `<p>Phonebook has info for ${phonebook.length} people</p>`
    info += new Date()
    res.send(info)
})


app.get('/api/phonebook/:id', (req, res) => {
  Contact.findById(req.params.id)
  .then(contact => {
    if (contact) {
      res.json(contact)
    }
    else {
      res.status(404).end()
    }
  })
  .catch(err => {
    console.log(err)
    res.status(400).send({ error: 'malformatted id' })
  })
})


app.delete('/api/phonebook/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(contact => contact.id !== id)

    res.status(204).end()
})


app.post('/api/phonebook', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    // const uniqueName = Contact.find( { name: { $eq: body.name } } )

    // console.log(uniqueName);

    // if (uniqueName.length > 0) {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const contact = new Contact({
      name: body.name,
      number: body.number
    })

    contact.save().then(savedContact => {
      res.json(savedContact)
    })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 

