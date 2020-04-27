
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
    bcrypt.compare(req.body.password, hash, (err, isMatch) => {          //req.body.password  from front
        if(!isMatch){                                                    //result === true / false
            res.sendStatus(403);
        } else {
            res.json('login successful!!!');                   //create token and send res with token
        }
    });
});



app.listen(4500, () => {
    console.log('runnning on port 4500')
});

/*
************************************** Hash pw, register user ***************************************

router.post('/', (req, res) => {
  let {name, password, city, country} = req.body;
  
  bcrypt.hash(password, saltRounds, async function(err, hash) {
    //save hash as pw in db
    if(err){
        res.json('password could not be hashed');
    } else {
        let user = new User({name, password: hash, city, country});
        try {    
          const newUser = await user.save();
          res.status(201).json(newUser);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
    }
  });
});

******************************* unhash pw, login ***********************************************************

router.post('/login', (req, res) => {
    let {name, password} = req.body;
    name = name.toLowerCase();
    User.findOne({name}, (err, user) => {
      if(!user){
        res.status(400).json({message: 'There is no user with this name'});
        } else {
          const hash = user.password.toString();       // in MySql as varbinary(255) -> buffer
          console.log(hash);
          console.log(user.name);
          //const hash = "$2b$10$LEhujjEP3ipkcnGKFT5MSuW1VTONJ0h/PDKoL7LIVB9O3zraeU00a";  //taken from db after finding user in db
          bcrypt.compare(password, hash, (err, isMatch) => {          //req.body.password  from front
              if(!isMatch){                                                    //isMatch === true / false
                  res.status(403).json({message: 'Wrong password'});
              } else {
                  res.status(200).json('login successful!!!');                //create token and send res with token
              }
          });
        }
    });
    
    
});
*/
