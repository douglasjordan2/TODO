const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cors = require('cors');
const generateToken = require('../../config/token-service');

const Auth = require('./auth-model');

router.use(express.json(), cors());

router.post('/api/register', validateData, validateUser, async (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;


  try {
    const result = await Auth.register(user);

    res.status(200).json(result)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.post('/api/login', validateData, async (req, res) => {
  try {
    const user = await Auth.login(req.body);

    if(user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user)


      return res.status(200).json({
        message: `Welcome! ${user.email}`,
        userId: user.id,
        token
      })
    } else {
      res.status(401).json({ message: 'invalid credentials' })
    }
  } catch (err) {
    res.status(500).json({ message: 'unknown err' })
  }
})

function validateData(req, res, next) {
  const { email, password } = req.body;

  if(email && password) {
    next();
  } else {
    res.status(422).json({ message: 'Invalid format' })
  }
}

async function validateUser(req, res, next) {
  const { email } = req.body;
  const check = await Auth.validate(email);

  if(check) {
    next();
  } else {
    res.status(403).json({ message: 'email already exists'});
  }
}

module.exports = router;