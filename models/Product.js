const { boolean } = require('joi');
const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name:{
      type: String,
      trim: true,
      required: [true,'please provide product name'],
      maxlength:[100, 'Name can not be more than 100 characters']
    },
    price:{
        type:Number,
        required: [true,'please provide product price'],
        default:0
    },
    description:{
        type:String,
        required: [true, ' please provide description'],
        maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    image:{
        type:String,
        default: '/uploads/example.jpeg'
    },
    category:{
        type:String,
        required: [true,'provide product category'],
        enum:['office','kitchen','bedroom']
    },
    company:{
        type:String,
        required: [true,'provide company'],
        enum:{
           values:['ikea','libby','marcos'],
           message:'{VALUE} is not supported',    
        }
    },
    colors:{
        type:[String],
        required: true,
    },
    featured:{
        type:boolean,
        default:false,
    },
    freeShipping:{
        type:Boolean,
        default: false,
    },
    inventory:{
        type:Number,
        required:true,
        default:15,
    },
    averageRating:{
        type:Number,
        default:0,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
},
{timestamps:true}
);