require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGO_URL

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, match: /^[a-z ,.'-]{3,}$/i },
    number: { type: String, required: true, match: /\d{3}-\d{3}-\d{4}/ }
})


// Apply the uniqueValidator plugin to contactSchema.
contactSchema.plugin(uniqueValidator);

// Override the toJSON method to remove the _id and __v fields
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Contact', contactSchema)