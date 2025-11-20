const { client } = require("../Redis/redis")

const checkCache=async(req,res,next)=>{
    const key=req.path
    const data=await client.get(key)
    if(data){
        return res.send({
            data:JSON.parse(data)
        })
        
        
    }
    next() 


}

module.exports={
    checkCache
}