const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Serve the HTML file at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'BusinessManager.html'));
});

// Helper functions
function readFile(filename) {
    const filePath = path.join(DATA_DIR, filename);
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (err) {
        console.error(`Error reading ${filename}:`, err);
    }
    return null;
}

function writeFile(filename, data) {
    const filePath = path.join(DATA_DIR, filename);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error(`Error writing ${filename}:`, err);
        return false;
    }
}

// SETTINGS API
app.get('/api/settings', (req, res) => {
    const settings = readFile('settings.json') || {
        ownerName: 'Business Owner',
        darkMode: false,
        setupModalDismissed: false,
        enabledFeatures: {
            growthTrends: false,
            productPerformance: false
        }
    };
    res.json(settings);
});

app.put('/api/settings', (req, res) => {
    const settings = readFile('settings.json') || { ownerName: 'Business Owner' };
    const updated = { ...settings, ...req.body };
    if (writeFile('settings.json', updated)) {
        res.json({ success: true, settings: updated });
    } else {
        res.status(500).json({ success: false, error: 'Failed to save settings' });
    }
});

// CUSTOMERS API
app.get('/api/customers', (req, res) => {
    const customers = readFile('customers.json') || [];
    res.json(customers);
});

app.post('/api/customers', (req, res) => {
    const customers = readFile('customers.json') || [];
    const newCustomer = {
        id: Date.now(),
        ...req.body
    };
    customers.push(newCustomer);
    if (writeFile('customers.json', customers)) {
        res.json({ success: true, customer: newCustomer });
    } else {
        res.status(500).json({ success: false, error: 'Failed to save customer' });
    }
});

app.put('/api/customers/:id', (req, res) => {
    let customers = readFile('customers.json') || [];
    const customerIndex = customers.findIndex(c => c.id === parseInt(req.params.id));

    if (customerIndex === -1) {
        return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    customers[customerIndex] = { ...customers[customerIndex], ...req.body };

    if (writeFile('customers.json', customers)) {
        res.json({ success: true, customer: customers[customerIndex] });
    } else {
        res.status(500).json({ success: false, error: 'Failed to update customer' });
    }
});

app.delete('/api/customers/:id', (req, res) => {
    let customers = readFile('customers.json') || [];
    customers = customers.filter(c => c.id !== parseInt(req.params.id));
    if (writeFile('customers.json', customers)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, error: 'Failed to delete customer' });
    }
});

// PIN API
app.get('/api/pin/status', (req, res) => {
    const pinData = readFile('pin.json') || { pinSet: false, pin: null, pinSkipped: false };
    res.json({
        pinSet: pinData.pinSet,
        pinSkipped: pinData.pinSkipped
    });
});

app.post('/api/pin/setup', (req, res) => {
    const { pin } = req.body;
    if (!pin || pin.length < 4) {
        return res.status(400).json({ success: false, error: 'PIN must be at least 4 digits' });
    }

    const existingData = readFile('pin.json') || { pinSet: false, pin: null, pinSkipped: false };
    writeFile('pin.json', { pinSet: true, pin: pin, pinSkipped: false });
    res.json({ success: true });
});

app.post('/api/pin/skip', (req, res) => {
    const existingData = readFile('pin.json') || { pinSet: false, pin: null, pinSkipped: false };
    writeFile('pin.json', { pinSet: existingData.pinSet, pin: existingData.pin, pinSkipped: true });
    res.json({ success: true });
});

app.post('/api/pin/verify', (req, res) => {
    const { pin } = req.body;
    const pinData = readFile('pin.json') || { pinSet: false, pin: null, pinSkipped: false };

    if (pin === pinData.pin) {
        res.json({ success: true });
    } else {
        res.json({ success: false, error: 'Invalid PIN' });
    }
});

