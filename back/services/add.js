const Router = require('express').Router()
const q = require('../databases/dpConnection')

Router.post('/addProduct', (req , res)=>{
    const {name , price , description} = req.body
    res.json({message : 'success'});
    q.execute(`INSERT INTO products (name , price , description ) values('${name}' , '${price}' , '${description}')`)

})

module.exports=Router