const { Schema, model } = require("mongoose");

var productSchema = new Schema ({
    imagePath: {
        type: String,
        
    },

    title: {
        type: String,
        
    },

    description: {
        type: String,
        
    },

    price: {
        type: String,
        
    }
})

const Product = model('Product', productSchema)

module.exports = Product
