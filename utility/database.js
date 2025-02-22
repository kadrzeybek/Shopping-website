const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

    MongoClient.connect('mongodb+srv://kadrzeybek:TApfH.rNw-EwSN4@cluster0.8q9oz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(client => {
            console.log('connected');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const getdb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database';
}


exports.mongoConnect = mongoConnect;
exports.getdb = getdb;