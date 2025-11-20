const mongoose=require('mongoose')

const Schema=mongoose.Schema

const LogoSchema=Schema({
  name:String,
  imageUrl:[String]
  
},

{
    timestamps:true
}
)

const Logo=mongoose.model('logos',LogoSchema)

module.exports={
    Logo
}