const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { isLoggedIn } = require('../helpers/middlewares');

router.get('/', isLoggedIn, (req, res, next) => {
  const { id } = req.body;

  User.findById(id)
    .then((user) => {
      if(!user){
        return res.status(404).json({
          error: 'not-found'
        });
      }else{
        return res.status(200).json({user});
      }
    })
    .catch(next);
});