require('dotenv').config();
// 1))express
const express = require('express');
const app = express()

// 4)) rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// 2)) database
const connectDB = require('./db/connect')

//5))
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter  = require('./routes/orderRoutes');

// 3)) middleware.. then app.use to invoke the invoke the middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandleMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
//this have to go before the routers
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));
app.use(fileUpload());

app.get('/',(req,res)=>{
res.send('e-commerce api')
})

app.get('/v1/cookie',(req,res)=>{
    console.log(req.signedCookies)
    })

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/review',reviewRouter);
app.use('/api/order',orderRouter);


app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

// 2)) database
const port = process.env.PORT || 9090
const start = async () =>{
    try{
    await connectDB(process.env.MANGO_URL,console.log('Database connected successfully '));
    app.listen(port,console.log(`Server is listening to port ${port}...`));
   
    }catch(error){
     console.log(error);
    }
}

start();
