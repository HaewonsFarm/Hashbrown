const mysql=require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    port: '3306',
    user: 'root',
    password: 'qkrwlals',
    database: 'hashbrownDB'
});

connection.connect((err)=> {
    if (err) console.log(err);
    else console.log('Connected to database');
});

module.exports=connection;