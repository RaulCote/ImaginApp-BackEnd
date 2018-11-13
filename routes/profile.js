const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Speech = require('../models/speech');
const session = require('express-session');
const { isLoggedIn } = require('../helpers/middlewares');

const ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
  const id = req.session.currentUser._id;
  User.findById(id)
   .then((user) => {
     res.status(200).json(user)
     console.log(user)
    })
   .catch((error) => {
     console.log('user get ', error)
     next(error)
   })
})

router.put('/', (req, res, next) => {
  //console.log('supuesto id ', req.body)
  const user = req.body;
  const id = req.session.currentUser._id;
  console.log('id backend put', id)

  const updateUser = {
    username: req.body.username,
    email: req.body.email,
    picture: req.body.picture,
    _id: id,
  }

  if ( !updateUser.username || !updateUser.email || !updateUser.picture) {
    return res.status(422).json({
    error: 'Fields cannot be empty'
  })
}
  
  User.findByIdAndUpdate(id, updateUser)
    .then(() => {
      res.status(200).json(updateUser)
    })
    .catch((error) => {
      console.log(error)
      next(error)
    })
})

module.exports = router;