const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    product_id: {
        type: String,
        required: true,
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
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;