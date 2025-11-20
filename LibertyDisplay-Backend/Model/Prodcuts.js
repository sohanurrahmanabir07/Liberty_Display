const mongoose=require('mongoose')

const Schema=mongoose.Schema

const ProductSchema=Schema({
    model:String,
    name:String,
    category:String,
    subCategory:String,
    description:String,
    imageUrl:[String],
    videoUrl:[String],
    parameter:[{ type: Object }],
    pdf: { type: Object }
},
{
    timestamps:true
}
)

const Products=mongoose.model('products',ProductSchema)

module.exports={
    Products
}