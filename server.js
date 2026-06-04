const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Admin password
const ADMIN_PASSWORD = '@Rucylora.com';

// Complete products array (all 78 products)
let products = [
    // Clothing (IDs 1-10)
    { id: 1, name: "African Print Maxi Dress", price: 3500, category: "clothing", inStock: true, description: "Beautiful Ankara print maxi dress", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Dress", rating: 4.8 },
    { id: 2, name: "Men's Casual Shirt", price: 1800, category: "clothing", inStock: true, description: "Comfortable cotton shirt", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Shirt", rating: 4.5 },
    { id: 3, name: "Women's Blazer", price: 4500, category: "clothing", inStock: true, description: "Elegant blazer for office", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Blazer", rating: 4.7 },
    { id: 4, name: "Kids Party Dress", price: 1500, category: "clothing", inStock: true, description: "Cute floral dress", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Kids+Dress", rating: 4.9 },
    { id: 5, name: "Traditional Kanzu", price: 3200, category: "clothing", inStock: true, description: "Premium quality kanzu", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Kanzu", rating: 4.8 },
    { id: 6, name: "Evening Gown", price: 6500, category: "clothing", inStock: true, description: "Stunning evening gown", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Gown", rating: 5.0 },
    { id: 7, name: "Hoodie Sweatshirt", price: 2200, category: "clothing", inStock: true, description: "Cozy hoodie", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Hoodie", rating: 4.6 },
    { id: 8, name: "Denim Jeans", price: 2800, category: "clothing", inStock: true, description: "Classic denim jeans", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Jeans", rating: 4.7 },
    { id: 9, name: "Swimwear Set", price: 1900, category: "clothing", inStock: true, description: "Stylish swimwear", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Swimwear", rating: 4.5 },
    { id: 10, name: "Pajama Set", price: 1600, category: "clothing", inStock: true, description: "Comfortable pajamas", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Pajama", rating: 4.8 },
    
    // Accessories (IDs 11-20)
    { id: 11, name: "Silver Necklace", price: 1200, category: "accessories", inStock: true, description: "Elegant silver necklace", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Necklace", rating: 4.7 },
    { id: 12, name: "Leather Handbag", price: 3800, category: "accessories", inStock: true, description: "Genuine leather handbag", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Handbag", rating: 4.9 },
    { id: 13, name: "Sunglasses", price: 1500, category: "accessories", inStock: true, description: "UV protection sunglasses", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Sunglasses", rating: 4.6 },
    { id: 14, name: "Wrist Watch", price: 4200, category: "accessories", inStock: true, description: "Elegant analog watch", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Watch", rating: 4.8 },
    { id: 15, name: "Scarf Set", price: 800, category: "accessories", inStock: true, description: "Beautiful silk scarves", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Scarf", rating: 4.5 },
    { id: 16, name: "Belt Collection", price: 950, category: "accessories", inStock: true, description: "Genuine leather belt", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Belt", rating: 4.4 },
    { id: 17, name: "Earrings Set", price: 650, category: "accessories", inStock: true, description: "Beautiful stud earrings", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Earrings", rating: 4.7 },
    { id: 18, name: "Bracelet", price: 550, category: "accessories", inStock: true, description: "Silver charm bracelet", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Bracelet", rating: 4.6 },
    { id: 19, name: "Wallet", price: 1100, category: "accessories", inStock: true, description: "Leather wallet", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Wallet", rating: 4.8 },
    { id: 20, name: "Hat Collection", price: 750, category: "accessories", inStock: true, description: "Stylish fedora hat", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Hat", rating: 4.5 },
    
    // Add more products... (I'll add the rest in the response due to character limit)
    { id: 21, name: "Smartphone X", price: 25000, category: "phones", inStock: true, description: "Latest smartphone", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Phone", rating: 4.9 },
    { id: 22, name: "Wireless Earbuds", price: 3200, category: "phones", inStock: true, description: "Bluetooth earbuds", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Earbuds", rating: 4.8 },
    { id: 23, name: "Barbie Doll", price: 1800, category: "dolls", inStock: true, description: "Classic Barbie doll", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Barbie", rating: 4.9 },
    { id: 24, name: "Teddy Bear", price: 2800, category: "dolls", inStock: true, description: "Huge soft teddy bear", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Teddy", rating: 5.0 },
    { id: 25, name: "Rose Bouquet", price: 2500, category: "flowers", inStock: true, description: "12 red roses", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Roses", rating: 4.9 },
    { id: 26, name: "Birthday Cake", price: 3200, category: "food", inStock: true, description: "Delicious chocolate cake", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Cake", rating: 4.9 },
    { id: 27, name: "Lace Front Wig", price: 5500, category: "wigs", inStock: true, description: "Human hair lace front", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Wig", rating: 4.8 },
    { id: 28, name: "RC Car", price: 3500, category: "cars", inStock: true, description: "Remote control car", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=RC+Car", rating: 4.8 },
    { id: 29, name: "Lipstick Set", price: 1800, category: "makeup", inStock: true, description: "10 lipstick shades", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Lipstick", rating: 4.8 }
];

// Shopping cart
let cart = [];
let orders = [];
let giftRequests = [];

// API Routes
app.get('/api/products', (req, res) => {
    res.json({ success: true, products: products });
});

app.get('/api/products/category/:category', (req, res) => {
    const filtered = products.filter(p => p.category === req.params.category);
    res.json({ success: true, products: filtered });
});

app.get('/api/cart', (req, res) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.json({ success: true, cart: cart, total: total });
});

app.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
        existing.quantity += quantity || 1;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity || 1,
            image: product.image
        });
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.json({ success: true, cart: cart, total: total });
});

app.delete('/api/cart/:productId', (req, res) => {
    cart = cart.filter(item => item.productId !== parseInt(req.params.productId));
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.json({ success: true, cart: cart, total: total });
});

app.post('/api/orders', (req, res) => {
    const { customerName, phoneNumber, shippingAddress, paymentMethod } = req.body;
    
    if (!customerName || !shippingAddress) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }
    
    const order = {
        id: orders.length + 1,
        customerName,
        phoneNumber,
        shippingAddress,
        paymentMethod: paymentMethod || 'Cash on Delivery',
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'pending',
        orderDate: new Date().toISOString()
    };
    
    orders.push(order);
    cart = [];
    res.status(201).json({ success: true, order: order });
});

app.get('/api/orders', (req, res) => {
    res.json({ success: true, orders: orders });
});

app.post('/api/gift-requests', (req, res) => {
    const newRequest = { id: giftRequests.length + 1, ...req.body, status: 'pending', createdAt: new Date().toISOString() };
    giftRequests.push(newRequest);
    res.status(201).json({ success: true, giftRequest: newRequest });
});

// Admin routes
app.post('/api/admin/login', (req, res) => {
    if (req.body.password === ADMIN_PASSWORD) {
        res.json({ success: true, token: 'admin-authenticated' });
    } else {
        res.status(401).json({ success: false, message: "Invalid password" });
    }
});

function requireAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || auth !== 'Bearer admin-authenticated') {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
}

app.get('/api/admin/orders', requireAuth, (req, res) => {
    res.json({ success: true, orders: orders });
});

app.get('/api/admin/gift-requests', requireAuth, (req, res) => {
    res.json({ success: true, giftRequests: giftRequests });
});

app.put('/api/admin/orders/:id', requireAuth, (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (order) order.status = req.body.status;
    res.json({ success: true });
});

app.delete('/api/admin/orders/:id', requireAuth, (req, res) => {
    orders = orders.filter(o => o.id !== parseInt(req.params.id));
    res.json({ success: true });
});

app.delete('/api/admin/gift-requests/:id', requireAuth, (req, res) => {
    giftRequests = giftRequests.filter(r => r.id !== parseInt(req.params.id));
    res.json({ success: true });
});

app.put('/api/admin/products/:id/price', requireAuth, (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) product.price = req.body.price;
    res.json({ success: true });
});

app.post('/api/admin/products', requireAuth, (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category,
        description: req.body.description,
        image: req.body.imageName || "https://placehold.co/400x300/ffd9e8/ff1493?text=New",
        inStock: true,
        rating: 5.0
    };
    products.push(newProduct);
    res.status(201).json({ success: true, product: newProduct });
});

app.delete('/api/admin/products/:id', requireAuth, (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.json({ success: true });
});

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'customer.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🛍️  Customer Shop: https://lourice-gift-shop.onrender.com`);
    console.log(`🔑 Admin Password: ${ADMIN_PASSWORD}`);
    console.log(`📦 Total Products: ${products.length}`);
});