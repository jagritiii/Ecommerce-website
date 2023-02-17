const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    product_category: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;