const express=require('express');
const database=require('./database/database');

const app=express();
const port=3001; 

app.get('/', (req, res) => {
    database.query('SELECT * FROM user', function (err, results, fields) {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});

router.get('/documents', (req, res) => {
  connection.query('SELECT * FROM documents', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching documents');
    } else {
      res.status(200).json(results);
    }
  });
});