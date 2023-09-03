const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');
const Review = require('../models/Review');
const Product = require('../models/Product');

const createReview = async(req,res)=>{
    //GETS PRODUCT ID FROM REQ.BODY // ONLY GETS PRODUCT ID FROM THE VALUES WE HAVE ON REQ.BODY
    //whee we create the review there will be a product id ready 
    const {product: productId} = req.body;

    //MAKES SURE THE THE PRODUCT EXIST BASED ON THE ID WE PROVIDE;
    const isValidProduct = await Product.findOne({_id:productId});

    if(!isValidProduct){
        throw new CustomError.NotFoundError(`NOT PRODUCT WITH ID: ${productId}`)
    }

    //WE FIND A REVIEW BASED ON THE PRODUCT ID AND USER ID, IF WE FOUND ONE THEN 
    // IT MEANS THE USER ALREADY CREATED A REVIEW AND ITS NOW ALLOW TO CREATE ANOTHER ONE 
    const alreadySubmitted = await Review.findOne({
        product:productId,
        user: req.user.userId,
    })

    if(alreadySubmitted){
        throw new CustomError.BadRequestError('user already created a review');
    }


    req.body.user = req.body.userId;

    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({review})

    res.send('create review');
}

const getAllReview = async(req,res)=>{
    res.send('get all reviews');
}

const updateReview =async(req,res)=>{
    res.send('update review');
}

const deleteReview = async(req,res)=>{
    res.send('delete review');
}

const getSingleReview = async(req,res)=>{
    res.send('get a single review');
}


module.exports = {
    createReview,
    getAllReview,
    updateReview,
    deleteReview,
    getSingleReview
}