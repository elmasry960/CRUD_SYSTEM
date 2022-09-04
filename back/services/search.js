const Router = require('express').Router()
const q = require('../databases/dpConnection')

Router.post('/searchName' , (req , res)=>{
    q.execute(`select * from products where name like '%${req.body.name}%'` , (err , result)=>{
        res.json({message : 'search' ,user : result})
        console.log({user : result})
    })
})


module.exports=Router