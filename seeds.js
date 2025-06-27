const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect('mongodb://localhost:27017/KrishiSewa')
.then(() => {
    console.log("Connected to MongoDB");
}) .catch(err => {
    console.log("Connection failed: ", err);
})

const seedProducts = [
    {
        name: "Fairy Eggplant",
        price: 1.49,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Fresh Strawberries',
        price: 3.99,
        category: "dairy"
    },
    {
        name: 'Organic Celery',
        price: 1.00,
        category: "vegetable"
    }
]
Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})