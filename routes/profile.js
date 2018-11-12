const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Speech = require('../models/speech');
const session = require('express-session');
const { isLoggedIn } = require('../helpers/middlewares');

const ObjectId = mongoose.Types.ObjectId;

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(typeof id);

//   User.find(ObjectId(id), (err, user) => {
//     if (err) {
//       next(err);
//     } else {
//       res.status(200).json(user)
//     }
//   }) 
User.find(id)
  .then((result) => {
    if(!result){
      console.log('devuelve caca');
    }
    console.log(result);
  })
  .catch((error) => {
    console.log('errererererere');
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
  
  User.findByIdAndUpdate(id, updateUser)
    .then(() => {
      console.log(updateUser)
      res.status(200).json(updateUser)
    })
    .catch((error) => {
      console.log(error)
      next(error)
    })
})

module.exports = router;