const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createTokenUser, attachCookiesToResponse, checkPermissions } = require('../utils');


const createReview = async(req,res)=>{
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