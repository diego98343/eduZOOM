const Order = require('../models/Order');
const Product = require('../models/Product');

const { checkPermissions } = require('../utils');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const fakeStripAPI = async({amount,currency})=>{
    const client_secret = 'someRandomValue'
    return {client_secret,amount}
}



const createOrder = async (req,res)=>{

   const {items: cartItems,tax,shippingFee} = req.body;

   if(!cartItems || cartItems.length < 1){
      throw new CustomError.BadRequestError('Not cart items provided')
   }

   
   if(!tax || !shippingFee){
    throw new CustomError.BadRequestError('please provide tax and shipping fee')
   }

   let orderItems = [];
   let subtotal = 0;

   //MAKES SURE THERE IS A PRODUCT IN THE CART ITEMS ARRAY
   //we loop to all the cart item and then we get the item to access the product
   //WE GET THE PRODUCT AND PRICE TO CALCULATE THE SUB TOTAL
   for( const item of cartItems){
    //product from cart item
     const dbProduct = await Product.findOne({_id:item.Product});
     if(!dbProduct){
        throw new CustomError.NotFoundError(`product not found with id ${item.product}`);
     };
     //DESTRUCTURE AND GETS EVERY VALUE FROM THE PRODUCT
     const {name, price, image, _id} = dbProduct;

     //WE BUILD AN OBJECT AND WE POPULATE IT WITH VALUES
     const singleOrderItem = {
        amount:item.amount,
        name,
        price,
        image,
        product:_id
     }

     //ADD ITEM TO ORDER array 
     orderItems = [...orderItems,singleOrderItem];
     //subtotal 
     subtotal += item.amount * price;
   }
   //
   const total = tax + shippingFee + subtotal

   // STRIPE FUNCTION
     const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd',
     });
   // STRIPE FUNCTION ends

   const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    user: req.user.userId,
    clientSecret: paymentIntent.client_secret
   })

   res.status(StatusCodes.CREATED).json({order, clientSecret: order.client_secret});
}

const getAllOrders = async (req,res)=>{
   const orders = Order.find({});
   res.status(StatusCodes.OK).json({orders});
}

const getSingleOrder = async (req,res)=>{
    //GETS ID NUMBER FROM  PARAM
   const {_id:orderId} = req.params;
   
   //FINDS ORDER BASED ON ID 
   const order = Order.findOne({_id:orderId});

   if(!order){
    throw new CustomError.NotFoundError(`order was not found with id ${orderId}`);
   }

   checkPermissions(req.user,order.user);

   res.status(StatusCodes.OK).json({order});
}

const getCurrentUserOrders = async(req,res)=>{
    res.send('get current user orders');
}

const updateOrder = async (req,res)=>{
    res.send('update order')
}

const deleteOrder = async (req,res)=>{
    res.send('delete order')
}





module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getCurrentUserOrders
}