const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Speech = require('../models/speech');
const { isLoggedIn } = require('../helpers/middlewares');

const ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
  // const { id } = req.body;
  console.log('entra');

  Speech.find({}, (err, speechList) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(speechList)
    }
  });
    
});

router.post('/', (req, res, next) => {
  // const userId = req.session.currentUser._id;

  console.log('entra');

  // const owner = ObjectId("5be42047b88f1e220904717a");
  const newSpeech = new Speech({
    // owner,
    title: req.body.title,
    message: req.body.message,
    tag: req.body.tag,
    owner: req.body.owner,
    isPublic: req.body.visible,
  });

  
//
  // let tagsplit = req.body.tag.split('');
  // tagsplit.map(tag => {
  //   return  newSpeech.tag.push(tag);
  // })
  
// title: String,
//   message: String,
//   tag: [{type: String}],
//   private: Boolean,
  
  newSpeech.save((err) => {
    if(err){
        next(err);
    }else{
      res.status(200).json({ newSpeech });
    }
  })
    // .then((createdSpeech) => {
    //   console.log(' error al introducir');
    //   res.status(200).json({speech});
    // })
    // .catch((error) => {
    //   console.log(' error de add');
    // });

});

module.exports = router;