const express = require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const userRoutes=require('./routes/userRoutes')

const app =express()
app.use(cors())
app.use(express.json())

app.use('/api/users',userRoutes)

mongoose.connect('mongodb://localhost:27017/user').then(()=>
    console.log('mongodb connected')).catch(err => console.log(err));

const PORT= process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server is running on port ${PORT}`));
