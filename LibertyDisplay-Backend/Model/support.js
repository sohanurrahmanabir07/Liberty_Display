const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SupportSchema = Schema({
    name:String,
    phone:String,
    type:String,
    email:String,
    description:String,
    subject:String
},
    {
        timestamps: true
    }
)

const Supports = mongoose.model('supports', SupportSchema)

module.exports = {
    Supports
}