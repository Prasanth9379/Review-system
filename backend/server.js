const express = require('express');
const mssql = require('mssql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = {
    user: "node", // Database username
    password: "root", // Database password
    server: "localhost", // Server IP address
    database: "student", // Database name
    options: {
        encrypt: false // Disable encryption
    }
};

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
            res.json({ token, id:user.id });
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        res.status(400).send('Error logging in: ' + err.message);
    }
});

// Fetch all products
app.get('/product', async (req, res) => {
    try {
        const result = await mssql.query`SELECT * FROM Products`; // Assuming 'Products' table exists
        res.json(result.recordset);
    } catch (err) {
        console.error('Error retrieving products:', err);
        res.status(500).send('Error retrieving product data');
    }
});

// Fetch product details by ID
app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await mssql.query`SELECT * FROM Products WHERE id = ${id}`;
        if (result.recordset.length === 0) {
            return res.status(404).send('Product not found');
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Error retrieving product:', err);
        res.status(500).send('Error retrieving product data');
    }
});

// Fetch reviews for a product
// app.get('/reviews/:productId', async (req, res) => {
//     const { productId } = req.params;
//     try {
//         const result = await mssql.query`SELECT * FROM Reviews WHERE productId = ${productId}`;
//         res.json(result.recordset);
//     } catch (err) {
//         console.error('Error retrieving reviews:', err);
//         res.status(500).send('Error retrieving reviews');
//     }
// });

// Fetch reviews for a product with usernames
app.get('/reviews/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const result = await mssql.query`
            SELECT Reviews.review, Users.name AS username 
            FROM Reviews 
            INNER JOIN Users ON Reviews.userId = Users.id 
            WHERE Reviews.productId = ${productId}`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error retrieving reviews:', err);
        res.status(500).send('Error retrieving reviews');
    }
});


app.post('/reviews', async (req, res) => {
    console.log(req.body); // Log incoming data
    const { productId, review,userId } = req.body;

    if (!productId || !review) {
        return res.status(400).send('productId and review are required');
    }

    try {
        const result = await mssql.query`INSERT INTO Reviews (productId, review , userId) VALUES (${productId}, ${review} , ${userId})`;
        res.status(201).send('Review submitted successfully');
    } catch (err) {
        console.error('Error submitting review:', err.message); // Log the error message
        res.status(500).send('Error submitting review: ' + err.message);
    }
});

//admin usage
// app.delete('/reviews/:id', async (req, res) => {
//     const reviewId = req.params.id;

//     console.log('Attempting to delete review with ID:', reviewId);

//     try {
//         const result = await mssql.query`
//             DELETE FROM Reviews 
//             WHERE id = ${reviewId}`;
        
//         console.log('Delete result:', result);

//         if (result.rowsAffected[0] === 0) {
//             return res.status(404).send('Review not found');
//         }
        
//         res.status(200).send('Review deleted successfully');
//     } catch (err) {
//         console.error('Error deleting review:', err.message);
//         res.status(500).send('Error deleting review: ' + err.message);
//     }
// });

// // Update a review
// app.put('/reviews/:id', async (req, res) => {
//     const reviewId = req.params.id;
//     const { review } = req.body;

//     // Check if review content is provided
//     if (!review) {
//         return res.status(400).send('Review content is required');
//     }

//     console.log('Attempting to update review with ID:', reviewId);

//     try {
//         const result = await mssql.query`
//             UPDATE Reviews 
//             SET review = ${review} 
//             WHERE id = ${reviewId}`;

//         console.log('Update result:', result);

//         // Check if any rows were affected
//         if (result.rowsAffected[0] === 0) {
//             return res.status(404).send('Review not found');
//         }

//         res.status(200).send('Review updated successfully');
//     } catch (err) {
//         console.error('Error updating review:', err.message);
//         res.status(500).send('Error updating review: ' + err.message);
//     }
// });



// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});