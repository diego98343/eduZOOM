require('dotenv').config();
// 1))express
const express = require('express');
const app = express()


// 2)) database
const connectDB = require('./db/connect')

// 3)) middleware

app.use(express.json())

app.get('/',(req,res)=>{
res.send('e-commerce api')
})


// 2)) database
const port = process.env.PORT || 3500
const start = async () =>{
    try{
    await connectDB(process.env.MANGO_URL,console.log('Database connected successfully '));
    app.listen(port,console.log(`Server is listening to port ${port}...`));
   
    }catch(error){
     console.log(error);
    }
}

start();
