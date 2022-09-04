const Router = require('express').Router()
const q = require('../databases/dpConnection')


Router.delete('/delete' , (req , res)=>{
    const {id} = req.body
    console.log(req.body)
    q.execute(`delete from products where id=${id}`)
    res.json({message : 'success'});

    console.log("Deleted")

})

module.exports=Router