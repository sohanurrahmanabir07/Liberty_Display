const mongoose=require('mongoose')

const Schema=mongoose.Schema

const CertificateSchema=Schema({

    name:String,
    imageUrl:[String],
   
    
    
},
{
    timestamps:true
}
)

const Certificates=mongoose.model('certificates',CertificateSchema)

module.exports={
    Certificates
}