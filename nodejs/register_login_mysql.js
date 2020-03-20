//put db and routes in separate files... (see express-router.js)


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = 4000;

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'gerKanuk55',
    database : 'languages'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/api/register', (req, res) => {
    const password = req.body.password;
    const name = req.body.name;
    const city = req.body.city;

    let sql = 'SELECT * FROM users WHERE name = ?';
    db.query(sql, [name], (err, result) => {
        if(err){
            db.end();
            res.json('error querrying the database');
        }
        if(result.length > 0){
            res.status(400).json('user with this name already exists');
        } else {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                //save hash as pw in db
                if(err){
                    res.json('password could not be hashed');
                } else {
                    let user = {name, password: hash, city}
                    let sql = 'INSERT INTO users SET ?';
                    let query = db.query(sql, user, (err, result) => {
                        if(err){
                            res.json('successuflly connected to db but not posted');
                        } else {
                            res.json(result);
                        }
                    });
                }
            });
        }
    });
});
app.post('/api/login', (req, res) => {
    const hash = "$2b$10$LEhujjEP3ipkcnGKFT5MSuW1VTONJ0h/PDKoL7LIVB9O3zraeU00a";  //taken from db after finding user in db
    bcrypt.compare(req.body.password, hash, (err, result) => {          //req.body.password  from front
        if(!result){                                                    //result === true / false
            res.sendStatus(403);
        } else {
            res.json('login successful!!!');
        }
    });
});



app.listen(port, () => {
    console.log(`server running on port ${port}`)
});