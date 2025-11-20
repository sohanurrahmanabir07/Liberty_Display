const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ServiceSchema = Schema({
    serviceName: String,
    description: String,
    svgCode: String
},
    {
        timestamps: true
    }
)

const Services = mongoose.model('services', ServiceSchema)

module.exports = {
    Services
}