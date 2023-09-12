const Order = require('../models/Order');
const {StatusCodes} = require('http-status-codes');


const createOder = async (req,res)=>{
   res.send('create order')
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
    createOder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getCurrentUserOrders
}