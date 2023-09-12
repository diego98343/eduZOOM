const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

//WE CREATE A PRODUCT 
const createProducts = async(req,res)=>{
    //SET THE ID WE HAVE IN THE COOKIE EQUAL TO THE ID IN THE REQ
    req.body.user = req.user.userId;

    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product});
}

const getAllProducts = async(req,res)=>{
    //GETS ALL PRODUCTS IN THE DATABASE             //
    const products = await Product.find({}).populate('reviews');

    res.status(StatusCodes.OK).json({products, count: products.length });
     
}

const getSingleProduct = async(req,res)=>{

    const {id:productId}= req.params;

    
     //FIND PRODUCT BASED ON ID                             //POPULATE GETS VALUES FROM REVIEW TO BE DISPLAYED ON A PRODUCT
    const product = await Product.findOne({_id:productId}).populate('reviews');

    if(!product){
        throw new CustomError.NotFoundError('No product was found');
    }

    res.status(StatusCodes.OK).json({product});

}

const updateProduct = async(req,res)=>{

    const {id: productId} = req.params;

    //MAKES SURE WE GET THE PRODUCT BY ID AND REQ.BODY TAKES THE VALUES 
    const product = await Product.findOneAndUpdate({_id:req.params.id},req.body,{
        new: true,
        runValidators: true,
    });

    if(!product){
        throw new CustomError.NotFoundError(`No product was found with id ${productId}`)
    }

    res.status(StatusCodes.OK).json({product});
}

const deleteProduct = async(req,res)=>{

  const product = await Product.findOne({_id:req.params.id});

  if(!product){
    throw new CustomError.NotFoundError(`No product was found with id ${productId}`)
}

await product.remove();

res.status(StatusCodes.OK).json({msg:'product has been removed'});

}

const uploadImage = async(req,res)=>{

    //THIS TAKES THE FILE IMAGE
    const productImage = req.files.image;

    console.log(productImage)
    

    //MAKES SURE THE FILE IS AN IMAGE AND NOT ANY OTHER TYPE OF FILE
    if(!productImage.mimetype.startsWith('image')){
      throw new CustomError.BadRequestError('please Upload Image or image name is empty');
    }

    //MAKES SURE THE IMAGE FILE IS NOT TOO HEAVY 
    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('Image size is too large');
    }

    //IMAGE PATH  WHERE THE  FILE IS GOING TO GET STORED ()
    const imagePath = path.join(__dirname,'../public/uploads' + `${productImage.name}`);

    //STORE THE IMAGE FILE 
    await productImage.mv(imagePath);

    
    res.status(StatusCodes.OK).json({image:`uploads/${productImage.name}, image was uploaded successfully`});

}


module.exports ={
    createProducts,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    uploadImage

}