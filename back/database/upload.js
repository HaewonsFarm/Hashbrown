const express = require('express');
const multer = require('multer');
const connection = require('./database');
const path = require('path');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('document'), (req, res) => {
  const file = req.file;

  const documentName = file.originalname;
  const storedDate = new Date();
  const expiryDate = new Date(storedDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  const filePath = file.path;
  const fileType = path.extname(filePath).substring(1); // get file extension without dot
  const fileSize = file.size;

  const query = `
    INSERT INTO documents (name, stored_date, expiry_date, file_path, file_type, file_size)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [documentName, storedDate, expiryDate, filePath, fileType, fileSize],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error saving document');
      } else {
        res.status(200).send('Document uploaded successfully');
      }
    }
  );
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> back
