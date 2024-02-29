const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref :"users"
    },
    orderDate :{
        type : Date
    },
    products : Array,
    shipping_address : Array,
    totalPrice :{
        type : Number
    },
    totalAmount:{
        type : Number
    },
    orderStatus:{
        type : String,
        default: "processing"
    },
    totalAmountlocation:{
        type : Number
    },
    PaymentStatus:{
        type:String,
        default:"not paid"
    },
    orderCreationId :{
        type:String
    },
    razorpayPaymentId:{
        type:String
    },
    razorpayOrderId:{
        type:String
    },
    razorpaySignature:{
        type:String
    },
    dateCreated :{
        type:Date,
        default : Date.now
    }

})

const orderdb = new mongoose.model("orders",orderSchema)

module.exports = orderdb