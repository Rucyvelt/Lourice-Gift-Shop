const express = require('express');
const router = express.Router();

// Get all products
router.get('/', (req, res) => {
    // Your database query here
    res.json({ products: [] });
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Sample products data (replace with database later)
const products = [
    { id: 1, name: "Birthday Gift Box", price: 25.99, category: "birthday" },
    { id: 2, name: "Wedding Hamper", price: 49.99, category: "wedding" },
    { id: 3, name: "Thank You Card Set", price: 12.99, category: "cards" }
];

// GET all products
router.get('/', (req, res) => {
    res.json({ success: true, products: products });
});

// GET single product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product: product });
});

// POST create new product
router.post('/', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    products.push(newProduct);
    res.status(201).json({ success: true, product: newProduct });
});

// PUT update product
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    products[index] = { ...products[index], ...req.body };
    res.json({ success: true, product: products[index] });
});

// DELETE product
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    products.splice(index, 1);
    res.json({ success: true, message: "Product deleted" });
});

module.exports = router;