app.post('/api/pin/reset-with-master', (req, res) => {
    const { masterPin, newPin } = req.body;

    if (masterPin !== '9096') {
        return res.json({ success: false, error: 'Invalid master PIN' });
    }

    if (!newPin || newPin.length < 4) {
        return res.json({ success: false, error: 'New PIN must be at least 4 digits' });
    }

    writeFile('pin.json', { pinSet: true, pin: newPin, pinSkipped: false });
    res.json({ success: true });
});

app.post('/api/pin/remove', (req, res) => {
    const { pin } = req.body;
    const pinData = readFile('pin.json') || { pinSet: false, pin: null, pinSkipped: false };

    if (pin !== pinData.pin) {
        return res.json({ success: false, error: 'Invalid PIN' });
    }

    writeFile('pin.json', { pinSet: false, pin: null, pinSkipped: true });
    res.json({ success: true });
});

// PRODUCTS API
app.get('/api/products', (req, res) => {
    const products = readFile('products.json') || [];
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const products = readFile('products.json') || [];
    const newProduct = {
        id: Date.now(),
        ...req.body
    };
    products.push(newProduct);
    if (writeFile('products.json', products)) {
        res.json({ success: true, product: newProduct });
    } else {
        res.status(500).json({ success: false, error: 'Failed to save product' });
    }
});

app.put('/api/products/:id', (req, res) => {
    let products = readFile('products.json') || [];
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

    if (productIndex === -1) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }

    products[productIndex] = { ...products[productIndex], ...req.body };

    if (writeFile('products.json', products)) {
        res.json({ success: true, product: products[productIndex] });
    } else {
        res.status(500).json({ success: false, error: 'Failed to update product' });
    }
});

app.delete('/api/products/:id', (req, res) => {
    let products = readFile('products.json') || [];
    products = products.filter(p => p.id !== parseInt(req.params.id));
    if (writeFile('products.json', products)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, error: 'Failed to delete product' });
    }
});

// ORDERS API
app.get('/api/orders', (req, res) => {
    const orders = readFile('orders.json') || [];
    res.json(orders);
});

app.post('/api/orders', (req, res) => {
    const orders = readFile('orders.json') || [];
    let orderCounter = readFile('counter.json')?.orderCounter || 1000;

    const newOrder = {
        id: orderCounter++,
        ...req.body
    };

    orders.push(newOrder);
    writeFile('orders.json', orders);
    writeFile('counter.json', { orderCounter });

    res.json({ success: true, order: newOrder });
});

app.put('/api/orders/:id', (req, res) => {
    let orders = readFile('orders.json') || [];
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));

    if (orderIndex === -1) {
        return res.status(404).json({ success: false, error: 'Order not found' });
    }

    orders[orderIndex] = { ...orders[orderIndex], ...req.body };

    if (writeFile('orders.json', orders)) {
        res.json({ success: true, order: orders[orderIndex] });
    } else {
        res.status(500).json({ success: false, error: 'Failed to update order' });
    }
});

app.delete('/api/orders/:id', (req, res) => {
    let orders = readFile('orders.json') || [];
    orders = orders.filter(o => o.id !== parseInt(req.params.id));
    if (writeFile('orders.json', orders)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, error: 'Failed to delete order' });
    }
});

// RESET ALL DATA
app.post('/api/reset-all', (req, res) => {
    const { masterPin } = req.body;

    // Verify master PIN
    if (masterPin !== '9096') {
        return res.json({ success: false, error: 'Invalid master PIN' });
    }

    try {
        // Reset all data files to clean slate
        writeFile('products.json', []);
        writeFile('orders.json', []);
        writeFile('customers.json', []);
        writeFile('settings.json', {});  // Completely empty - fresh start
        writeFile('counter.json', { orderCounter: 1000 });

        console.log(`\n🔄 All data has been reset by user\n`);
        res.json({ success: true });
    } catch (err) {
        console.error('Error resetting data:', err);
        res.status(500).json({ success: false, error: 'Failed to reset data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✅ Business Manager Server running at http://localhost:${PORT}`);
    console.log(`📁 Data stored in: ${DATA_DIR}\n`);
});
