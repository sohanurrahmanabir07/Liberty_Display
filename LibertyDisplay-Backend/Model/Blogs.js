const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BlogsSchema = Schema({
    title: String,
    description: String,
    imageUrl: [String]

},

    {
        timestamps: true
    }
)

const Blogs= mongoose.model('blogs', BlogsSchema)

module.exports = {
    Blogs
}