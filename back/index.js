const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Enable cross-origin requests

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'qkrwlals',
    database: 'document_management'
});

connection.connect((err) => {
    if (err) console.log(err);
    else console.log('Connected to database');
});

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp to avoid collisions
    }
});

const upload = multer({ storage });

// Add a document (file upload)
app.post('/documents', upload.single('file'), (req, res) => {
    const { filename, size, mimetype } = req.file;
    const storedDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(storedDate.getFullYear() + 1); // Expiry date set to 1 year after stored date

    const fileType = mimetype.split('/')[1]; // 'png', 'jpg', etc.
    const filePath = `/uploads/${filename}`;

    const sql = `INSERT INTO documents (name, stored_date, expiry_date, file_path, file_type, file_size)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [filename, storedDate, expiryDate, filePath, fileType, size], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Document uploaded successfully', documentId: result.insertId });
    });
});

// Get all documents
app.get('/documents', (req, res) => {
    connection.query('SELECT * FROM documents', (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

// Delete selected documents
app.delete('/documents', (req, res) => {
    const { ids } = req.body;
    if (!ids || ids.length === 0) return res.status(400).send('No document IDs provided.');

    const sql = `DELETE FROM documents WHERE id IN (?)`;
    connection.query(sql, [ids], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Documents deleted successfully' });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
