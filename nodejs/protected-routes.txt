const express = require('express');
const jwt = require('jsonwebtoken');   //see   https://github.com/auth0/node-jsonwebtoken

const app = express();

app.post('/api/login', (req, res) => {
    // Mock user
    const user = {                                       //user comes from db after finding by name, pw...
      id: 1,
      username: 'brad',
      email: 'brad@gmail.com'
    }

    jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {    //expiresIn is option, not required
      res.json({
        token
      });
    });
  });

app.get('/api', (req, res) => {      //does not require protection, no token
  res.json({
    message: 'Welcome to the API'
  });
});



app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {    //authData is what was used to create token, in login
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');       //token format:  Authorization: Bearer lalalalala
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);       // Forbidden
  }
}

app.listen(5000, () => console.log('Server started on port 5000'));