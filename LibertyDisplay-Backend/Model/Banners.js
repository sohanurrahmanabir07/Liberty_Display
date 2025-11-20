const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BannerSchema = Schema({
    title: String,
    region:String,
    description: String,
    imageUrl: [String]

},

    {
        timestamps: true
    }
)

const Banners= mongoose.model('Banners', BannerSchema)

module.exports = {
    Banners
}