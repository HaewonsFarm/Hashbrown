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