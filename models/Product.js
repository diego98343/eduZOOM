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
        type:Boolean,
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
    numOfReviews:{
         type:Number,
         default:0,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
},               //SET OUR MODEL TO ACCEPT MANGOS VIRTUALS
{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}}
);

//VIRTUAL TO SHOW REVIEWS ON A PRODUCT 
ProductSchema.virtual('reviews',{
    ref: 'Review',
    localField:'_id',
    foreignField: 'product',
    justOne: false
  });

  //MAKES SURE THAT REVIEWS GET DELETED WHEN A PRODUCT GETS DELETED
  //IF WE DO NOT do THIS THERE'S GOING TO BE AN ERROR BECAUSE, THERE'RE GOING TO BE REVIEWS LEFT ASSOCIATED WITH THE DELETED PRODUCT.
  ProductSchema.pre('remove',async function(next){
         //REMOVES THE REVIEW WHEN IT MATCHES THE PRODUCT ID
      await this.model('Review').deleteMany({product: this._id});
  });

module.exports = mongoose.model('Product',ProductSchema);