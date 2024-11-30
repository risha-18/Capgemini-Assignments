const express = require('express');
const path = require('path');
const app = express();
const port = 4000; // Changed to port 4000

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

let products = []; // In-memory storage for products

// Admin login route
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.redirect('/admin.html'); // Redirect to admin dashboard
    } else {
        res.status(401).send('<h1>Invalid admin credentials</h1><a href="/admin-login.html">Try Again</a>');
    }
});

// Register a product (admin functionality)
app.post('/admin/register-product', (req, res) => {
    const product = req.body;
    products.push(product); // Add the new product to the in-memory list
    res.redirect('/admin.html'); // Redirect back to the admin dashboard
});

// Get all products (admin functionality)
app.get('/admin/products', (req, res) => {
    res.json(products); // Send the list of products as JSON
});

// User login route
app.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'user' && password === 'user123') {
        res.redirect('/user.html'); // Redirect to user dashboard
    } else {
        res.status(401).send('<h1>Invalid user credentials</h1><a href="/user-login.html">Try Again</a>');
    }
});

// Search products (user functionality)
app.get('/search', (req, res) => {
    const { name, category } = req.query;

    // Filter products based on search criteria
    const filteredProducts = products.filter(product => {
        const matchesName = name ? product.productName.toLowerCase().includes(name.toLowerCase()) : true;
        const matchesCategory = category ? product.category.toLowerCase().includes(category.toLowerCase()) : true;
        return matchesName && matchesCategory;
    });

    res.json(filteredProducts); // Send the filtered products as JSON
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});