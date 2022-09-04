const Router = require('express').Router()
const q = require('../databases/dpConnection')

Router.get('/', (req , res)=>{
    q.execute(`select * from products`, (err,result)=>{
        res.json({message : 'success',user:result});
    })
})

module.exports=Router