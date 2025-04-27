const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    console.log("Add product page");
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title);
    // products.push({title: req.body.title})
    product.save();
    console.log(req.body);
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    console.log("route to -> /");
    // console.log(products);
    Product.fetchAll();
    // res.send('<h1>Hello from Express</h1>');
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}