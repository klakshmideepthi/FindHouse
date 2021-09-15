const mongoose = require('mongoose');
const User=require("./User")
const Schema = mongoose.Schema;

const RoomSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: User,
        required:true
    },
   
    images: {
        type: Array,
        default: []
    },
    housetype: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    housenumber:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode:{
        type:Number,
        required:true
    },
   
    bedrooms: {
        type: Number,
        required: true,
    },
     price: {
        type: Number,
        required: true
    },
    sqft: {
        type: Number,
        required: true
    },
    rating:{
        type:Number,
        default:0
    },
    noofusers:{
        type:Number,
        default:0
    }



}, { timestamps: true })


RoomSchema.index({ 
      housetype:'text',
    //   bedrooms:'text'
    title:'text',
    // description: 'text',
   
}, {
    weights: {
        housetype:10,
        title: 5,
        
        //   bedrooms:4
        // description: 1,
    }
 }
)

const Room = mongoose.model('Room', RoomSchema);

module.exports = { Room }