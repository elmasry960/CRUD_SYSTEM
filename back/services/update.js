const Router = require('express').Router()
const q = require('../databases/dpConnection')


Router.put('/update' , (req , res)=>{
    const {id , name , price , description} = req.body
    q.execute(`update products set name='${name}' , price=${price} , description='${description}' where id=${id}`)
    res.json({message : 'success'});
})

module.exports=Router