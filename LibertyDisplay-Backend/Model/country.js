const mongoose=require('mongoose')

const Schema=mongoose.Schema

const ContrySchema=Schema({
  name:String,
  region:String,
  subDomain:String,
  imageUrl:[String]
},

{
    timestamps:true
}
)

const Country=mongoose.model('country',ContrySchema)

module.exports={
    Country
}


// data=[

//   {
//     name:'Brazil',
//     subDomain:'eu.com',
//     region:'America'
//   },
//   {
//     name:'argentina',
//     subDomain:'eu.com',
//     region:'America'
//   },{
//     name:'Japan',
//     subDomain:'asia.com',
//     region:'Asia'
//   },{
//     name:'Sudan',
//     subDomain:'afr.com',
//     region:'Africa'
//   }
// ]