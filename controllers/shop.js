const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            Category.findAll()
                .then(categories => {
                    res.render('shop/index', {
                        title: 'Shopping',
                        products: products,
                        path: '/',
                        categories: categories
                    });
                })
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {

    Product
        .find()
        //.find({price:{$eq:2000}}) equal
        //.find({price:{$ne:2000}}) not equal
        //.find({price:{$gt:2000}}) greater than
        //.find({price:{$gte:2000}}) greater than or equal
        //.find({price:{$lt:2000}}) less than
        //.find({price:{$lte:2000}}) less than or equals
        //.find({price:{$in:[2000,3000,4000]}}) in
        //.find({price:{$gte:2000,$lte:4000}}) between
        
        //.or([{price:{$gt:2000},$name:'Samsung S6'}])

        //search start with
        //.find({name:/^Samsung/})
        //search end with
        //.find({name:/Samsung$/})
        //search contain
        //.find({name:/.*Samsung.*/})
        .then(products => {
            res.render('shop/products', {
                title: 'Products',
                products: products,
                path: '/',
            });
            //Category.findAll()
                //.then(categories => {
                    //res.render('shop/products', {
                        //title: 'Products',
                        //products: products,
                        //path: '/',
                        //categories: categories
                    //});
                //})
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    const model = [];

    Category.findAll()
        .then(categories => {
            model.categories = categories;
            return Product.findByCategoryId(categoryid);
        })
        .then(products => {
            res.render('shop/products', {
                title: 'Products',
                products: products,
                categories: model.categories,
                selectedCategory: categoryid,
                path: '/products'
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getProduct = (req, res, next) => {

    Product.findById(req.params.productid)
        .then(product => {
            res.render('shop/product-detail', {
                title: product.name,
                product: product,
                path: '/products'
            });
        })
        .catch((err) => {
            console.log(err);
        });
}


exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            console.log(products);
            res.render('shop/cart', {
                title: 'Cart',
                path: '/cart',
                products: products
            });
        }).catch(err => {
            console.log(err);
        });
}

exports.postCart = (req, res, next) => {

    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.postCartItemDelete = (req, res, next) => {
    const productid = req.body.productid;
    req.user
        .deleteCartItem(productid)
        .then(() => {
            res.redirect('/cart');
        });
}

exports.getOrders = (req, res, next) => {

    req.user
        .getOrders()
        .then(orders => {
            res.render('shop/orders', {
                title: 'Orders',
                path: '/orders',
                orders: orders
            });

        })
        .catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}


