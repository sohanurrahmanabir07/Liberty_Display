const mongoose=require('mongoose')

const Schema=mongoose.Schema

const AdminSchema=Schema({
  name:String,
  email:String,
  password:{
    type:String,
    minLength:[6,'Password Too Short'],
  },
  employee_id:String,
  role:{
    type:String,
    default:"subAdmin"
  },
  status:{
    type:Boolean,
    default:false
  }
},

{
    timestamps:true
}
)

const Admin=mongoose.model('admins',AdminSchema)

module.exports={
    Admin
}