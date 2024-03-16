const mongoose = require('mongoose')

const Brand = new mongoose.Schema(
    {
        brandName : {type : String, required : true},
        imgpath : {type : String},
        dataCreated :{
            type : Date,
            default : Date.now
        }
    }, 
    {collection : 'brands'}
);

const branddb = mongoose.model('brands', Brand)

module.exports = branddb