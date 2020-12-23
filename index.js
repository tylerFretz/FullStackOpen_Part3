const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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
  res.json(phonebook)
})


app.get('/info', (req, res) => {
    let info = `<p>Phonebook has info for ${phonebook.length} people</p>`
    info += new Date()
    res.send(info)
})


app.get('/api/phonebook/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = phonebook.find(contact => contact.id === id)

    contact 
        ? res.json(contact)
        : res.status(404).end()
})


app.delete('/api/phonebook/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(contact => contact.id !== id)

    res.status(204).end()
})


app.post('/api/phonebook', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
      console.log("name or number missing 2");
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    const uniqueName = phonebook.some(c => c.name === body.name)

    if (uniqueName) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const contact = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    phonebook = phonebook.concat(contact)

    res.json(contact)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 



//npx json-server --port 3001 --watch db.json