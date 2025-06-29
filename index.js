const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/KrishiSewa')
.then(() => {
    console.log("Connected to MongoDB");
}) .catch(err => {
    console.log("Connection failed: ", err);
})


//Middlewares:
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy', 'baked goods']
app.get('/products', async (req, res) => {
    const { category } = req.query
    if(category) {
        const products = await Product.find({category})
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', {products, category: "All"})
    }
})
app.get('/products/new', (req, res) => {
    res.render('products/new', {categories})
})
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect('/products/'+newProduct.id)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log(product)
    res.render('products/show', { product })
})
app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/products/${product._id}`)
})
app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})
app.get('/', (req, res) => {
    res.send("Welcome to the localhost:3000");
})
app.listen(3000, () => {
    console.log("App is working on Port:3000");
})