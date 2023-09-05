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
        throw new CustomError.BadRequestError('user already created a review')
    }

    //user input  || user in the cookie;
    req.body.user = req.user.userId;

    //CREATES REVIEW
    const review = await Review.create(req.body);


    res.status(StatusCodes.CREATED).json({review})

   
}

const getAllReview = async(req,res)=>{

    const reviews = await Review.find({}).populate({
        path:'product',
        select:'name company price'
    });

    res.status(StatusCodes.OK).json({reviews,count:reviews.length});
}

const getSingleReview = async(req,res)=>{

    const {id:reviewId} = req.params;

    const review = await Review.findOne({_id:reviewId});

    if(!review){
        throw new CustomError.NotFoundError(`no review found with id ${reviewId}`);
    }

    res.status(StatusCodes.OK).json({review});
}

const updateReview =async(req,res)=>{
     
    const {id:reviewId} = req.params;
 
    //GETS RATING, TITTLE, COMMENT FROM REQ.BODY;
    const {rating,title,comment}= req.body;

    //FINDS ONE REVIEW BASED ON ID
    const review = await Review.findOne({_id:reviewId});


    if(!review){
        throw new CustomError.NotFoundError(`no review found to update with id ${reviewId}`);
    }

    //IN ORDER FOR THE USER TO DELETE THE COMMENT WE HAVE TO MAKE SURE THE USE FROM THE TOKEN AND REVIEW USER ARE THE SAME ONE
    checkPermissions(req.user, review.user)

     //SET VALUES FROM REVIEW 
     review.rating = rating;
     review.title = title;
     review.comment = comment;
 
     //SAVE ALL CHANGES MADE 
     await review.save();

     res.status(StatusCodes.OK).json({review});

}

const deleteReview = async(req,res)=>{
    
    //GETS IF FROM PARAMS
    const {id:reviewId} = req.params;

    //FINDS A REVIEW BASED ON ID
    const review = await Review.findOne({_id:reviewId});

    if(!review){
        throw new CustomError.NotFoundError(`no review found to delete with id ${reviewId}`);
    }

    //IN ORDER FOR THE USER TO DELETE THE COMMENT WE HAVE TO MAKE SURE THE USE FROM THE TOKEN AND REVIEW USER ARE THE SAME ONE
    checkPermissions(req.user, review.user)

    //REMOVES THE REVIEW
    await review.remove();


    res.status(StatusCodes.OK).json({review});
}



module.exports = {
    createReview,
    getAllReview,
    updateReview,
    deleteReview,
    getSingleReview
}