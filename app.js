const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const mongoose = require('mongoose');

const errorController = require('./controllers/errors');

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    User.findOne({name:'kadirzeybek'})
        .then(user => {
            req.user = user;
            console.log(req.user);
            next();
        })
        .catch(err => { console.log(err) });
})


app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404Page);

/*
mongoConnect(() => {

    User.findByUserName('kadrzeybek')
        .then(user => {
            if (!user) {
                user = new User('kadrzeybek', 'email@kadrzeybek.com');
                return user.save();
            }
            return user;
        })
        .then(user => {
            console.log(user);
            app.listen(3000);
        })
        .catch(err => { console.log(err) });
});

*/

mongoose.connect('mongodb+srv://kadrzeybek:TApfH.rNw-EwSN4@cluster0.8q9oz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('connected to mongodb');

        User.findOne({name:'kadrzeybek'})
        .then(user => {
            if (!user) {
                user = new User({
                    name:'kadrzeybek',
                    email: 'email@kadrzeybek.com',
                    cart:{
                        items: []
                    }
                });
                return user.save();
            }
            return user;
        })
        .then(user => {
            console.log(user);
            app.listen(3000);
        })
        .catch(err => { console.log(err) });
    })
    .catch(err => {
        console.log(err);
    })