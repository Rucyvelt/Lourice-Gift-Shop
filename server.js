const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Admin credentials
const ADMIN_PASSWORD = '@Rucylora.com';

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// ============================================
// COMPLETE PRODUCTS ARRAY - ALL 78 PRODUCTS
// ============================================
let products = [
    // Clothing (10 products) - IDs 1-10
    { id: 1, name: "African Print Maxi Dress", price: 3500, category: "clothing", inStock: true, description: "Beautiful Ankara print maxi dress perfect for parties", image: "/images/maxi.jpg", rating: 4.8 },
    { id: 2, name: "Men's Casual Shirt", price: 1800, category: "clothing", inStock: true, description: "Comfortable cotton shirt for everyday wear", image: "/images/shirt.jpg", rating: 4.5 },
    { id: 3, name: "Women's Blazer", price: 4500, category: "clothing", inStock: true, description: "Elegant blazer for office and formal events", image: "/images/blazer.jpg", rating: 4.7 },
    { id: 4, name: "Kids Party Dress", price: 1500, category: "clothing", inStock: true, description: "Cute floral dress for little girls", image: "/images/kidsdress.jpg", rating: 4.9 },
    { id: 5, name: "Traditional Kanzu", price: 3200, category: "clothing", inStock: true, description: "Premium quality kanzu for men", image: "/images/kanzu.jpg", rating: 4.8 },
    { id: 6, name: "Evening Gown", price: 6500, category: "clothing", inStock: true, description: "Stunning evening gown for special occasions", image: "/images/gown.jpg", rating: 5.0 },
    { id: 7, name: "Hoodie Sweatshirt", price: 2200, category: "clothing", inStock: true, description: "Cozy hoodie for casual days", image: "/images/hoodie.jpg", rating: 4.6 },
    { id: 8, name: "Denim Jeans", price: 2800, category: "clothing", inStock: true, description: "Classic denim jeans for men and women", image: "/images/jeans.jpg", rating: 4.7 },
    { id: 9, name: "Swimwear Set", price: 1900, category: "clothing", inStock: true, description: "Stylish swimwear for beach days", image: "/images/swimwear.jpg", rating: 4.5 },
    { id: 10, name: "Pajama Set", price: 1600, category: "clothing", inStock: true, description: "Comfortable cotton pajamas", image: "/images/pajama.jpg", rating: 4.8 },
    
    // Accessories (10 products) - IDs 11-20
    { id: 11, name: "Silver Necklace", price: 1200, category: "accessories", inStock: true, description: "Elegant silver chain necklace", image: "/images/necklace.jpg", rating: 4.7 },
    { id: 12, name: "Leather Handbag", price: 3800, category: "accessories", inStock: true, description: "Genuine leather handbag", image: "/images/bag.jpg", rating: 4.9 },
    { id: 13, name: "Sunglasses", price: 1500, category: "accessories", inStock: true, description: "UV protection sunglasses", image: "/images/sunglasses.jpg", rating: 4.6 },
    { id: 14, name: "Wrist Watch", price: 4200, category: "accessories", inStock: true, description: "Elegant analog watch", image: "/images/watch.jpg", rating: 4.8 },
    { id: 15, name: "Scarf Set", price: 800, category: "accessories", inStock: true, description: "Beautiful silk scarves", image: "/images/scarf.jpg", rating: 4.5 },
    { id: 16, name: "Belt Collection", price: 950, category: "accessories", inStock: true, description: "Genuine leather belt", image: "/images/belt.jpg", rating: 4.4 },
    { id: 17, name: "Earrings Set", price: 650, category: "accessories", inStock: true, description: "Beautiful stud earrings", image: "/images/earrings.jpg", rating: 4.7 },
    { id: 18, name: "Bracelet", price: 550, category: "accessories", inStock: true, description: "Silver charm bracelet", image: "/images/bracelet.jpg", rating: 4.6 },
    { id: 19, name: "Wallet", price: 1100, category: "accessories", inStock: true, description: "Leather wallet with card slots", image: "/images/wallet.jpg", rating: 4.8 },
    { id: 20, name: "Hat Collection", price: 750, category: "accessories", inStock: true, description: "Stylish fedora hat", image: "/images/hat.jpg", rating: 4.5 },
    
    // Phones (8 products) - IDs 21-28
    { id: 21, name: "Smartphone X", price: 25000, category: "phones", inStock: true, description: "Latest smartphone with amazing camera", image: "/images/smartphone.jpg", rating: 4.9 },
    { id: 22, name: "Budget Phone", price: 8500, category: "phones", inStock: true, description: "Great value smartphone", image: "/images/budgetphone.jpg", rating: 4.6 },
    { id: 23, name: "Premium Phone Pro", price: 45000, category: "phones", inStock: true, description: "Flagship phone with all features", image: "/images/premiumphone.jpg", rating: 5.0 },
    { id: 24, name: "Phone Accessories Kit", price: 2000, category: "phones", inStock: true, description: "Case, screen protector, charger", image: "/images/phonekit.jpg", rating: 4.7 },
    { id: 25, name: "Wireless Earbuds", price: 3200, category: "phones", inStock: true, description: "Bluetooth earbuds with case", image: "/images/earbuds.jpg", rating: 4.8 },
    { id: 26, name: "Power Bank", price: 1800, category: "phones", inStock: true, description: "10,000mAh power bank", image: "/images/powerbank.jpg", rating: 4.6 },
    { id: 27, name: "Phone Stand", price: 450, category: "phones", inStock: true, description: "Adjustable phone stand", image: "/images/stand.jpg", rating: 4.4 },
    { id: 28, name: "Selfie Light", price: 1200, category: "phones", inStock: true, description: "Ring light for perfect photos", image: "/images/selfielight.jpg", rating: 4.7 },
    
    // Dolls (10 products) - IDs 29-38
    { id: 29, name: "Barbie Doll", price: 1800, category: "dolls", inStock: true, description: "Classic Barbie doll", image: "/images/barbie.jpg", rating: 4.9 },
    { id: 30, name: "Baby Doll Set", price: 2200, category: "dolls", inStock: true, description: "Cute baby doll with accessories", image: "/images/babydoll.jpg", rating: 4.8 },
    { id: 31, name: "Teddy Bear Large", price: 2800, category: "dolls", inStock: true, description: "Huge soft teddy bear", image: "/images/teddybear.jpg", rating: 5.0 },
    { id: 32, name: "Princess Doll", price: 1600, category: "dolls", inStock: true, description: "Beautiful princess doll", image: "/images/princessdoll.jpg", rating: 4.7 },
    { id: 33, name: "Animal Set", price: 1200, category: "dolls", inStock: true, description: "Set of 6 mini animals", image: "/images/animalset.jpg", rating: 4.8 },
    { id: 34, name: "Dollhouse", price: 4500, category: "dolls", inStock: true, description: "Beautiful dollhouse with furniture", image: "/images/dollhouse.jpg", rating: 4.9 },
    { id: 35, name: "Stuffed Unicorn", price: 1900, category: "dolls", inStock: true, description: "Magical unicorn plush", image: "/images/unicorn.jpg", rating: 4.9 },
    { id: 36, name: "Doll Clothes Set", price: 750, category: "dolls", inStock: true, description: "5 outfits for dolls", image: "/images/dollclothes.jpg", rating: 4.6 },
    { id: 37, name: "Remote Control Car", price: 3200, category: "dolls", inStock: true, description: "RC car for kids", image: "/images/rccar.jpg", rating: 4.7 },
    { id: 38, name: "Puzzle Set", price: 550, category: "dolls", inStock: true, description: "Educational puzzle for kids", image: "/images/puzzle.jpg", rating: 4.8 },
    
    // Flowers (8 products) - IDs 39-46
    { id: 39, name: "Rose Bouquet", price: 2500, category: "flowers", inStock: true, description: "12 red roses bouquet", image: "/images/roses.jpg", rating: 4.9 },
    { id: 40, name: "Mixed Flowers", price: 1800, category: "flowers", inStock: true, description: "Colorful mixed flower arrangement", image: "/images/mixedflowers.jpg", rating: 4.8 },
    { id: 41, name: "Lily Bouquet", price: 2200, category: "flowers", inStock: true, description: "Elegant white lilies", image: "/images/lilies.jpg", rating: 4.7 },
    { id: 42, name: "Sunflower Bunch", price: 1500, category: "flowers", inStock: true, description: "Bright sunflower bouquet", image: "/images/sunflowers.jpg", rating: 4.8 },
    { id: 43, name: "Orchid Plant", price: 3500, category: "flowers", inStock: true, description: "Live orchid in pot", image: "/images/orchid.jpg", rating: 4.9 },
    { id: 44, name: "Flower Box", price: 2800, category: "flowers", inStock: true, description: "Premium flower arrangement in box", image: "/images/flowerbox.jpg", rating: 5.0 },
    { id: 45, name: "Tulips Set", price: 1900, category: "flowers", inStock: true, description: "20 tulips bouquet", image: "/images/tulips.jpg", rating: 4.7 },
    { id: 46, name: "Dried Flowers", price: 1600, category: "flowers", inStock: true, description: "Preserved dried flowers", image: "/images/driedflowers.jpg", rating: 4.6 },
    
    // Food/Cakes (8 products) - IDs 47-54
    { id: 47, name: "Birthday Cake", price: 3200, category: "food", inStock: true, description: "Delicious chocolate cake", image: "/images/birthdaycake.jpg", rating: 4.9 },
    { id: 48, name: "Cupcake Set", price: 1200, category: "food", inStock: true, description: "12 assorted cupcakes", image: "/images/cupcakes.jpg", rating: 4.8 },
    { id: 49, name: "Wedding Cake", price: 8500, category: "food", inStock: true, description: "3-tier wedding cake", image: "/images/weddingcake.jpg", rating: 5.0 },
    { id: 50, name: "Chocolate Box", price: 950, category: "food", inStock: true, description: "Premium Belgian chocolates", image: "/images/chocolates.jpg", rating: 4.9 },
    { id: 51, name: "Fruit Basket", price: 2200, category: "food", inStock: true, description: "Fresh fruit selection", image: "/images/fruitbasket.jpg", rating: 4.7 },
    { id: 52, name: "Cookie Jar", price: 850, category: "food", inStock: true, description: "Homemade cookies jar", image: "/images/cookies.jpg", rating: 4.8 },
    { id: 53, name: "Macaron Box", price: 1400, category: "food", inStock: true, description: "12 French macarons", image: "/images/macarons.jpg", rating: 4.9 },
    { id: 54, name: "Hampers Set", price: 4200, category: "food", inStock: true, description: "Luxury gift hamper", image: "/images/hamper.jpg", rating: 4.9 },
    
    // Wigs (8 products) - IDs 55-62
    { id: 55, name: "Lace Front Wig", price: 5500, category: "wigs", inStock: true, description: "Human hair lace front", image: "/images/lacewig.jpg", rating: 4.8 },
    { id: 56, name: "Curly Wig", price: 3800, category: "wigs", inStock: true, description: "Beautiful curly style", image: "/images/curlywig.jpg", rating: 4.7 },
    { id: 57, name: "Short Bob Wig", price: 2900, category: "wigs", inStock: true, description: "Chic bob hairstyle", image: "/images/bobwig.jpg", rating: 4.6 },
    { id: 58, name: "Long Straight Wig", price: 4800, category: "wigs", inStock: true, description: "Silky long hair", image: "/images/longwig.jpg", rating: 4.9 },
    { id: 59, name: "Colored Wig", price: 3500, category: "wigs", inStock: true, description: "Pink colored wig", image: "/images/coloredwig.jpg", rating: 4.7 },
    { id: 60, name: "Wig Cap Set", price: 450, category: "wigs", inStock: true, description: "5 wig caps", image: "/images/wigcap.jpg", rating: 4.5 },
    { id: 61, name: "Wig Stand", price: 650, category: "wigs", inStock: true, description: "Adjustable wig stand", image: "/images/wigstand.jpg", rating: 4.6 },
    { id: 62, name: "Wig Care Kit", price: 1200, category: "wigs", inStock: true, description: "Shampoo, conditioner, brush", image: "/images/wigkit.jpg", rating: 4.7 },
    
    // Cars (toy cars - 6 products) - IDs 63-68
    { id: 63, name: "Remote Control Car", price: 3500, category: "cars", inStock: true, description: "High-speed RC car", image: "/images/rccar.jpg", rating: 4.8 },
    { id: 64, name: "Car Model Set", price: 1800, category: "cars", inStock: true, description: "6 mini car models", image: "/images/carmodels.jpg", rating: 4.7 },
    { id: 65, name: "Truck Toy", price: 2200, category: "cars", inStock: true, description: "Large monster truck", image: "/images/truck.jpg", rating: 4.6 },
    { id: 66, name: "Race Track Set", price: 4200, category: "cars", inStock: true, description: "Complete race track with cars", image: "/images/racetrack.jpg", rating: 4.9 },
    { id: 67, name: "Pull Back Cars", price: 950, category: "cars", inStock: true, description: "Set of 4 pull-back cars", image: "/images/pullbackcars.jpg", rating: 4.7 },
    { id: 68, name: "Car Parking Set", price: 2800, category: "cars", inStock: true, description: "Multi-level parking garage", image: "/images/parkingset.jpg", rating: 4.8 },
    
    // Makeup (10 products) - IDs 69-78
    { id: 69, name: "Lipstick Set", price: 1800, category: "makeup", inStock: true, description: "10 lipstick shades", image: "/images/lipstick.jpg", rating: 4.8 },
    { id: 70, name: "Eyeshadow Palette", price: 2500, category: "makeup", inStock: true, description: "48 color eyeshadow", image: "/images/eyeshadow.jpg", rating: 4.9 },
    { id: 71, name: "Foundation Kit", price: 2200, category: "makeup", inStock: true, description: "Liquid foundation + concealer", image: "/images/foundation.jpg", rating: 4.7 },
    { id: 72, name: "Mascara Set", price: 1200, category: "makeup", inStock: true, description: "Volumizing mascara", image: "/images/mascara.jpg", rating: 4.6 },
    { id: 73, name: "Brush Set", price: 1500, category: "makeup", inStock: true, description: "12 makeup brushes", image: "/images/brushes.jpg", rating: 4.8 },
    { id: 74, name: "Highlighter Kit", price: 1400, category: "makeup", inStock: true, description: "Glow highlighter set", image: "/images/highlighter.jpg", rating: 4.9 },
    { id: 75, name: "Makeup Bag", price: 850, category: "makeup", inStock: true, description: "Travel makeup case", image: "/images/makeupbag.jpg", rating: 4.5 },
    { id: 76, name: "Nail Polish Set", price: 1100, category: "makeup", inStock: true, description: "12 nail polish colors", image: "/images/nailpolish.jpg", rating: 4.7 },
    { id: 77, name: "Makeup Remover", price: 750, category: "makeup", inStock: true, description: "Gentle makeup remover", image: "/images/remover.jpg", rating: 4.6 },
    { id: 78, name: "Face Mask Set", price: 950, category: "makeup", inStock: true, description: "5 sheet masks", image: "/images/facemask.jpg", rating: 4.8 }
];

