const express = require("express")
const app = express()
var cors = require('cors')
const q = require('./databases/dpConnection')

app.use(express.json())
app.use(cors())
app.use(require("./services/allProduct"))
app.use(require("./services/add"))
app.use(require("./services/update"))
app.use(require("./services/delete"))
app.use(require("./services/search"))


app.listen(3001 , ()=>{
    console.log("Run ....")
})


