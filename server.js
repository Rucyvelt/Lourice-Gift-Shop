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
// Send message to customer (NEW)
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
// ============ COMPLETE PRODUCTS - ALL 78 ============
let products = [
    // CLOTHING (1-10)
    { id: 1, name: "African Print Maxi Dress", price: 3500, category: "clothing", inStock: true, description: "Beautiful Ankara print maxi dress", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Dress", rating: 4.8 },
    { id: 2, name: "Men's Casual Shirt", price: 1800, category: "clothing", inStock: true, description: "Comfortable cotton shirt", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Shirt", rating: 4.5 },
    { id: 3, name: "Women's Blazer", price: 4500, category: "clothing", inStock: true, description: "Elegant blazer", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Blazer", rating: 4.7 },
    { id: 4, name: "Kids Party Dress", price: 1500, category: "clothing", inStock: true, description: "Cute floral dress", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=KidsDress", rating: 4.9 },
    { id: 5, name: "Traditional Kanzu", price: 3200, category: "clothing", inStock: true, description: "Premium kanzu", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Kanzu", rating: 4.8 },
    { id: 6, name: "Evening Gown", price: 6500, category: "clothing", inStock: true, description: "Stunning gown", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Gown", rating: 5.0 },
    { id: 7, name: "Hoodie", price: 2200, category: "clothing", inStock: true, description: "Cozy hoodie", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Hoodie", rating: 4.6 },
    { id: 8, name: "Denim Jeans", price: 2800, category: "clothing", inStock: true, description: "Classic jeans", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Jeans", rating: 4.7 },
    { id: 9, name: "Swimwear", price: 1900, category: "clothing", inStock: true, description: "Stylish swimwear", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Swimwear", rating: 4.5 },
    { id: 10, name: "Pajama Set", price: 1600, category: "clothing", inStock: true, description: "Comfortable pajamas", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Pajama", rating: 4.8 },

    // ACCESSORIES (11-20)
    { id: 11, name: "Silver Necklace", price: 1200, category: "accessories", inStock: true, description: "Elegant necklace", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Necklace", rating: 4.7 },
    { id: 12, name: "Leather Handbag", price: 3800, category: "accessories", inStock: true, description: "Genuine leather bag", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Handbag", rating: 4.9 },
    { id: 13, name: "Sunglasses", price: 1500, category: "accessories", inStock: true, description: "UV protection", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Sunglasses", rating: 4.6 },
    { id: 14, name: "Wrist Watch", price: 4200, category: "accessories", inStock: true, description: "Elegant watch", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Watch", rating: 4.8 },
    { id: 15, name: "Scarf Set", price: 800, category: "accessories", inStock: true, description: "Silk scarves", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Scarf", rating: 4.5 },
    { id: 16, name: "Belt", price: 950, category: "accessories", inStock: true, description: "Leather belt", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Belt", rating: 4.4 },
    { id: 17, name: "Earrings", price: 650, category: "accessories", inStock: true, description: "Stud earrings", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Earrings", rating: 4.7 },
    { id: 18, name: "Bracelet", price: 550, category: "accessories", inStock: true, description: "Charm bracelet", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Bracelet", rating: 4.6 },
    { id: 19, name: "Wallet", price: 1100, category: "accessories", inStock: true, description: "Leather wallet", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Wallet", rating: 4.8 },
    { id: 20, name: "Hat", price: 750, category: "accessories", inStock: true, description: "Fedora hat", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Hat", rating: 4.5 },

    // PHONES (21-28)
    { id: 21, name: "Smartphone X", price: 25000, category: "phones", inStock: true, description: "Latest smartphone", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Phone", rating: 4.9 },
    { id: 22, name: "Budget Phone", price: 8500, category: "phones", inStock: true, description: "Great value", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=BudgetPhone", rating: 4.6 },
    { id: 23, name: "Premium Phone", price: 45000, category: "phones", inStock: true, description: "Flagship phone", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=PremiumPhone", rating: 5.0 },
    { id: 24, name: "Phone Kit", price: 2000, category: "phones", inStock: true, description: "Case + charger", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=PhoneKit", rating: 4.7 },
    { id: 25, name: "Earbuds", price: 3200, category: "phones", inStock: true, description: "Wireless earbuds", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Earbuds", rating: 4.8 },
    { id: 26, name: "Power Bank", price: 1800, category: "phones", inStock: true, description: "10000mAh", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=PowerBank", rating: 4.6 },
    { id: 27, name: "Phone Stand", price: 450, category: "phones", inStock: true, description: "Adjustable stand", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Stand", rating: 4.4 },
    { id: 28, name: "Selfie Light", price: 1200, category: "phones", inStock: true, description: "Ring light", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=SelfieLight", rating: 4.7 },

    // DOLLS (29-38)
    { id: 29, name: "Barbie Doll", price: 1800, category: "dolls", inStock: true, description: "Classic Barbie", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Barbie", rating: 4.9 },
    { id: 30, name: "Baby Doll", price: 2200, category: "dolls", inStock: true, description: "Baby doll set", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=BabyDoll", rating: 4.8 },
    { id: 31, name: "Teddy Bear", price: 2800, category: "dolls", inStock: true, description: "Large teddy bear", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Teddy", rating: 5.0 },
    { id: 32, name: "Princess Doll", price: 1600, category: "dolls", inStock: true, description: "Princess doll", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Princess", rating: 4.7 },
    { id: 33, name: "Animal Set", price: 1200, category: "dolls", inStock: true, description: "6 mini animals", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Animals", rating: 4.8 },
    { id: 34, name: "Dollhouse", price: 4500, category: "dolls", inStock: true, description: "With furniture", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Dollhouse", rating: 4.9 },
    { id: 35, name: "Unicorn", price: 1900, category: "dolls", inStock: true, description: "Stuffed unicorn", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Unicorn", rating: 4.9 },
    { id: 36, name: "Doll Clothes", price: 750, category: "dolls", inStock: true, description: "5 outfits", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=DollClothes", rating: 4.6 },
    { id: 37, name: "RC Car", price: 3200, category: "dolls", inStock: true, description: "Remote control car", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=RCCar", rating: 4.7 },
    { id: 38, name: "Puzzle", price: 550, category: "dolls", inStock: true, description: "Educational puzzle", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Puzzle", rating: 4.8 },

    // FLOWERS (39-46)
    { id: 39, name: "Rose Bouquet", price: 2500, category: "flowers", inStock: true, description: "12 red roses", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Roses", rating: 4.9 },
    { id: 40, name: "Mixed Flowers", price: 1800, category: "flowers", inStock: true, description: "Colorful mix", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=MixedFlowers", rating: 4.8 },
    { id: 41, name: "Lily Bouquet", price: 2200, category: "flowers", inStock: true, description: "White lilies", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Lilies", rating: 4.7 },
    { id: 42, name: "Sunflowers", price: 1500, category: "flowers", inStock: true, description: "Bright sunflowers", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Sunflowers", rating: 4.8 },
    { id: 43, name: "Orchid", price: 3500, category: "flowers", inStock: true, description: "Live orchid", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Orchid", rating: 4.9 },
    { id: 44, name: "Flower Box", price: 2800, category: "flowers", inStock: true, description: "Premium box", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=FlowerBox", rating: 5.0 },
    { id: 45, name: "Tulips", price: 1900, category: "flowers", inStock: true, description: "20 tulips", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Tulips", rating: 4.7 },
    { id: 46, name: "Dried Flowers", price: 1600, category: "flowers", inStock: true, description: "Preserved", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=DriedFlowers", rating: 4.6 },

    // FOOD (47-54)
    { id: 47, name: "Birthday Cake", price: 3200, category: "food", inStock: true, description: "Chocolate cake", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Cake", rating: 4.9 },
    { id: 48, name: "Cupcakes", price: 1200, category: "food", inStock: true, description: "12 cupcakes", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Cupcakes", rating: 4.8 },
    { id: 49, name: "Wedding Cake", price: 8500, category: "food", inStock: true, description: "3-tier cake", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=WeddingCake", rating: 5.0 },
    { id: 50, name: "Chocolates", price: 950, category: "food", inStock: true, description: "Belgian chocolates", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Chocolates", rating: 4.9 },
    { id: 51, name: "Fruit Basket", price: 2200, category: "food", inStock: true, description: "Fresh fruits", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=FruitBasket", rating: 4.7 },
    { id: 52, name: "Cookies", price: 850, category: "food", inStock: true, description: "Cookie jar", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Cookies", rating: 4.8 },
    { id: 53, name: "Macarons", price: 1400, category: "food", inStock: true, description: "12 macarons", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Macarons", rating: 4.9 },
    { id: 54, name: "Hamper", price: 4200, category: "food", inStock: true, description: "Luxury hamper", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Hamper", rating: 4.9 },

    // WIGS (55-62)
    { id: 55, name: "Lace Front Wig", price: 5500, category: "wigs", inStock: true, description: "Human hair", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=LaceWig", rating: 4.8 },
    { id: 56, name: "Curly Wig", price: 3800, category: "wigs", inStock: true, description: "Curly style", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=CurlyWig", rating: 4.7 },
    { id: 57, name: "Bob Wig", price: 2900, category: "wigs", inStock: true, description: "Short bob", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=BobWig", rating: 4.6 },
    { id: 58, name: "Long Wig", price: 4800, category: "wigs", inStock: true, description: "Long straight", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=LongWig", rating: 4.9 },
    { id: 59, name: "Colored Wig", price: 3500, category: "wigs", inStock: true, description: "Pink wig", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=ColoredWig", rating: 4.7 },
    { id: 60, name: "Wig Cap", price: 450, category: "wigs", inStock: true, description: "5 caps", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=WigCap", rating: 4.5 },
    { id: 61, name: "Wig Stand", price: 650, category: "wigs", inStock: true, description: "Adjustable", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=WigStand", rating: 4.6 },
    { id: 62, name: "Wig Kit", price: 1200, category: "wigs", inStock: true, description: "Care kit", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=WigKit", rating: 4.7 },

    // CARS (63-68)
    { id: 63, name: "RC Car", price: 3500, category: "cars", inStock: true, description: "High-speed", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=RCCar", rating: 4.8 },
    { id: 64, name: "Car Models", price: 1800, category: "cars", inStock: true, description: "6 mini cars", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=CarModels", rating: 4.7 },
    { id: 65, name: "Truck", price: 2200, category: "cars", inStock: true, description: "Monster truck", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Truck", rating: 4.6 },
    { id: 66, name: "Race Track", price: 4200, category: "cars", inStock: true, description: "Complete track", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=RaceTrack", rating: 4.9 },
    { id: 67, name: "Pull Back Cars", price: 950, category: "cars", inStock: true, description: "4 cars", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=PullBack", rating: 4.7 },
    { id: 68, name: "Parking Set", price: 2800, category: "cars", inStock: true, description: "Parking garage", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Parking", rating: 4.8 },

    // MAKEUP (69-78)
    { id: 69, name: "Lipstick Set", price: 1800, category: "makeup", inStock: true, description: "10 shades", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Lipstick", rating: 4.8 },
    { id: 70, name: "Eyeshadow", price: 2500, category: "makeup", inStock: true, description: "48 colors", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Eyeshadow", rating: 4.9 },
    { id: 71, name: "Foundation", price: 2200, category: "makeup", inStock: true, description: "Liquid foundation", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Foundation", rating: 4.7 },
    { id: 72, name: "Mascara", price: 1200, category: "makeup", inStock: true, description: "Volumizing", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Mascara", rating: 4.6 },
    { id: 73, name: "Brush Set", price: 1500, category: "makeup", inStock: true, description: "12 brushes", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Brushes", rating: 4.8 },
    { id: 74, name: "Highlighter", price: 1400, category: "makeup", inStock: true, description: "Glow kit", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Highlighter", rating: 4.9 },
    { id: 75, name: "Makeup Bag", price: 850, category: "makeup", inStock: true, description: "Travel case", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=MakeupBag", rating: 4.5 },
    { id: 76, name: "Nail Polish", price: 1100, category: "makeup", inStock: true, description: "12 colors", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=NailPolish", rating: 4.7 },
    { id: 77, name: "Remover", price: 750, category: "makeup", inStock: true, description: "Gentle remover", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=Remover", rating: 4.6 },
    { id: 78, name: "Face Mask", price: 950, category: "makeup", inStock: true, description: "5 sheet masks", image: "https://placehold.co/400x300/ffd9e8/ff1493?text=FaceMask", rating: 4.8 }
];

let cart = [];
let orders = [];
let giftRequests = [];

// ============ API ROUTES ============
app.get('/api/products', (req, res) => {
    console.log('Products requested, sending:', products.length, 'products');
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
    if (!product) return res.status(404).json({ success: false });
    
    const existing = cart.find(item => item.productId === productId);
    if (existing) existing.quantity += quantity || 1;
    else cart.push({ productId: product.id, name: product.name, price: product.price, quantity: quantity || 1, image: product.image });
    
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
    if (!customerName || !shippingAddress) return res.status(400).json({ success: false });
    if (cart.length === 0) return res.status(400).json({ success: false });
    
    const order = { id: orders.length + 1, customerName, phoneNumber, shippingAddress, paymentMethod: paymentMethod || 'Cash on Delivery', items: [...cart], total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), status: 'pending', orderDate: new Date().toISOString() };
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
    res.status(201).json({ success: true });
});

// ============ ADMIN ROUTES ============
app.post('/api/admin/login', (req, res) => {
    if (req.body.password === ADMIN_PASSWORD) res.json({ success: true, token: 'admin-authenticated' });
    else res.status(401).json({ success: false });
});

function requireAuth(req, res, next) {
    if (req.headers.authorization !== 'Bearer admin-authenticated') return res.status(401).json({ success: false });
    next();
}

app.get('/api/admin/orders', requireAuth, (req, res) => res.json({ success: true, orders: orders }));
app.get('/api/admin/gift-requests', requireAuth, (req, res) => res.json({ success: true, giftRequests: giftRequests }));
app.put('/api/admin/orders/:id', requireAuth, (req, res) => { const o = orders.find(o => o.id === parseInt(req.params.id)); if (o) o.status = req.body.status; res.json({ success: true }); });
app.delete('/api/admin/orders/:id', requireAuth, (req, res) => { orders = orders.filter(o => o.id !== parseInt(req.params.id)); res.json({ success: true }); });
app.delete('/api/admin/gift-requests/:id', requireAuth, (req, res) => { giftRequests = giftRequests.filter(r => r.id !== parseInt(req.params.id)); res.json({ success: true }); });
app.put('/api/admin/products/:id/price', requireAuth, (req, res) => { const p = products.find(p => p.id === parseInt(req.params.id)); if (p) p.price = req.body.price; res.json({ success: true }); });
app.post('/api/admin/products', requireAuth, (req, res) => { const newProduct = { id: products.length + 1, name: req.body.name, price: parseInt(req.body.price), category: req.body.category, description: req.body.description, image: "https://placehold.co/400x300/ffd9e8/ff1493?text=New", inStock: true, rating: 5.0 }; products.push(newProduct); res.status(201).json({ success: true }); });
app.delete('/api/admin/products/:id', requireAuth, (req, res) => { products = products.filter(p => p.id !== parseInt(req.params.id)); res.json({ success: true }); });

// ============ SERVE HTML ============
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'customer.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

// ============ START ============
// Send message to customer (Admin only)
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
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📦 Total Products: ${products.length}`);
    console.log(`🔑 Admin Password: ${ADMIN_PASSWORD}`);
});