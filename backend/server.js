const express = require('express');
const mssql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

var config = {
    "user": "node", // Database username
    "password": "root", // Database password
    "server": "localhost", // Server IP address
    "database": "student", // Database name
    "options": {
        "encrypt": false // Disable encryption
    }
}


// Connect to the database
mssql.connect(config, err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Database connected');
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await mssql.query`INSERT INTO Users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(400).send('Error registering user: ' + err.message);
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await mssql.query`SELECT * FROM Users WHERE email = ${email}`;
        const user = result.recordset[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        res.status(400).send('Error logging in: ' + err.message);
    }
});
//Fetching product detail from the database

app.get('/product', async (req, res) => {
    try {
        const result = await mssql.query`SELECT * FROM Products`; // Assuming 'Products' table exists
        console.log('Products fetched:', result.recordset); // Log the result
        res.json(result.recordset); // Send product data as JSON
    } catch (err) {
        console.error('Error retrieving products:', err);
        res.status(500).send('Error retrieving product data');
    }
});

// Example: Insert product into the database with relative image path
// app.post('/add-product', async (req, res) => {
//     const { name, description, price, imageUrl } = req.body;

//     try {
//         await mssql.query`INSERT INTO Products (name, description, price, imageUrl) VALUES (${name}, ${description}, ${price}, ${imageUrl})`;
//         res.status(201).send('Product added successfully');
//     } catch (err) {
//         res.status(400).send('Error adding product: ' + err.message);
//     }
// });


// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
