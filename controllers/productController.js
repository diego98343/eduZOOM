const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

//WE CREATE A PRODUCT 
const createProducts = async(req,res)=>{
    //SET THE ID WE HAVE IN THE COOKIE EQUAL TO THE ID IN THE REQ
    req.body.user = req.user.userId;

    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product});
}

const getAllProducts = async(req,res)=>{
    //GETS ALL PRODUCTS IN THE DATABASE
    const products = await Product.find({});

    res.status(StatusCodes.OK).json({products, count: products.length });
     

}

const updateProduct = async(req,res)=>{s
    res.send(' update product');
}

const getSingleProduct = async(req,res)=>{

    const {id:productId}= req.params;
    
    const product = await Product.findOne({_id:req.params.id});

    if(!product){
        throw new CustomError.NotFoundError('No product was found');
    }

    res.status(StatusCodes.OK).json({product});

}

const deleteProduct = async(req,res)=>{
    res.send('delete product');
}

const uploadImage = async(req,res)=>{
    res.send('upload image');
}


module.exports ={
    createProducts,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    uploadImage

}