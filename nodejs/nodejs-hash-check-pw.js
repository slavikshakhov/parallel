
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/api/register', (req, res) => {                               //req.body.password from front
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        //save hash as pw in db
    });
});
app.post('/api/login', (req, res) => {
    const hash = "$2b$10$LEhujjEP3ipkcnGKFT5MSuW1VTONJ0h/PDKoL7LIVB9O3zraeU00a";  //taken from db after finding user in db
    bcrypt.compare(req.body.password, hash, (err, result) => {          //req.body.password  from front
        if(!result){                                                    //result === true / false
            res.sendStatus(403);
        } else {
            res.json('login successful!!!');                   //create token and send res with token
        }
    });
});



app.listen(4500, () => {
    console.log('runnning on port 4500')
});
