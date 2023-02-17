module.exports.init = function () {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://jagriti:jagriti@cluster0.1u1d4.mongodb.net/ecommerce?retryWrites=true&w=majority').then(function () {
        console.log("Database is live");
    })
        .catch(function () {
            console.log("Error in Database");
        })
}