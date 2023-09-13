const Order = require('../models/Order');
const Product = require('../models/Product');

const { checkPermissions } = require('../utils');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const fakeStripeAPI = async({amount,currency})=>{
    const client_secret = 'someRandomValue'
    return {client_secret,amount}
}



const createOrder = async (req,res)=>{

   const {items: cartItems,tax,shippingFee} = req.body;

   if(!cartItems || cartItems.length < 1){
      throw new CustomError.BadRequestError('No cart items provided')
   }

   
   if(!tax || !shippingFee){
    throw new CustomError.BadRequestError('please provide tax and shipping fee')
   }

   let orderItems = [];
   let subTotal = 0;

   //MAKES SURE THERE IS A PRODUCT IN THE CART ITEMS ARRAY
   //we loop to all the cart item and then we get the item to access the product
   //WE GET THE PRODUCT AND PRICE TO CALCULATE THE SUB TOTAL
   for( const item of cartItems){
    //product from cart item
     const dbProduct = await Product.findOne({_id:item.product});
     if(!dbProduct){
        throw new CustomError.NotFoundError(`order was not found with id ${orderId}`);
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
     subTotal += item.amount * price;
   }
   //
   const total = tax + shippingFee + subTotal

   // STRIPE FUNCTION
     const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd',
     });
   // STRIPE FUNCTION ends


   //WE HAVE TO MAKES SURE THE VALUES NAMES ARE EQUAL TO THE ORDER MODEL NAMES
   const order = await Order.create({
    orderItems,
    total,
    subTotal,
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
  //find orders based on user id we get from token   
  const orders = await Order.find({user: req.user.userId});
  res.status(StatusCodes.OK).json({orders, count:orders.length});

}

const updateOrder = async (req,res)=>{

    const {_id:orderId} = req.params;
    const {paymentIntentId}= req.body;

    const order = await Order.findOne({id:orderId});

    if(!order){
       throw new CustomError.NotFoundError(`no order found with ${orderId}`)
    }

    checkPermissions(req.user, order.user);

    order.paymentIntentId = paymentIntentId;
    order.status = 'paid';
    await order.save();

    res.status(StatusCodes.OK).json({order});
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