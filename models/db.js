const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.database)
.then(()=>console.log('connected to database')) 
.catch(err=>console.log(err)) 