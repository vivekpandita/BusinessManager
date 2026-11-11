# Business Manager - Filesystem JSON Based Storage

A complete business management app with **Node.js backend** and **JSON file storage**.

## Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

This will install:
- **express** - Web server
- **cors** - Enable cross-origin requests

### 2. Start the Server
```bash
npm start
```

You should see:
```
✅ Business Manager Server running at http://localhost:3000
📁 Data stored in: C:\Users\vivek.pandita\Desktop\ai203vptraining\data
```

### 3. Open in Browser
Go to: **http://localhost:3000**

## Data Storage

All data is stored as JSON files in the `data/` folder:

- **`data/products.json`** - Product master data (name, cost, selling price)
- **`data/orders.json`** - All orders with items and status
- **`data/counter.json`** - Order ID counter

Example structure:
```json
{
  "id": 1000,
  "customerName": "John Doe",
  "customerPhone": "9876543210",
  "customerAddress": "123 Main St",
  "items": [...],
  "total": 5000,
  "cost": 3000,
  "profit": 2000,
  "deliveryDone": false,
  "paymentDone": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Features

✅ **Product Management** - Add, view, delete products with cost & selling prices  
✅ **Order Booking** - Create orders with multiple items  
✅ **Delivery & Payment Tracking** - Mark delivery and payment status  
✅ **Dashboard** - View revenue, profit, margins, and order summary  
✅ **Order Filtering** - Filter by status (Open, Pending Delivery, Pending Payment, Closed)  
✅ **Persistent Storage** - All data saved in JSON files on disk  

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order (mark delivery/payment)

## Troubleshooting

**Port 3000 already in use?**
Edit `server.js` and change the PORT variable:
```javascript
const PORT = 3001; // or any other port
```

**Can't connect to localhost:3000?**
- Make sure the server is running (`npm start`)
- Try refreshing the page
- Check browser console for errors (F12)

**Want to reset all data?**
Delete the `data/` folder and restart the server. It will create new empty files.

## Accessing Data Manually

You can open the JSON files directly with any text editor:
- `data/products.json`
- `data/orders.json`
- `data/counter.json`

All changes are saved automatically to these files!
