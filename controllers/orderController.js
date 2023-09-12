const Order = require('../models/Order');
const Product = require('../models/Product');

const { checkPermissions } = require('../utils');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

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
   for( const item of cartItems){
    //product from cart item
     const dbProduct = await Product.findOne({_id:item.Product});
     if(!dbProduct){
        throw new CustomError.NotFoundError(`product not found with id ${item.product}`);
     };

     const {name, price, image, _id} = dbProduct;

     const singleOrderItem = {
        amount:item.amount,
        name,
        price,
        image,
        product:_id
     }

     //ADD ITEM TO ORDER array 
     orderItems = [...orderItems,singleOrderItem]

     
   }

}

const getAllOrders = async (req,res)=>{
    res.send('get all orders')
}

const getSingleOrder = async (req,res)=>{
    res.send('get single product')
}

const updateOrder = async (req,res)=>{
    res.send('update order')
}

const deleteOrder = async (req,res)=>{
    res.send('delete order')
}

const getCurrentUserOrders = async(req,res)=>{
    res.send('get current user orders');
}



module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getCurrentUserOrders
}