// Shopping Cart
let cart = [];
let orders = [];
let giftRequests = [];

// ============ PUBLIC CUSTOMER ROUTES ============

app.get('/api/products', (req, res) => {
    res.json({ success: true, products: products });
});

app.get('/api/products/category/:category', (req, res) => {
    const categoryProducts = products.filter(p => p.category === req.params.category);
    res.json({ success: true, products: categoryProducts });
});

// Cart routes
app.get('/api/cart', (req, res) => {
    res.json({ success: true, cart: cart, total: calculateTotal() });
});

app.post('/api/cart', (req, res) => {
    const { productId, quantity, customPrice } = req.body;
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    const existingItem = cart.find(item => item.productId === productId);
    const price = customPrice || product.price;
    
    if (existingItem) {
        existingItem.quantity += quantity || 1;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: price,
            quantity: quantity || 1,
            image: product.image
        });
    }
    
    res.json({ success: true, cart: cart, total: calculateTotal() });
});

app.delete('/api/cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    cart = cart.filter(item => item.productId !== productId);
    res.json({ success: true, cart: cart, total: calculateTotal() });
});

app.delete('/api/cart', (req, res) => {
    cart = [];
    res.json({ success: true, message: "Cart cleared" });
});

function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Place order
app.post('/api/orders', (req, res) => {
    const { customerName, phoneNumber, shippingAddress, paymentMethod } = req.body;
    
    if (!customerName || !shippingAddress || !phoneNumber) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    
    if (cart.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    
    const orderId = orders.length + 1;
    const order = {
        id: orderId,
        customerName,
        phoneNumber,
        shippingAddress,
        paymentMethod: paymentMethod || 'Cash on Delivery',
        items: [...cart],
        total: calculateTotal(),
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

// Gift requests
app.post('/api/gift-requests', (req, res) => {
    const { senderName, senderEmail, recipientName, occasion, message } = req.body;
    
    const newRequest = {
        id: giftRequests.length + 1,
        senderName,
        senderEmail: senderEmail || '',
        recipientName,
        occasion: occasion || 'General',
        message: message || '',
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    giftRequests.push(newRequest);
    res.status(201).json({ success: true, giftRequest: newRequest });
});

// ============ ADMIN ROUTES ============

app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, message: "Login successful", token: "admin-authenticated" });
    } else {
        res.status(401).json({ success: false, message: "Invalid password" });
    }
});

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin-authenticated') {
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
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const order = orders.find(o => o.id === id);
    
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }
    
    order.status = status;
    res.json({ success: true, order: order });
});

