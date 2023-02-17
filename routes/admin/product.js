const express = require('express');
const router = express.Router();

const productModel = require("../../database/models/products");

router.route('/').get((req, res) => {
    productModel.find({}).then((result) => {
        res.render('product', { products: result });
    })
})

router.route('/add-product').get((req, res) => {
    res.render('addProduct', { msg: "" });

}).post((req, res) => {
    var id = req.body.product_id;
    var name = req.body.product_name;
    var description = req.body.product_des;
    var image = req.body.product_image;
    var price = req.body.product_price;
    var stock = req.body.product_stock;
    var category = req.body.product_category;

    productModel.create(
        {
            product_id: id,
            product_name: name,
            product_description: description,
            product_category: category,
            price: price,
            image: image,
            stock: stock
        }
    ).then(() => {
        console.log('item added');
        res.render("addProduct", { msg: "successfully added" })
    })
        .catch(() => {
            console.log('error');
            res.render("addProduct", { msg: "error" })
        })

})

router.route('/delete-product/:id').get((req, res) => {
    var id = req.params.id;
    productModel.findOneAndDelete({ product_id: id })
        .then(() => {
            console.log('1 item deleted')
            res.end()
        })
})

router.route('/edit-product/:id').get((req, res) => {

})




module.exports = router;
