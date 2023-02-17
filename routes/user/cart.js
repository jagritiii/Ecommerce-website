const express = require('express');
const router = express.Router();

const cartModel = require("../../database/models/cart");
const productModel = require("../../database/models/products");

router.route('/').get((req, res) => {
    console.log(req.session.user)
    var user_id = req.session.user.email

    cartModel.find({ user_id: user_id })
        .then((items) => {
            console.log(items)
            res.render('cart', { products: items })

        })


}).post((req, res) => {

    var user = null

    if (!req.session.isLoggedIn) {
        res.status(401).json({ status: false, message: "please login", data: null })

        return
    }

    user = req.session.user

    var _id = req.body.id;

    productModel.findOne({ product_id: _id })
        .then((item) => {

            cartModel.create({
                user_id: user.email,
                product_name: item.product_name,
                product_id: _id,
                product_description: item.product_description,
                price: item.price,
                image: item.image,
            })

            res.status(200).json({ status: true, message: "added to cart", data: null })


        })

})

router.post('/deleteItem', function (req, res) {
    var id = req.body.id;
    var email = req.session.user.email;

    console.log(id)


    cartModel.findOneAndDelete(
        { user_id: email, product_id: id })
        .then(function () {
            console.log("1 document deleted");
            res.status(200).json({ status: true, message: "removed successfully", data: null })
        }).catch(() => {
            res.status(401).json({ status: false, message: "err", data: null })
        })


})

router.post('/increament', (req, res) => {
    var id = req.body.id;
    var quan = req.body.quantity;
    var email = req.session.user.email;

    cartModel.updateOne({ product_id: id, user_id: email },
        {
            $set: {
                quantity: quan
            }
        }).then(() => {
            console.log('1 doc updated');
            res.status(200).json({ status: true, message: "success", data: null })

        }).catch(() => {
            res.status(401).json({ status: false, message: "err", data: null })
        })

})

router.post('/decreament', (req, res) => {
    var id = req.body.id;
    var quan = req.body.quantity;
    var email = req.session.user.email;

    cartModel.updateOne({ product_id: id, user_id: email },
        {
            $set: {
                quantity: quan
            }
        }).then(() => {
            console.log('1 doc updated');
            res.status(200).json({ status: true, message: "success", data: null })

        }).catch(() => {
            res.status(401).json({ status: false, message: "err", data: null })
        })

})

module.exports = router;
