const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',  
    database: 'portfolio_db' 
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to Ebinesar Portfolio MySQL Database successfully!');
});

app.post('/api/register-client', (req, res) => {
    const { name, email, projectType, message } = req.body;

    const query = 'INSERT INTO clients (name, email, project_type, message) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, email, projectType, message], (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ success: false, message: 'Database error!' });
        }
        res.json({ success: true, message: 'Client request successfully registered in Database!' });
    });
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});