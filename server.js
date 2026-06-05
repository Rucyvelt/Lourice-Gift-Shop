const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Admin password
const ADMIN_PASSWORD = '@Rucylora.com';

// ============ COMPLETE PRODUCTS - ALL 78 ============
let products = [
    // CLOTHING (1-10)
    { id: 1, name: "African Print Maxi Dress", price: 3500, category: "clothing", inStock: true, description: "Beautiful Ankara print maxi dress perfect for parties", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Maxi+Dress", rating: 4.8 },
    { id: 2, name: "Men's Casual Shirt", price: 1800, category: "clothing", inStock: true, description: "Comfortable cotton shirt for everyday wear", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Casual+Shirt", rating: 4.5 },
    { id: 3, name: "Women's Blazer", price: 4500, category: "clothing", inStock: true, description: "Elegant blazer for office and formal events", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Blazer", rating: 4.7 },
    { id: 4, name: "Kids Party Dress", price: 1500, category: "clothing", inStock: true, description: "Cute floral dress for little girls", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Kids+Dress", rating: 4.9 },
    { id: 5, name: "Traditional Kanzu", price: 3200, category: "clothing", inStock: true, description: "Premium quality kanzu for men", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Kanzu", rating: 4.8 },
    { id: 6, name: "Evening Gown", price: 6500, category: "clothing", inStock: true, description: "Stunning evening gown for special occasions", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Evening+Gown", rating: 5.0 },
    { id: 7, name: "Hoodie Sweatshirt", price: 2200, category: "clothing", inStock: true, description: "Cozy hoodie for casual days", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Hoodie", rating: 4.6 },
    { id: 8, name: "Denim Jeans", price: 2800, category: "clothing", inStock: true, description: "Classic denim jeans for men and women", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Jeans", rating: 4.7 },
    { id: 9, name: "Swimwear Set", price: 1900, category: "clothing", inStock: true, description: "Stylish swimwear for beach days", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Swimwear", rating: 4.5 },
    { id: 10, name: "Pajama Set", price: 1600, category: "clothing", inStock: true, description: "Comfortable cotton pajamas", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Pajama", rating: 4.8 },

    // ACCESSORIES (11-20)
    { id: 11, name: "Silver Necklace", price: 1200, category: "accessories", inStock: true, description: "Elegant silver chain necklace", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Necklace", rating: 4.7 },
    { id: 12, name: "Leather Handbag", price: 3800, category: "accessories", inStock: true, description: "Genuine leather handbag", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Handbag", rating: 4.9 },
    { id: 13, name: "Sunglasses", price: 1500, category: "accessories", inStock: true, description: "UV protection sunglasses", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Sunglasses", rating: 4.6 },
    { id: 14, name: "Wrist Watch", price: 4200, category: "accessories", inStock: true, description: "Elegant analog watch", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Watch", rating: 4.8 },
    { id: 15, name: "Scarf Set", price: 800, category: "accessories", inStock: true, description: "Beautiful silk scarves", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Scarf", rating: 4.5 },
    { id: 16, name: "Belt Collection", price: 950, category: "accessories", inStock: true, description: "Genuine leather belt", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Belt", rating: 4.4 },
    { id: 17, name: "Earrings Set", price: 650, category: "accessories", inStock: true, description: "Beautiful stud earrings", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Earrings", rating: 4.7 },
    { id: 18, name: "Bracelet", price: 550, category: "accessories", inStock: true, description: "Silver charm bracelet", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Bracelet", rating: 4.6 },
    { id: 19, name: "Wallet", price: 1100, category: "accessories", inStock: true, description: "Leather wallet with card slots", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Wallet", rating: 4.8 },
    { id: 20, name: "Hat Collection", price: 750, category: "accessories", inStock: true, description: "Stylish fedora hat", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Hat", rating: 4.5 },

    // PHONES (21-28)
    { id: 21, name: "Smartphone X", price: 25000, category: "phones", inStock: true, description: "Latest smartphone with amazing camera", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Smartphone", rating: 4.9 },
    { id: 22, name: "Budget Phone", price: 8500, category: "phones", inStock: true, description: "Great value smartphone", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Budget+Phone", rating: 4.6 },
    { id: 23, name: "Premium Phone Pro", price: 45000, category: "phones", inStock: true, description: "Flagship phone with all features", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Premium+Phone", rating: 5.0 },
    { id: 24, name: "Phone Accessories Kit", price: 2000, category: "phones", inStock: true, description: "Case, screen protector, charger", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Phone+Kit", rating: 4.7 },
    { id: 25, name: "Wireless Earbuds", price: 3200, category: "phones", inStock: true, description: "Bluetooth earbuds with case", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Earbuds", rating: 4.8 },
    { id: 26, name: "Power Bank", price: 1800, category: "phones", inStock: true, description: "10,000mAh power bank", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Power+Bank", rating: 4.6 },
    { id: 27, name: "Phone Stand", price: 450, category: "phones", inStock: true, description: "Adjustable phone stand", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Phone+Stand", rating: 4.4 },
    { id: 28, name: "Selfie Light", price: 1200, category: "phones", inStock: true, description: "Ring light for perfect photos", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Selfie+Light", rating: 4.7 },

    // DOLLS (29-38)
    { id: 29, name: "Barbie Doll", price: 1800, category: "dolls", inStock: true, description: "Classic Barbie doll", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Barbie", rating: 4.9 },
    { id: 30, name: "Baby Doll Set", price: 2200, category: "dolls", inStock: true, description: "Cute baby doll with accessories", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Baby+Doll", rating: 4.8 },
    { id: 31, name: "Teddy Bear Large", price: 2800, category: "dolls", inStock: true, description: "Huge soft teddy bear", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Teddy+Bear", rating: 5.0 },
    { id: 32, name: "Princess Doll", price: 1600, category: "dolls", inStock: true, description: "Beautiful princess doll", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Princess", rating: 4.7 },
    { id: 33, name: "Animal Set", price: 1200, category: "dolls", inStock: true, description: "Set of 6 mini animals", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Animal+Set", rating: 4.8 },
    { id: 34, name: "Dollhouse", price: 4500, category: "dolls", inStock: true, description: "Beautiful dollhouse with furniture", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Dollhouse", rating: 4.9 },
    { id: 35, name: "Stuffed Unicorn", price: 1900, category: "dolls", inStock: true, description: "Magical unicorn plush", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Unicorn", rating: 4.9 },
    { id: 36, name: "Doll Clothes Set", price: 750, category: "dolls", inStock: true, description: "5 outfits for dolls", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Doll+Clothes", rating: 4.6 },
    { id: 37, name: "Remote Control Car", price: 3200, category: "dolls", inStock: true, description: "RC car for kids", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=RC+Car", rating: 4.7 },
    { id: 38, name: "Puzzle Set", price: 550, category: "dolls", inStock: true, description: "Educational puzzle for kids", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Puzzle", rating: 4.8 },

    // FLOWERS (39-46)
    { id: 39, name: "Rose Bouquet", price: 2500, category: "flowers", inStock: true, description: "12 red roses bouquet", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Roses", rating: 4.9 },
    { id: 40, name: "Mixed Flowers", price: 1800, category: "flowers", inStock: true, description: "Colorful mixed flower arrangement", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Mixed+Flowers", rating: 4.8 },
    { id: 41, name: "Lily Bouquet", price: 2200, category: "flowers", inStock: true, description: "Elegant white lilies", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Lilies", rating: 4.7 },
    { id: 42, name: "Sunflower Bunch", price: 1500, category: "flowers", inStock: true, description: "Bright sunflower bouquet", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Sunflowers", rating: 4.8 },
    { id: 43, name: "Orchid Plant", price: 3500, category: "flowers", inStock: true, description: "Live orchid in pot", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Orchid", rating: 4.9 },
    { id: 44, name: "Flower Box", price: 2800, category: "flowers", inStock: true, description: "Premium flower arrangement in box", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Flower+Box", rating: 5.0 },
    { id: 45, name: "Tulips Set", price: 1900, category: "flowers", inStock: true, description: "20 tulips bouquet", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Tulips", rating: 4.7 },
    { id: 46, name: "Dried Flowers", price: 1600, category: "flowers", inStock: true, description: "Preserved dried flowers", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Dried+Flowers", rating: 4.6 },

    // FOOD/CAKES (47-54)
    { id: 47, name: "Birthday Cake", price: 3200, category: "food", inStock: true, description: "Delicious chocolate cake", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Cake", rating: 4.9 },
    { id: 48, name: "Cupcake Set", price: 1200, category: "food", inStock: true, description: "12 assorted cupcakes", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Cupcakes", rating: 4.8 },
    { id: 49, name: "Wedding Cake", price: 8500, category: "food", inStock: true, description: "3-tier wedding cake", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Wedding+Cake", rating: 5.0 },
    { id: 50, name: "Chocolate Box", price: 950, category: "food", inStock: true, description: "Premium Belgian chocolates", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Chocolates", rating: 4.9 },
    { id: 51, name: "Fruit Basket", price: 2200, category: "food", inStock: true, description: "Fresh fruit selection", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Fruit+Basket", rating: 4.7 },
    { id: 52, name: "Cookie Jar", price: 850, category: "food", inStock: true, description: "Homemade cookies jar", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Cookies", rating: 4.8 },
    { id: 53, name: "Macaron Box", price: 1400, category: "food", inStock: true, description: "12 French macarons", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Macarons", rating: 4.9 },
    { id: 54, name: "Hampers Set", price: 4200, category: "food", inStock: true, description: "Luxury gift hamper", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Hamper", rating: 4.9 },

    // WIGS (55-62)
    { id: 55, name: "Lace Front Wig", price: 5500, category: "wigs", inStock: true, description: "Human hair lace front", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Lace+Wig", rating: 4.8 },
    { id: 56, name: "Curly Wig", price: 3800, category: "wigs", inStock: true, description: "Beautiful curly style", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Curly+Wig", rating: 4.7 },
    { id: 57, name: "Short Bob Wig", price: 2900, category: "wigs", inStock: true, description: "Chic bob hairstyle", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Bob+Wig", rating: 4.6 },
    { id: 58, name: "Long Straight Wig", price: 4800, category: "wigs", inStock: true, description: "Silky long hair", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Long+Wig", rating: 4.9 },
    { id: 59, name: "Colored Wig", price: 3500, category: "wigs", inStock: true, description: "Pink colored wig", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Colored+Wig", rating: 4.7 },
    { id: 60, name: "Wig Cap Set", price: 450, category: "wigs", inStock: true, description: "5 wig caps", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Wig+Cap", rating: 4.5 },
    { id: 61, name: "Wig Stand", price: 650, category: "wigs", inStock: true, description: "Adjustable wig stand", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Wig+Stand", rating: 4.6 },
    { id: 62, name: "Wig Care Kit", price: 1200, category: "wigs", inStock: true, description: "Shampoo, conditioner, brush", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Wig+Kit", rating: 4.7 },

    // TOY CARS (63-68)
    { id: 63, name: "Remote Control Car", price: 3500, category: "cars", inStock: true, description: "High-speed RC car", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=RC+Car", rating: 4.8 },
    { id: 64, name: "Car Model Set", price: 1800, category: "cars", inStock: true, description: "6 mini car models", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Car+Models", rating: 4.7 },
    { id: 65, name: "Truck Toy", price: 2200, category: "cars", inStock: true, description: "Large monster truck", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Truck", rating: 4.6 },
    { id: 66, name: "Race Track Set", price: 4200, category: "cars", inStock: true, description: "Complete race track with cars", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Race+Track", rating: 4.9 },
    { id: 67, name: "Pull Back Cars", price: 950, category: "cars", inStock: true, description: "Set of 4 pull-back cars", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Pull+Back+Cars", rating: 4.7 },
    { id: 68, name: "Car Parking Set", price: 2800, category: "cars", inStock: true, description: "Multi-level parking garage", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Parking+Set", rating: 4.8 },

    // MAKEUP (69-78)
    { id: 69, name: "Lipstick Set", price: 1800, category: "makeup", inStock: true, description: "10 lipstick shades", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Lipstick", rating: 4.8 },
    { id: 70, name: "Eyeshadow Palette", price: 2500, category: "makeup", inStock: true, description: "48 color eyeshadow", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Eyeshadow", rating: 4.9 },
    { id: 71, name: "Foundation Kit", price: 2200, category: "makeup", inStock: true, description: "Liquid foundation + concealer", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Foundation", rating: 4.7 },
    { id: 72, name: "Mascara Set", price: 1200, category: "makeup", inStock: true, description: "Volumizing mascara", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Mascara", rating: 4.6 },
    { id: 73, name: "Brush Set", price: 1500, category: "makeup", inStock: true, description: "12 makeup brushes", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Brushes", rating: 4.8 },
    { id: 74, name: "Highlighter Kit", price: 1400, category: "makeup", inStock: true, description: "Glow highlighter set", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Highlighter", rating: 4.9 },
    { id: 75, name: "Makeup Bag", price: 850, category: "makeup", inStock: true, description: "Travel makeup case", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Makeup+Bag", rating: 4.5 },
    { id: 76, name: "Nail Polish Set", price: 1100, category: "makeup", inStock: true, description: "12 nail polish colors", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Nail+Polish", rating: 4.7 },
    { id: 77, name: "Makeup Remover", price: 750, category: "makeup", inStock: true, description: "Gentle makeup remover", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Remover", rating: 4.6 },
    { id: 78, name: "Face Mask Set", price: 950, category: "makeup", inStock: true, description: "5 sheet masks", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Face+Mask", rating: 4.8 }
];

let cart = [];
let orders = [];
let giftRequests = [];

// ============ CUSTOMER API ROUTES ============

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
    const productId = parseInt(req.params.productId);
    cart = cart.filter(item => item.productId !== productId);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.json({ success: true, cart: cart, total: total });
});

app.post('/api/orders', (req, res) => {
    const { customerName, phoneNumber, shippingAddress, paymentMethod } = req.body;
    
    if (!customerName || !shippingAddress) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    
    if (cart.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
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
        orderDate: new Date().toISOString(),
        messages: []
    };
    
    orders.push(order);
    cart = [];
    
    res.status(201).json({ success: true, order: order });
});

app.get('/api/orders', (req, res) => {
    res.json({ success: true, orders: orders });
});

app.post('/api/gift-requests', (req, res) => {
    const newRequest = {
        id: giftRequests.length + 1,
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    giftRequests.push(newRequest);
    res.status(201).json({ success: true, giftRequest: newRequest });
});

// ============ ADMIN ROUTES ============

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
    const id = parseInt(req.params.id);
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = req.body.status;
    }
    res.json({ success: true });
});

app.delete('/api/admin/orders/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    orders = orders.filter(o => o.id !== id);
    res.json({ success: true });
});

app.delete('/api/admin/gift-requests/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    giftRequests = giftRequests.filter(r => r.id !== id);
    res.json({ success: true });
});

// ============ SEND MESSAGE TO CUSTOMER (NEW FEATURE) ============
app.post('/api/admin/orders/:id/message', requireAuth, (req, res) => {
    const orderId = parseInt(req.params.id);
    const { message } = req.body;
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }
    
    if (!order.messages) {
        order.messages = [];
    }
    
    order.messages.push({
        id: order.messages.length + 1,
        message: message,
        sentBy: 'Admin',
        sentAt: new Date().toISOString()
    });
    
    console.log(`📨 Message sent to ${order.customerName}: ${message}`);
    res.json({ success: true, message: "Message sent to customer" });
});

// Update product price
app.put('/api/admin/products/:id/price', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        product.price = req.body.price;
    }
    res.json({ success: true });
});

// Add new product
app.post('/api/admin/products', requireAuth, (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category,
        description: req.body.description,
        image: "https://placehold.co/400x300/ffd9e8/ff1493?text=New",
        inStock: true,
        rating: 5.0
    };
    products.push(newProduct);
    res.status(201).json({ success: true, product: newProduct });
});

// Delete product
app.delete('/api/admin/products/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    res.json({ success: true });
});

// ============ SERVE HTML PAGES ============
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'customer.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// ============ START SERVER ============
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📦 Total Products: ${products.length}`);
    console.log(`🔑 Admin Password: ${ADMIN_PASSWORD}`);
});