app.delete('/api/admin/orders/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    orders = orders.filter(o => o.id !== id);
    res.json({ success: true, message: "Order deleted" });
});

app.delete('/api/admin/gift-requests/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    giftRequests = giftRequests.filter(r => r.id !== id);
    res.json({ success: true, message: "Gift request deleted" });
});

// Update product price
app.put('/api/admin/products/:id/price', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const { price } = req.body;
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    product.price = price;
    console.log(`✅ Price updated: ${product.name} -> KES ${price}`);
    res.json({ success: true, product: product });
});

// Add product with image
app.post('/api/admin/products', requireAuth, (req, res) => {
    const { name, price, category, description, imageName } = req.body;
    
    const newProduct = {
        id: products.length + 1,
        name: name,
        price: parseInt(price),
        category: category,
        description: description,
        image: imageName ? `/images/${imageName}` : '/images/placeholder.jpg',
        inStock: true,
        rating: 5.0
    };
    
    products.push(newProduct);
    console.log(`✅ New product added: ${name}`);
    res.status(201).json({ success: true, product: newProduct });
});

// Delete product
app.delete('/api/admin/products/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    console.log(`✅ Product deleted: ID ${id}`);
    res.json({ success: true, message: "Product deleted" });
});

// Serve pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'customer.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🛍️  Customer Shop: http://localhost:${PORT}`);
    console.log(`🔐 Admin Panel: http://localhost:${PORT}/admin`);
    console.log(`🔑 Admin Password: ${ADMIN_PASSWORD}`);
    console.log(`📦 Total Products: ${products.length}`);
});